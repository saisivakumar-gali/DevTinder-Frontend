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
            console.error("Error fetching chat messages:", err);
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
        /* Adjusted height for mobile (h-[85vh]) and removed huge shadow on small screens */
        <div className='max-w-5xl mx-auto border border-black h-[85vh] md:h-[80vh] flex bg-white overflow-hidden shadow-none md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]'>
            
            {/* Sidebar Branding (Noir Style) */}
            {/* Reduced width on mobile (w-16) and reduced padding */}
            <div className='w-16 md:w-64 bg-black flex flex-col items-center py-6 md:py-10 text-white'>
                <div className='w-10 h-10 md:w-12 md:h-12 border-2 border-white mb-6 overflow-hidden'>
                    <img src={targetUser?.photoUrl} alt="target" className='object-cover w-full h-full' />
                </div>
                <h1 className='hidden md:block font-black text-xl tracking-tighter uppercase text-center px-4'>
                    {targetUser?.firstName}<br/>{targetUser?.lastName}
                </h1>
                <div className='mt-auto p-4 hidden md:block'>
                    <p className='text-[10px] font-bold uppercase tracking-widest opacity-40 rotate-180 [writing-mode:vertical-lr]'>
                        Established Connection // 2026
                    </p>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className='flex-1 flex flex-col relative w-full'>
                {/* Header Info */}
                {/* Reduced padding on mobile */}
                <header className='p-4 md:p-6 border-b border-gray-100 flex justify-between items-center'>
                    <span className='text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]'>Developers Chat</span>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-black rounded-full animate-pulse'></div>
                        <span className='text-[9px] md:text-[10px] font-bold uppercase tracking-widest'>Active</span>
                    </div>
                </header>

                {/* Messages View */}
                {/* Reduced padding (p-4) and max-width for bubbles on mobile */}
                <div className='flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-[#FAFAFA]'>
                    {messages.map((msg, index) => {
                        const isSelf = msg.senderId === currentUserId;
                        return (
                            <div key={index} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] md:max-w-md p-3 border ${isSelf ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'}`}>
                                    <p className='text-sm font-medium leading-relaxed break-words'>{msg.text}</p>
                                    <div className={`text-[9px] mt-2 font-bold uppercase opacity-40 flex gap-2 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                        {formatTime(msg.createdAt || new Date())}
                                        {isSelf && <span>[Sent]</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>

                {/* Terminal Input */}
                {/* Made input and button more compact on mobile */}
                <div className='p-4 md:p-6 border-t border-black bg-white flex items-center gap-2 md:gap-4'>
                    <span className='hidden sm:block font-bold opacity-30'>{'>'}</span>
                    <input 
                        className='flex-1 outline-none text-sm font-bold placeholder:text-gray-300 min-w-0' 
                        type="text" 
                        placeholder="Type..." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                    />
                    <button 
                        className='bg-black text-white px-4 md:px-8 py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:invert transition-all active:scale-95' 
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;