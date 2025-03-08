import { Dialog, DialogContent, SxProps, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {
    sx?: SxProps;
}

export default function ForgotPassword({ sx }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Typography
                sx={{ "&:hover": { textDecoration: "underline", color: "primary.main" }, cursor: "pointer", ...sx }}
                onClick={() => setOpen(true)}>
                Forgot password?
            </Typography>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Typography>Please enter your email</Typography>
                    <TextField type='email' label="Email address" />
                </DialogContent>
            </Dialog>
        </>
    )
}