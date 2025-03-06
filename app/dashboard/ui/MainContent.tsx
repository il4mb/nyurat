"use client"
import { Sheet } from "@mui/joy"
import ChatsPane from "./ChatsPane"
import { ChatProps, UserProps } from "@/app/types";
import { useEffect, useState } from "react";
import MessagesPane from "./MessagesPane";
import { socket } from "@/app/socket";


interface MainContentProps {
    session: UserProps
};


const MainContent = ({ session }: MainContentProps) => {

    const [chats, setChats] = useState<ChatProps[]>([]);
    const [selectedChat, setSelectedChat] = useState<ChatProps>();

    useEffect(() => {
        const handleReceivedMessages = (data: any) => {
            console.log(data);
        }
        socket.emit("dashboard", {});
        socket.on("receive-message", handleReceivedMessages);

        return () => {
            socket.off("receive-message");
        }
    }, [])

    return (
        <>
            <Sheet
                sx={{
                    display: "flex",
                    transform: {
                        xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
                        sm: 'none',
                    },
                    transition: 'transform 0.4s, width 0.4s',
                    zIndex: 100,
                    width: '100%',
                    flexBasis: "400px"
                }}
            >
                <ChatsPane
                    chats={chats || []}
                    selectedChatId={selectedChat?.id}
                    setSelectedChat={setSelectedChat}
                />
            </Sheet>
            <MessagesPane chat={selectedChat} />
        </>
    );
};

export default MainContent