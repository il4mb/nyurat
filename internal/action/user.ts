"use server"
import { CreateUserProps, DbUserProps, UserProps } from "@internal/types";
import { establish } from "@internal/database";
import { ObjectId } from "mongodb";

export async function getUserByEmail(email: string): Promise<DbUserProps | null> {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection<DbUserProps>("users").findOne({ email });
}

export async function createUser(user: CreateUserProps) {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection("users").insertOne(user);
}

export async function getUserByUsername(username: string) {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection<DbUserProps>("users").findOne({ username });
}

export async function getUserById(uid: string) {
    const id = new ObjectId(uid);
    if (!id) throw new Error("Invalid user ID");
    
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection<DbUserProps>("users").findOne({ _id: id });
}

export async function findUsersByUsername(username: string): Promise<DbUserProps[]> {
    const db = (await establish()).db(process.env.DB_NAME);
    const users = await db.collection<DbUserProps>("users")
        .aggregate([
            {
                $match: {
                    username: { $regex: username, $options: "i" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    username: 1,
                    email: 1,
                    verified: 1
                }
            }
        ]).toArray();
    return users.map(e => ({ ...e, _id: e._id.toString() })) as DbUserProps[];
}


