"use client"
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

export default function GlobalComponent({ children }: Props) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      {children}
    </SnackbarProvider>
  )
}