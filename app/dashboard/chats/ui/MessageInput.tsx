import { AttachFileRounded, MicRounded } from '@mui/icons-material';
import { Box, Button, Divider, SxProps, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useMessage } from './MessageProvider';

type Props = {

};

export default function MessageInput({ }: Props) {
    const [message, setMessage] = useState("");
    const { sendMessage } = useMessage();

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box>
            <Divider />
            <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "flex-end", gap: 1 }}>
                <Button sx={ButtonStyle}>
                    <AttachFileRounded sx={{ fontSize: "20px", rotate: "35deg" }} />
                </Button>
                <TextField
                    sx={{ border: 0 }}
                    size="small"
                    variant="standard"
                    placeholder="Type here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    minRows={1}
                    maxRows={2}
                    multiline
                    fullWidth
                    slotProps={{
                        input: {
                            sx: {
                                border: 0,
                            },
                        },
                    }}
                />
                <Button sx={{ ...ButtonStyle }}>
                    <MicRounded sx={{ fontSize: "20px" }} />
                </Button>
            </Box>
        </Box>
    );
}

const ButtonStyle: SxProps = {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    p: 2,
    borderRadius: "5px",
};
