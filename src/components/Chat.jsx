import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL, createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [targetUser, setTargetUser] = useState(null);
    const socketRef = useRef(null);
    const scrollRef = useRef(null);

    const user = useSelector((store) => store.user);
    const currentUserId = user?._id;

    const fetchChatMessages = async () => {
        try {
            // Added the missing "/" in the URL
            const res = await axios.get(`${BACKEND_URL}/chat/${targetUserId}`, {
                withCredentials: true
            });
            
            setMessages(res.data.messages || []);
            
            // Find the other user's info from the populated participants array
            const otherPerson = res.data.participants?.find(p => p._id !== currentUserId);
            setTargetUser(otherPerson);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        if (targetUserId && currentUserId) {
            fetchChatMessages();
        }
    }, [targetUserId, currentUserId]);

    // Auto-scroll logic
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!currentUserId) return;
        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("joinChat", { senderId: currentUserId, targetUserId });

        socket.on("messageReceived", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => socket.disconnect();
    }, [currentUserId, targetUserId]);

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
            
            {/* Header with Target User Photo */}
            <header className='p-4 border-b border-base-content/10 bg-base-300 flex items-center gap-3'>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={targetUser?.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="target" />
                    </div>
                </div>
                <div>
                    <h1 className='font-bold text-lg'>{targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Developer"}</h1>
                    <span className='text-xs text-success'>Online</span>
                </div>
            </header>

            {/* Message Area */}
            <div className='flex-1 overflow-y-auto p-6 space-y-2 bg-slate-900'>
                {messages.map((msg, index) => {
                    const isSelf = msg.senderId === currentUserId;
                    return (
                        <div key={index} className={`chat ${isSelf ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full border border-primary/20">
                                    <img 
                                        src={isSelf ? user?.photoUrl : targetUser?.photoUrl} 
                                        alt="pfp" 
                                        onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    />
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