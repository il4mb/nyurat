"use server"
import { CreateUserProps, UserProps } from "@/internal/types";
import { establish } from "@internal/database";

export async function getUserByEmail(email: string): Promise<UserProps | null> {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection<UserProps>("users").findOne({ email });
}


export async function createUser(user: CreateUserProps) {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection("users").insertOne(user);
}

export async function getUserByUsername(username: string) {
    const db = (await establish()).db(process.env.DB_NAME);
    return db.collection<UserProps>("users").findOne({ username });
}

export async function findUsersByUsername(username: string): Promise<UserProps[]> {
    const db = (await establish()).db(process.env.DB_NAME);
    const users = await db.collection<UserProps>("users")
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
    return users.map(e => ({ ...e, _id: e._id.toString() })) as UserProps[];
}

