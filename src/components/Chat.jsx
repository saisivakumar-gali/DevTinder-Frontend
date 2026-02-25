import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket"; // Ensure this has transports: ["polling", "websocket"]

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const loggedInUser = useSelector((store) => store.user);
    const scrollRef = useRef(null);
    const socketRef = useRef(null);

    // Auto-scroll to bottom whenever messages update
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!loggedInUser) return;

        // 1. Establish Socket Connection
        socketRef.current = createSocketConnection();

        // 2. Join the specific chat room
        socketRef.current.emit("joinChat", {
            senderId: loggedInUser._id,
            targetUserId,
        });

        // 3. Listen for incoming messages
        socketRef.current.on("messageReceived", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [targetUserId, loggedInUser]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        socketRef.current.emit("sendMessage", {
            senderId: loggedInUser._id,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-base-200">
            {/* 1. MESSAGES SECTION */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 
                            /* Mobile: add massive bottom padding so messages clear the floating input + footer */
                            pb-40 md:pb-4">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`chat ${msg.senderId === loggedInUser._id ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-header opacity-50 text-xs mb-1">
                            {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className={`chat-bubble ${msg.senderId === loggedInUser._id ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* 2. INPUT SECTION */}
            <div className="
                /* MOBILE: Float above footer */
                fixed bottom-[64px] left-0 w-full p-4 bg-base-300 border-t border-gray-700 z-50
                /* LAPTOP: Reset to normal flow at bottom of chat box */
                md:static md:bottom-0 md:bg-transparent md:border-t-0
            ">
                <div className="flex gap-2 max-w-4xl mx-auto items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="input input-bordered flex-1 bg-neutral focus:outline-none focus:border-primary"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="btn btn-primary px-6"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;