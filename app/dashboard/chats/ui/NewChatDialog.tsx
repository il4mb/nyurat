import { findUsersByUsername } from '@/app/action/user';
import { UserProps } from '@internal/types';
import {
    Autocomplete,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useChat } from './ChatProvider';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function NewChatDialog({ open, onClose }: Props) {
    const [selected, setSelected] = useState<UserProps | null>(null);
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState(false);
    const { startChat } = useChat();

    useEffect(() => {
        if (!username) {
            setUsers([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const userList = await findUsersByUsername(username.replace(/^@/, ""));
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [username]);

    useEffect(() => {
        if (selected) {
            startChat(selected)
            onClose();
        }
    }, [selected]);

    return (
        <Dialog open={open} onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: "400px",
                        width: "100%"
                    }
                }
            }}>
            <DialogContent>
                <Typography variant='h5' component="h5" sx={{ mb: 3 }}>Start Chat</Typography>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={users}
                    getOptionLabel={(option) => `${typeof option == "string" ? option : `@${option.username}`}`}
                    loading={loading}
                    value={username}
                    onInputChange={(_, newValue) => setUsername(newValue)}
                    onChange={(_, newValue) => {
                        if (typeof newValue !== "string") setSelected(newValue)
                    }}
                    renderOption={(props, option, i) => (
                        <MenuItem {...props} key={i.index}>
                            <ListItemAvatar>
                                <Avatar src={option.avatar || ""}>{option.name}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={option.name} secondary={`@${option.username}`} />
                        </MenuItem>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="@username"
                            variant="outlined"
                        />
                    )}
                    slotProps={{
                        paper: {
                            sx: {
                                boxShadow: 4,
                            },
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Chat</Button>
            </DialogActions>
        </Dialog>
    );
}
