"use server"
import { SignupFormSchema, SigninFormSchema, FormState } from '@/app/lib/definitions';
import { encrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, getUserByUsername } from './user';

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm')
    });

    if (!validatedFields.success) {
        return {
            status: false,
            data: {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                passwordConfirm: formData.get('passwordConfirm')
            },
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {
            status: false,
            message: "Email is already in use.",
            data: { name, email, password },
            errors: { email: ["Email is already registered."] },
        };
    }

    let baseUsername = name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let userExists = await getUserByUsername(username);
    let count = 1;
    while (userExists) {
        username = `${baseUsername}${count}`; 
        count++;
        userExists = await getUserByUsername(username);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, username, email, password: hashedPassword, verified: false });
    if (!newUser) {
        return {
            status: false,
            message: "Error creating user. Please try again later.",
            data: { name, email, password },
            errors: {
                name: [],
                email: [],
                password: [],
                passwordConfirm: []
            }
        };
    }
    const uid = newUser.insertedId.toString()
    const session = await encrypt({ uid });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();
    cookieStore.set('session-token', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    return {
        status: true,
        message: "Sign Up Successful",
        errors: {}
    };
}

export async function signin(state: FormState, formData: FormData) {
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            status: false,
            message: "Invalid form fields",
            data: {
                email: formData.get("email"),
                password: formData.get("password"),
            },
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user = await getUserByEmail(email);

    if (!user) {
        return {
            status: false,
            message: "User not found",
            data: { email },
            errors: { email: ["User does not exist"] },
        };
    }
    if (!user.password) {
        return {
            status: false,
            data: { email },
            message: "User have not valid by structure!, please contact the support.",
            errors: {}
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return {
            status: false,
            message: "Invalid email or password",
            data: { email },
            errors: { password: ["Incorrect password"] },
        };
    }

    const session = await encrypt({ uid: user._id });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    cookieStore.set("session-token", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    return {
        status: true,
        message: "Logged in successfully",
        data: { email },
        errors: {},
    };
}
