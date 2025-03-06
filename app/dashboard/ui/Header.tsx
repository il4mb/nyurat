"use client"
import Sheet from '@mui/joy/Sheet';
import { Avatar, Box } from "@mui/joy";
import { UserProps } from '@/app/types';

export default function Header({ session }: { session: UserProps }) {

    return (
        <Sheet
            sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                width: '100vw',
                height: '60px',
                zIndex: 1000,
                px: 2,
                py: 1,
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'background.level1',
                boxShadow: 'sm',
                display: "flex"
            }}
        >

            <Box sx={{ ml: "auto" }}>
                <Avatar src={session.avatar} alt={session.name} />
            </Box>
        </Sheet>
    );
}
