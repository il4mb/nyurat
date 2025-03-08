"use client";
import { Box, Button, Container, TextField, Typography, Link, Alert, AlertTitle, Grow, debounce } from "@mui/material";
import { useActionState, useEffect } from "react";
import { Google } from "@mui/icons-material";
import ForgotPassword from "./ui/forgot-password";
import NextLink from "next/link";
import { signin } from "@/app/action/auth";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();
    const [state, action, pending] = useActionState(signin, undefined);
    const { enqueueSnackbar } = useSnackbar();
    const navigateToDashbaord = debounce(() => {
        router.push("/dashboard")
    }, 600);

    const handleGoogleLogin = () => {
        console.log("Login with Google");
        // Implement Google OAuth logic here
    };

    useEffect(() => {
        if (state?.message) {
            enqueueSnackbar(state.message, { variant: state.status ? "success" : "error" });
        }
        if (state?.status == true) {
            navigateToDashbaord();
        }
    }, [state]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Box sx={{ textAlign: "center", px: 4, mb: 4 }}>
                    <Typography variant="h2" component={"h1"} fontWeight="bold">
                        Welcome to Nyurat
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
                        Experience secure and private messaging with end-to-end encryption.
                        Stay connected with confidence.
                    </Typography>
                </Box>

                <Box sx={{ maxWidth: "460px", mx: "auto", pt: 2 }}>
                    <Typography variant="h4" component={"h2"} fontWeight="bold" sx={{ mb: 2 }}>
                        Sign In
                    </Typography>
                    <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            required
                            error={state?.errors.email && true}
                            helperText={state?.errors.email}
                            defaultValue={state?.data.email}
                            disabled={pending}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            fullWidth
                            required
                            error={state?.errors.password && true}
                            helperText={state?.errors.password}
                            disabled={pending}
                        />
                        <ForgotPassword sx={{ mt: "-10px" }} />

                        <Button loading={pending} type="submit" variant="contained" color="primary" sx={{ mt: 1 }} fullWidth>
                            Login
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: "center", mt: 3 }}>
                        <Typography>OR</Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        startIcon={<Google />}
                        onClick={handleGoogleLogin}
                        sx={{ mt: 2 }}
                    >
                        Sign in with Google
                    </Button>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link component={NextLink} href="/signup" sx={{ fontWeight: "bold" }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
