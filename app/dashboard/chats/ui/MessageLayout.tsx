"use client"
import { Box, Typography } from "@mui/material"
import MessageHeader from "./MessageHeader"
import MessageBody from "./MessageBody"
import { useChat } from "./ChatProvider"
import MessageProvider from "./MessageProvider"

export default function MessageLayout() {
    const { selected } = useChat();
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {selected ? (
                <MessageProvider selected={selected}>
                    <MessageHeader chat={selected} />
                    <MessageBody />
                </MessageProvider>
            ) : (
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h4" component={"h2"}>Nyurat</Typography>
                </Box>
            )}
        </Box>
    )
}