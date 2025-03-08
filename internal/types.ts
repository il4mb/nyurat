import { Document, ObjectId } from "mongodb";

export type MessageStatusProps = "send" | "received" | "read";
export type MessageProps = {
    id: string;
    chatId: string;
    content: string;
    time: number;
    status?: MessageStatusProps;
    sender: UserProps;
};

export interface ChatProps {
    id: string;
    sender: UserProps;
    messages: MessageProps[];
}

export interface DbUserProps extends Document {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
    verified: boolean;
}

export interface UserProps extends Omit<DbUserProps, "_id"> {
    _id: string;
    name: string;
    username: string;
    email: string;
    verified: boolean;
}

export interface CreateUserProps extends Omit<UserProps, "_id"> {
    password: string;
}

