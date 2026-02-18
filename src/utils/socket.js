import { io } from "socket.io-client";

// This MUST be your Render backend URL
export const BACKEND_URL = "https://devtinder-backend-vyr7.onrender.com";

/**
 * createSocketConnection
 * -----------------------
 * Initializes the socket instance.
 * withCredentials: true ensures your JWT cookies are sent for authentication.
 * transports: ["websocket"] prevents Render from trying to use long-polling.
 */
export const createSocketConnection = () => {
  return io(BACKEND_URL, {
    withCredentials: true,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
};