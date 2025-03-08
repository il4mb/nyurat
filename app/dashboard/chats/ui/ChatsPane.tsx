"use client"
import { Box, Divider, Paper } from "@mui/material"
import PaneHeader from "./PaneHeader"
import ChatsList from "./ChatsList"
import { useChat } from "./ChatProvider"

type Props = {}

export default function ChatsPane({ }: Props) {
    const { chats, selected, setSelectedChat } = useChat();
    return (
        <Box sx={{ flexBasis: "350px", width: "100%", borderRadius: 0 }} component={Paper} elevation={2}>
            <PaneHeader />
            <Divider />
            <ChatsList
                chats={chats}
                selected={selected}
                setSelectedChat={setSelectedChat} />
        </Box>
    )
}