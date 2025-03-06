"use client"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import { createTheme, ThemeProvider } from "@mui/material"

type Props = {
    children: React.ReactNode
}

export default function AppTheme({ children }: Props) {
    const theme = createTheme({})
    return (
        <ThemeProvider theme={theme}>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </ThemeProvider>
    )
}