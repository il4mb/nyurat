import { Collection, getDatabase } from "./IndexDb";

export type KeyPairProps = {
    publicKey: string;
    privateKey: string;
}

const generateKeyPair = async (): Promise<KeyPairProps> => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    return {
        publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
        privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey))),
    };
};

export const getKeyPair = async (): Promise<KeyPairProps | undefined> => {
    try {
        const db = await getDatabase();
        const existingKeyPair = await db.get(Collection.NECESSARIES, "keypair");

        if (existingKeyPair) {
            try {
                const publicKeyBuffer = Uint8Array.from(atob(existingKeyPair.publicKey), c => c.charCodeAt(0));
                const privateKeyBuffer = Uint8Array.from(atob(existingKeyPair.privateKey), c => c.charCodeAt(0));

                await window.crypto.subtle.importKey(
                    "spki",
                    publicKeyBuffer,
                    { name: "RSA-OAEP", hash: "SHA-256" },
                    false,
                    ["encrypt"]
                );

                await window.crypto.subtle.importKey(
                    "pkcs8",
                    privateKeyBuffer,
                    { name: "RSA-OAEP", hash: "SHA-256" },
                    false,
                    ["decrypt"]
                );
                return existingKeyPair;
            } catch (error) {
                console.warn("Invalid key pair detected. Generating a new one...");
            }
        }

        const newKeyPair = await generateKeyPair();
        await db.add(Collection.NECESSARIES, { id: "keypair", ...newKeyPair });
        console.log("New key pair generated and stored.");
        return newKeyPair;
    } catch (error) {
        console.error("Error handling key pair:", error);
    }
};

export const e2eEncrypt = async (rawtext: string, base64PublicKey: string) => {
    const publicKeyBuffer = Uint8Array.from(atob(base64PublicKey), c => c.charCodeAt(0));
    const importedPublicKey = await window.crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );

    const encodedMessage = new TextEncoder().encode(rawtext);
    const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, importedPublicKey, encodedMessage);
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));  // Convert to Base64
};

export const e2eDecrypt = async (encrypted: string, base64PrivateKey: string) => {
    const privateKeyBuffer = Uint8Array.from(atob(base64PrivateKey), c => c.charCodeAt(0));
    const importedPrivateKey = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["decrypt"]
    );

    const encryptedBuffer = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, importedPrivateKey, encryptedBuffer);
    return new TextDecoder().decode(decrypted);
};
