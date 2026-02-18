import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket'; // The socket util we created
import { useSelector } from 'react-redux';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const socketRef = useRef(null);
    const scrollRef = useRef(null);

    // Replace this with your actual logged-in user ID from Redux/Context
    const user=useSelector((store) => store.user);
    const currentUserId = user?._id; 
    console.log("Current User ID:", currentUserId);

    // Auto-scroll to latest message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!currentUserId) return; // Wait for user ID to be available
        const socket = createSocketConnection();
        socketRef.current = socket;

        // Join the unique room for this pair
        socket.emit("joinChat", { senderId: currentUserId, targetUserId });

        // Listen for new messages
        socket.on("messageReceived", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => socket.disconnect();
    }, [currentUserId,targetUserId]);

    const sendMessage = () => {
        if (!input.trim()) return;
        socketRef.current.emit("sendMessage", {
            senderId: currentUserId,
            targetUserId,
            text: input
        });
        setInput("");
    };

    return (
        <div className='w-full max-w-2xl mx-auto border border-base-content/10 m-5 h-[80vh] flex flex-col bg-base-200 rounded-2xl shadow-xl overflow-hidden'>
            
            {/* Header */}
            <header className='p-4 border-b border-base-content/10 bg-base-300 flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Developer Chat</h1>
                <span className='badge badge-success badge-outline'>Online</span>
            </header>

            {/* Message Area */}
            <div className='flex-1 overflow-y-auto p-6 space-y-2'>
                {messages.map((msg, index) => {
                    const isSelf = msg.senderId === currentUserId;
                    return (
                        <div key={index} className={`chat ${isSelf ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full border border-primary/20">
                                    <img src={isSelf ? "/my-pfp.png" : "/match-pfp.png"} alt="avatar" />
                                </div>
                            </div>
                            <div className={`chat-bubble shadow-sm ${isSelf ? 'chat-bubble-primary' : 'chat-bubble-neutral'}`}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Footer */}
            <div className='p-4 bg-base-300 flex items-center gap-3'>
                <input 
                    className='input input-bordered flex-1 bg-base-100' 
                    type="text" 
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className='btn btn-primary px-6' onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;