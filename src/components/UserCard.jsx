import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

    const handleSendRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto min-h-[600px] animate-in fade-in zoom-in duration-700">
            
            {/* LEFT SIDE: Floating Profile Card */}
            <div className="relative z-20 bg-white p-12 rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] w-full max-w-[440px] border border-white">
                <div className="flex flex-col gap-8">
                    {/* Tiny Profile Pic */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#F2EDE4] shadow-sm">
                        <img src={photoUrl} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Name & Title */}
                    <div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none mb-1 text-black">
                            {firstName} <br/>
                            <span className="opacity-15 font-light">{lastName}</span>
                        </h2>
                        <p className="text-[#9A7B5C] font-bold text-[11px] uppercase tracking-[0.2em] mt-4">
                            Software Engineer // {age} // {gender}
                        </p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm leading-relaxed text-gray-400 font-medium italic">
                        "{about || "A developer looking for a partner to build scalable solutions and share clean code vibes."}"
                    </p>

                    {/* Tech Stack Visuals */}
                    <div className="pt-6 border-t border-gray-50">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-4">Tech Interests</p>
                        <div className="flex gap-6 text-2xl grayscale opacity-30">
                            <span>💻</span><span>📂</span><span>🔗</span><span>🛠️</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            className="flex-1 bg-[#2D2D2D] text-white py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Connect
                        </button>
                        <button 
                            className="flex-1 border-2 border-black/5 text-gray-400 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-gray-50 active:scale-95 transition-all"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Pass
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Large Hero Background */}
            <div className="relative flex-1 hidden lg:block h-[600px] w-full">
                <div 
                    className="absolute inset-0 rounded-[80px] overflow-hidden shadow-2xl"
                    style={{ backgroundColor: '#D9CFC1' }}
                >
                    <img 
                        src={photoUrl} 
                        alt="Hero" 
                        className="w-full h-full object-cover grayscale opacity-70 mix-blend-multiply" 
                    />
                    
                    {/* Background Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center p-16 select-none pointer-events-none">
                        <h3 className="text-[150px] font-black text-white leading-none uppercase tracking-tighter opacity-10">CODE</h3>
                        <h3 className="text-[150px] font-black text-white leading-none uppercase tracking-tighter opacity-10 ml-32">PARTNER</h3>
                    </div>

                    {/* Branding Tag */}
                    <div className="absolute bottom-12 right-12 text-white/40 text-[10px] font-bold tracking-[0.5em] uppercase">
                        DevTinder // {firstName}
                    </div>
                </div>
                
                {/* Visual Accent Circle */}
                <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
            </div>

        </div>
    );
};

export default UserCard;