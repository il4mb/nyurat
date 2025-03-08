"use client"
import { Theme, alpha, Components } from '@mui/material/styles';
import { gray, orange } from '../themePrimitives';

export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        ...theme.applyStyles('dark', {
          backgroundColor: `${alpha(orange[900], 0.5)}`,
          border: `1px solid ${alpha(orange[800], 0.5)}`,
        }),
        "& .MuiAlert-action": {
          "& .MuiButtonBase-root": {
            backgroundColor: "transparent",
            width: "25px",
            height: "25px",
            border: 0
          }
        }
      }),

    }
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
