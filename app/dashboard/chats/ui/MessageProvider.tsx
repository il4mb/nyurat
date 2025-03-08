import { ChatProps, MessageProps } from "@internal/types";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { useChat } from "./ChatProvider";
import { useSnackbar } from "notistack";
import { retrieveMessages, storeMessages } from "../MessageDb";
import { v4 as uuidv4 } from 'uuid';
import { useApp } from "@/app/dashboard/ui/AppProvider";

interface MessageContextProps {
    messages: MessageProps[];
    sendMessage: (message: string) => void;
}
const MessageContext = createContext<MessageContextProps>({
    sendMessage(message) { },
    messages: []
});
export const useMessage = () => useContext(MessageContext);

type Props = {
    children: ReactNode;
    selected: ChatProps;
}
export default function MessageProvider({ children, selected }: Props) {
    const ignoreMessages = useRef(false);
    const { keyPair } = useApp();
    const { enqueueSnackbar } = useSnackbar();
    const { session } = useChat();
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const sendMessage = (content: string) => {
        if (session?._id) {
            setMessages(prev => [
                ...prev, {
                    id: `${uuidv4()}`,
                    chatId: selected.id,
                    content,
                    time: Date.now(),
                    sender: session
                }]);
            return;
        }
        enqueueSnackbar("Canot send message!", { variant: "error" });
    }

    useEffect(() => {
        retrieveMessages(selected.id)
            .then(ms => {
                setMessages(ms);
                ignoreMessages.current = true;
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        if (ignoreMessages.current) {
            ignoreMessages.current = false;
        } else {
            storeMessages(selected.id, messages);
        }
    }, [messages]);

    return (
        <MessageContext.Provider value={{
            messages,
            sendMessage
        }}>
            {children}
        </MessageContext.Provider>
    )
}