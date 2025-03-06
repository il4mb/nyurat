"use client"
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { TextField } from "@mui/material";

interface StartMessageDialogProps {
    open: boolean;
    onClose: () => void;
};


const StartMessageDialog = ({ open, onClose }: StartMessageDialogProps) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Sheet
                variant="outlined"
                sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    level="h4"
                    textColor="inherit"
                    sx={{ fontWeight: 'lg', mb: 1 }}
                >
                    Let's Start
                </Typography>
                <TextField value={"Hai kamu, ayok nyurat."}/>
            </Sheet>
        </Modal>
    );
};

export default StartMessageDialog