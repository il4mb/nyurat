"use client";
import { ChatProps, UserProps } from "@internal/types";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import { retrieveChats, storeChats } from "../ChatDb";

interface ChatContextProps {
    session: UserProps | null;
    chats: ChatProps[];
    setChats: Dispatch<SetStateAction<ChatProps[]>>;
    selected: ChatProps | null;
    setSelectedChat: Dispatch<SetStateAction<ChatProps | null>>;
    startChat: (u: UserProps) => void;
}

const ChatContext = createContext<ChatContextProps>({
    session: null,
    chats: [],
    setChats: () => { },
    selected: null,
    setSelectedChat: () => { },
    startChat: () => { },
});

export const useChat = () => useContext(ChatContext);

type Props = {
    children: React.ReactNode;
    session: UserProps;
};

export default function ChatProvider({ children, session }: Props) {
    const ignoreChats = useRef(false);
    const [chats, setChats] = useState<ChatProps[]>([]);
    const [selected, setSelectedChat] = useState<ChatProps | null>(null);

    const startChat = (user: UserProps) => {
        const existingChat = chats.find(chat => chat.sender._id === user._id);
        if (!existingChat) {
            const chatId = [user._id, session._id].sort().join("-");
            const newChat: ChatProps = { id: chatId, sender: user, messages: [] };
            setChats(prev => [...prev, newChat]);
            setSelectedChat(newChat);
        } else {
            setSelectedChat(existingChat);
        }
    };

    useEffect(() => {
        retrieveChats()
            .then(retrievedChats => {
                setChats(retrievedChats);
                ignoreChats.current = true;
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (ignoreChats.current) {
            storeChats(chats);
        } else {
            ignoreChats.current = true;
        }
    }, [chats]);

    return (
        <ChatContext.Provider value={{ session, chats, setChats, selected, setSelectedChat, startChat }}>
            {children}
        </ChatContext.Provider>
    );
}
