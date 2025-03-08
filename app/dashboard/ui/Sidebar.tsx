"use client"

import { Box, Paper, styled, SxProps } from '@mui/material'
import React, { useState } from 'react'
import SidebarMenu from './SidebarMenu';
import { UserProps } from '@/internal/types';

const SidebarPaper = styled(Paper)({
    display: "flex",
    flexGrow: 1
});

type Props = {
    session: UserProps;
}

export default function Sidebar({ session }: Props) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Box
                component={SidebarPaper}
                sx={{
                    ...MainStyle,
                    ...(open && {
                        maxWidth: "200px",
                        boxShadow: "0 0 1px #7f7f7f8f, 0 0 4px #7f7f7f8f",
                    })
                }}
                elevation={0}>
                <SidebarMenu open={open} setOpen={setOpen} session={session} />
            </Box>
            {open && (
                <Box sx={OverlayStyle} onClick={handleClose} />
            )}
        </>
    )
}

const OverlayStyle: SxProps = {
    position: "fixed",
    zIndex: 800,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(8px)"
}

const MainStyle: SxProps = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    boxShadow: "0 0 1px #7f7f7f8f",
    zIndex: 801,
    borderRadius: 0,
    width: "100%",
    transition: "all 0.2s ease-in-out",
    maxWidth: "55px",
    flexGrow: 1
}
