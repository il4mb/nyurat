"use client"
import { EditNoteRounded } from '@mui/icons-material'
import { Autocomplete, Box, Button, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import NewChatDialog from './NewChatDialog'

type Props = {}

export default function PaneHeader({ }: Props) {
    const [newChat, setNewChat] = useState(false);
    const startNewChat = () => setNewChat(true);

    return (
        <>
            <Box sx={{ py: 1, px: 2, display: "flex", alignItems: "center" }}>
                <Typography variant='h4'>Chats</Typography>

                <Box sx={{ ml: "auto" }}>
                    <Button variant='text' sx={{ width: "35px", height: "35px", minWidth: "25px" }} onClick={startNewChat}>
                        <EditNoteRounded sx={{ fontSize: "18px" }} />
                    </Button>
                </Box>
            </Box>
            <NewChatDialog open={newChat} onClose={() => setNewChat(false)} />
        </>
    )
}