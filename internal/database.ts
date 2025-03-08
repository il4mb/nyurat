import { MongoClient } from "mongodb";

export function establish() {
    return new Promise<MongoClient>((accepted, rejected) => {
        const url = process.env.MONGODB_URL;
        console.log(url)
        if (!url) throw new Error("MONGODB_URL is not defined");
        MongoClient.connect(url)
            .then((client) => accepted(client))
            .catch(rejected)
    })
}