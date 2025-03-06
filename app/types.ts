import { Document } from "mongodb";


export type MessageProps = {
    id: string;
    content: string;
    timestamp: string;
    unread?: boolean;
    sender: UserProps | 'You';
    attachment?: {
        fileName: string;
        type: string;
        size: string;
    };
};

export type ChatProps = {
    id: string;
    sender: UserProps;
    messages: MessageProps[];
};

export interface UserProps extends Document {
    name: string;
    username: string;
    avatar: string;
    online: boolean;
}