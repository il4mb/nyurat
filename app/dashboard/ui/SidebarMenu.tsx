import ColorModeButton from '@/app/theme/ColorModeButton'
import { UserProps } from '@/internal/types';
import { ChatRounded, MenuRounded } from '@mui/icons-material'
import { Avatar, Box, Button, SxProps, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

const MenuList = [
    {
        text: "Chats",
        path: "/dashboard/chats",
        icon: <ChatRounded />
    }
]

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    session: UserProps;
}

export default function SidebarMenu({ open, setOpen, session }: Props) {
    const router = useRouter();
    const toggleOpen = () => setOpen(!open);
    const navigateToPath = (path: string) => router.push(path);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 1, flexGrow: 1 }}>
            <ColorModeButton sx={{ ...MenuButtonStyle, mb: 2 }} variant='text' />
            <Button sx={MenuButtonStyle} onClick={toggleOpen}>
                <MenuRounded />
            </Button>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 3, flexGrow: 1 }}>
                {MenuList.map((menu, index) => {
                    return (
                        <Button key={index} sx={{ ...MenuButtonStyle, ...(open && { width: "100%" }) }} onClick={() => navigateToPath(menu.path)}>
                            {menu.icon} {open && <Typography sx={{ ml: 1 }}>{menu.text}</Typography>}
                        </Button>
                    )
                })}

            </Box>
            <Avatar src={session.avatar} alt={session.name} sx={{ width: "35px", height: "35px" }} />
        </Box>
    )
}

const MenuButtonStyle: SxProps = {
    width: "40px",
    height: "35px",
    minWidth: "35px",
    justifyContent: "flex-start",
    p: 1
}