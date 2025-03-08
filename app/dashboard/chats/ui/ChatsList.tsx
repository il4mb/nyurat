import { ChatProps } from '@/internal/types'
import { Avatar, List, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    chats: ChatProps[];
    selected: ChatProps | null;
    setSelectedChat: Dispatch<SetStateAction<ChatProps | null>>;
}

export default function ChatsList({ chats, selected, setSelectedChat }: Props) {

    const handleSetSelected = (user: ChatProps) => {
        setSelectedChat(user)
    }
    return (
        <List dense>
            {chats.map((chat, index) => {
                const sender = chat.sender;
                return (
                    <MenuItem key={index} selected={sender._id == selected?.sender?._id} onClick={() => handleSetSelected(chat)}>
                        <ListItemIcon>
                            <Avatar src={sender.avatar} alt={sender.name} />
                        </ListItemIcon>
                        <ListItemText sx={{ ml: 1 }}>
                            {sender.name}
                        </ListItemText>
                    </MenuItem>
                )
            })}
        </List>
    )
}