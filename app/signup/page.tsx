"use client";
import { Box, Button, Container, Grid2, TextField, Typography, Link, Grow, AlertTitle, debounce, Alert, InputAdornment } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { Google, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import NextLink from "next/link";
import { signup } from "@/app/action/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";


export default function SignUp() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [state, action, pending] = useActionState(signup, undefined);
    const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});

    const handleGoogleSignup = () => {
        console.log("Signup with Google");
        // Implement Google OAuth logic here
    };

    const navigateToDashbaord = debounce(() => {
        router.push("/dashboard")
    }, 600);

    useEffect(() => {
        if (state?.message && state?.message != "") {
            enqueueSnackbar(state.message, { variant: state.status ? "success" : "error" })
        }
        if (state?.status == true) {
            navigateToDashbaord();
        }
    }, [state])
    return (
        <Container maxWidth="xl">
            <Grid2 container spacing={2} sx={{ height: "100vh", alignItems: "center" }}>
                {/* Left Side - Features */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Box sx={{ textAlign: "center", px: 4 }}>
                        <Typography variant="h2" component={"h1"} fontWeight="bold">
                            Join Nyurat Today
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                            Create a free account and enjoy secure messaging with end-to-end encryption.
                        </Typography>
                        <Box sx={{ maxWidth: "300px", mx: "auto" }}>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="small"
                                fullWidth
                                startIcon={<Google />}
                                sx={{ mt: 4 }}
                                onClick={handleGoogleSignup}
                            >
                                Sign up with Google
                            </Button>
                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <Typography variant="body2">
                                    Already have an account?{" "}
                                    <Link component={NextLink} href="/signin" sx={{ fontWeight: "bold" }}>
                                        Sign In
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>

                {/* Right Side - Register Form */}
                <Grid2 size={{ xs: 12, md: 5 }}>
                    <Box sx={{ p: 4, borderRadius: 2 }}>
                        <Typography variant="h3" component={"h2"} fontWeight="bold" sx={{ mb: 2 }}>
                            Create an Account
                        </Typography>

                        <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                label="Full Name"
                                type="text"
                                name="name"
                                variant="outlined"
                                fullWidth
                                required
                                error={state?.errors.name && true}
                                helperText={state?.errors.name}
                                defaultValue={state?.data?.name}
                                disabled={pending}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                required
                                error={state?.errors.email && true}
                                helperText={state?.errors.email}
                                defaultValue={state?.data?.email}
                                disabled={pending}
                            />
                            <TextField
                                label="Password"
                                type={visibility.pwd ? "text" : "password"}
                                name="password"
                                variant="outlined"
                                fullWidth
                                required
                                error={state?.errors.password && true}
                                helperText={state?.errors.password}
                                defaultValue={state?.data?.password}
                                disabled={pending}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => setVisibility(prev => ({ ...prev, pwd: !prev["pwd"] }))}>
                                                {visibility["pwd"] == true ? <VisibilityRounded /> : <VisibilityOffRounded />}
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                type={visibility.cpwd ? "text" : "password"}
                                name="passwordConfirm"
                                variant="outlined"
                                fullWidth
                                required
                                error={state?.errors.passwordConfirm && true}
                                helperText={state?.errors.passwordConfirm}
                                disabled={pending}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => setVisibility(prev => ({ ...prev, cpwd: !prev["cpwd"] }))}>
                                                {visibility["cpwd"] == true ? <VisibilityRounded /> : <VisibilityOffRounded />}
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />

                            <Button type="submit"
                                variant="contained"
                                color="primary"
                                loading={pending}
                                fullWidth
                                sx={{ mt: 3 }}>
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Container>
    );
}
