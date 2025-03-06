import { Document } from "mongodb";

export interface UserProps extends Document {
    name: string;
    username: string;
    avatar: string;
    online: boolean;
}