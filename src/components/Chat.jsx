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

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const fetchChatMessages = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/chat/${targetUserId}`, {
                withCredentials: true
            });
            setMessages(res.data.messages || []);
            const otherPerson = res.data.participants?.find(p => p._id !== currentUserId);
            setTargetUser(otherPerson);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        if (targetUserId && currentUserId) fetchChatMessages();
    }, [targetUserId, currentUserId]);

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
        <div className='max-w-5xl mx-auto h-[80vh] flex flex-col bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl'>
            
            {/* Header: Identity Bar */}
            <header className='p-6 bg-gradient-to-r from-[#111] to-black border-b border-white/10 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-lg overflow-hidden border border-white/20 grayscale'>
                        <img src={targetUser?.photoUrl} alt="target" className='object-cover w-full h-full' />
                    </div>
                    <div>
                        <h1 className='text-white font-black text-xl tracking-tighter uppercase'>
                            {targetUser?.firstName} {targetUser?.lastName}
                        </h1>
                        <div className='flex items-center gap-2'>
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></div>
                            <span className='text-[9px] font-black text-green-500 uppercase tracking-widest'>Secure_Session_Active</span>
                        </div>
                    </div>
                </div>
                <div className='hidden md:block text-right'>
                    <p className='text-[9px] font-black text-gray-600 uppercase tracking-widest'>Channel_ID</p>
                    <p className='text-xs font-mono text-gray-400'>#CHAT_{targetUserId?.slice(-6).toUpperCase()}</p>
                </div>
            </header>

            {/* Message Area: Terminal View */}
            <div className='flex-1 overflow-y-auto p-8 space-y-6 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] bg-fixed'>
                {messages.map((msg, index) => {
                    const isSelf = msg.senderId === currentUserId;
                    return (
                        <div key={index} className={`flex ${isSelf ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                            <div className={`max-w-md p-5 rounded-xl border ${
                                isSelf 
                                ? 'bg-white text-black border-white' 
                                : 'bg-gradient-to-b from-[#222] to-black text-white border-white/10'
                            }`}>
                                <p className='text-sm font-bold leading-relaxed'>{msg.text}</p>
                                <div className={`text-[9px] mt-2 font-black uppercase opacity-40 flex gap-2 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                    {formatTime(msg.createdAt || new Date())}
                                    {isSelf && <span>[ACK]</span>}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input: Command Line */}
            <div className='p-6 bg-[#0a0a0a] border-t border-white/10 flex items-center gap-4'>
                <span className='font-black text-gray-700 text-lg'>$</span>
                <input 
                    className='flex-1 bg-transparent outline-none text-white font-bold text-sm placeholder:text-gray-800' 
                    type="text" 
                    placeholder="Enter message or command..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                />
                <button 
                    className='bg-white text-black px-10 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5' 
                    onClick={sendMessage}
                >
                    Transmit
                </button>
            </div>
        </div>
    );
};

export default Chat;