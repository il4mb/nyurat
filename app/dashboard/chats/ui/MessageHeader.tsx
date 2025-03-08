import { ChatProps } from '@/internal/types';
import { BlockRounded, CallRounded, FlagCircleRounded, MoreVertRounded } from '@mui/icons-material';
import { Avatar, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

type Props = {
  chat: ChatProps;
};

export default function MessageHeader({ chat }: Props) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchorEl);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", borderRadius: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", px: 2, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <Avatar src={chat.sender.avatar} alt={chat.sender.name} />
            <Box>
              <Typography>{chat.sender.name}</Typography>
              <Typography sx={{ fontSize: "8px", color: "primary.main" }}>@{chat.sender.username}</Typography>
            </Box>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Button sx={ButtonStyle}>
              <CallRounded />
            </Button>
            <Button sx={ButtonStyle} onClick={handleOpen}>
              <MoreVertRounded />
            </Button>
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={menuAnchorEl}
        open={openMenu}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "250px"
            }
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FlagCircleRounded />
          </ListItemIcon>
          <ListItemText>Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BlockRounded />
          </ListItemIcon>
          <ListItemText>Block</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

const ButtonStyle: SxProps = {
  width: "30px",
  height: "30px",
  minWidth: "30px",
  p: 2,
  borderRadius: "10px",
  "& .MuiSvgIcon-root": {
    fontSize: "20px"
  }
};
