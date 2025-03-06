import "dotenv/config";
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import Chats from "./sockets/chats";
import { parse } from "cookie";
import { decrypt } from "./lib/session";
import { UserProps } from "./types";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = 3000;

const app = next({ dev, hostname, port, turbopack: false });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    io.use(async (socket, next) => {
        try {
            const cookies = socket.handshake.headers.cookie;
            if (!cookies) {
                return next(new Error("No cookies found"));
            }

            const parsedCookies = parse(cookies);
            const sessionToken = parsedCookies["session-token"];
            if (!sessionToken) return next(new Error("Session token missing"));

            const user = await decrypt(sessionToken) as UserProps;
            if (!user || !user._id) return next(new Error("Invalid session"));

            socket.data.uid = user._id;
            next();
        } catch (error) {
            next(new Error("Error parsing session token"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("dashboard", () => {
            console.log("User joined dashboard");
            socket.emit("receive-message", [{ d: "Hello from server" }]); // Sends only to this socket
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
