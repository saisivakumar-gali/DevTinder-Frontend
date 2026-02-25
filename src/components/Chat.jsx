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

    const fetchChatMessages = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/chat/${targetUserId}`, { withCredentials: true });
            setMessages(res.data.messages || []);
            setTargetUser(res.data.participants?.find(p => p._id !== user._id));
        } catch (err) { console.log(err); }
    };

    useEffect(() => { if (targetUserId) fetchChatMessages(); }, [targetUserId]);
    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    useEffect(() => {
        const socket = createSocketConnection();
        socketRef.current = socket;
        socket.emit("joinChat", { senderId: user._id, targetUserId });
        socket.on("messageReceived", (msg) => setMessages(prev => [...prev, msg]));
        return () => socket.disconnect();
    }, [targetUserId]);

    const sendMessage = () => {
        if (!input.trim()) return;
        socketRef.current.emit("sendMessage", { senderId: user._id, targetUserId, text: input });
        setInput("");
    };

    return (
        <div className='max-w-4xl mx-auto h-[75vh] bg-[#0F172A] rounded-[50px] overflow-hidden shadow-2xl flex flex-col border border-white/5'>
            <header className='p-8 bg-white/5 backdrop-blur-md flex items-center gap-4 border-b border-white/5'>
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#9A7B5C]">
                    <img src={targetUser?.photoUrl} alt="target" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className='text-white font-black text-xl tracking-tight'>{targetUser?.firstName}</h1>
                    <p className='text-[#9A7B5C] text-[10px] font-bold uppercase'>Online Session</p>
                </div>
            </header>

            <div className='flex-1 overflow-y-auto p-10 space-y-6'>
                {messages.map((msg, i) => {
                    const isSelf = msg.senderId === user._id;
                    return (
                        <div key={i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-5 rounded-[25px] ${isSelf ? 'bg-[#9A7B5C] text-white rounded-br-none' : 'bg-white/10 text-slate-200 rounded-bl-none'}`}>
                                <p className="text-sm font-medium">{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            <div className='p-8 bg-white/5 flex items-center gap-4'>
                <input className='flex-1 bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white text-sm outline-none focus:border-[#9A7B5C]' placeholder="Write a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button className='bg-white text-black w-14 h-14 rounded-full font-bold flex items-center justify-center' onClick={sendMessage}>➔</button>
            </div>
        </div>
    );
};
export default Chat;