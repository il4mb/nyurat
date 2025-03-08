import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "nyuratDb";
const DB_VERSION = 1;
export enum Collection {
    NECESSARIES = "necessaries",
    MESSAGES = "messages",
    CHATS = "chats"
}

interface ObjectIndex {
    name: string;
    keyPath: string | string[];
    unique?: boolean;
}

interface ObjectBaseModel {
    keyPath: string;
    objectName: string;
    autoIncrement?: boolean;
    indexes?: ObjectIndex[];
}

// List of collections to ensure they exist
const OBJECT_STORES: ObjectBaseModel[] = [
    { objectName: Collection.MESSAGES, keyPath: "id", autoIncrement: true, indexes: [{ name: "chatId", keyPath: "chatId" }] },
    { objectName: Collection.CHATS, keyPath: "id", autoIncrement: false, indexes: [{ name: "title", keyPath: "title" }] },
    { objectName: Collection.NECESSARIES, keyPath: "id" }
];

// Open IndexedDB and create object stores dynamically
let dbInstance: IDBPDatabase | null = null;

export const getDatabase = async (): Promise<IDBPDatabase> => {
    if (!("indexedDB" in window)) {
        throw new Error("IndexedDB is not supported in this browser.");
    }

    if (dbInstance) return dbInstance;

    dbInstance = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            console.log(`Upgrading DB from v${oldVersion} → v${newVersion}`);

            OBJECT_STORES.forEach((storeConfig) => {
                if (!db.objectStoreNames.contains(storeConfig.objectName)) {
                    console.log(`Creating object store: ${storeConfig.objectName}`);
                    const store = db.createObjectStore(storeConfig.objectName, {
                        keyPath: storeConfig.keyPath,
                        autoIncrement: storeConfig.autoIncrement ?? false,
                    });

                    storeConfig.indexes?.forEach(({ name, keyPath, unique = false }) => {
                        console.log(`Creating index '${name}' on '${storeConfig.objectName}'`);
                        store.createIndex(name, keyPath, { unique });
                    });
                } else {
                    console.log(`Object store '${storeConfig.objectName}' already exists.`);
                }
            });
        },
    });

    return dbInstance;
};
