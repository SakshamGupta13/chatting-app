import { io } from "socket.io-client";

export function connectWS() {
    return io("https://chatting-app-backend-zrhe.onrender.com", {
        transports: ["websocket"],
        reconnection: true,
    });
}