import { e2eDecrypt, e2eEncrypt } from "@/app/encryption";
import { Collection, getDatabase } from "@/app/IndexDb";
import { MessageProps } from "@/internal/types";

const OBJECT_NAME = Collection.MESSAGES;
export const storeMessages = async (chatId: string, messages: MessageProps[]) => {
    try {

        const db = await getDatabase();
        const tx = db.transaction(OBJECT_NAME, "readwrite");
        const store = tx.objectStore(OBJECT_NAME);

        await Promise.all(messages.map(message => {
            const storedMessage = { ...message, chatId };
            return store.put(storedMessage);
        }));

        await tx.done;
    } catch (error) {
        console.error("Error storing messages:", error);
    }
};

export const retrieveMessages = async (chatId: string): Promise<MessageProps[]> => {
    try {
        const db = await getDatabase();

        const tx = db.transaction(OBJECT_NAME, "readonly");
        const store = tx.objectStore(OBJECT_NAME);
        if (!store.indexNames.contains("chatId")) {
            console.warn("Index 'chatId' not found. Ensure IndexedDB schema includes it.");
            return [];
        }

        const index = store.index("chatId"); // Indexed lookup
        const range = IDBKeyRange.only(chatId); // Query only messages for this chat
        const request = index.getAll(range); // Efficient retrieval

        return await request;
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return [];
    }
};



// export const storeEncryptedMessage = async (chatId: string, messages: MessageProps[], recipientPublicKey: string) => {
//     const encryptedMessagePromise = messages.map(async (m) => ({ ...m, content: await e2eEncrypt(m.content, recipientPublicKey) }))
//     const encryptedMessages = await Promise.all(encryptedMessagePromise);
//     await storeMessages(chatId, encryptedMessages);
// };

// export const retrieveAndDecryptMessages = async (chatId: string, userPrivateKey: string) => {
//     const messages = await retrieveMessages(chatId);
//     return Promise.all(messages.map(async (msg) => ({
//         ...msg,
//         content: await e2eDecrypt(msg.content, userPrivateKey)
//     })));
// };
