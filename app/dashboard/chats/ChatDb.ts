import { e2eDecrypt, e2eEncrypt } from "@/app/encryption";
import { Collection, getDatabase } from "@/app/IndexDb";
import { ChatProps, MessageProps } from "@/internal/types";

const OBJECT_NAME = Collection.CHATS

// Store multiple chat records
export const storeChats = async (chats: ChatProps[]) => {

    const db = await getDatabase();

    try {

        const tx = db.transaction(OBJECT_NAME, "readwrite");
        const store = tx.objectStore(OBJECT_NAME);

        await Promise.all(
            chats.map(async (chat) => {
                try {
                    await store.put(chat);
                } catch (err) {
                    console.error(`Error storing chat ${chat.id}:`, err);
                }
            })
        );

        await tx.done;
    } catch (error) {
        console.error("Error storing messages:", error);
    }
};

// Retrieve all chats from IndexedDB
export const retrieveChats = async (): Promise<ChatProps[]> => {

    const db = await getDatabase();
    try {
        const tx = db.transaction(OBJECT_NAME, "readonly");
        const store = tx.objectStore(OBJECT_NAME);
        return (await store.getAll()) || [];

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
