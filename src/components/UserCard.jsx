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
        } catch (err) { console.log(err); }
    };

    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Left: Interactive Profile Card */}
            <div className="z-20 bg-white p-12 rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] w-full max-w-[420px] border border-black/[0.03]">
                <div className="flex flex-col gap-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden p-1 bg-[#F2EDE4]">
                        <img src={photoUrl} alt="profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                    
                    <div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none">{firstName}</h2>
                        <h2 className="text-5xl font-black tracking-tighter leading-none opacity-20">{lastName}</h2>
                        <p className="text-[#9A7B5C] font-bold text-sm uppercase tracking-widest mt-4">Full-stack Developer • {age}</p>
                    </div>

                    <p className="text-sm leading-relaxed opacity-50 font-medium italic">
                        "{about || "Passionate about building scalable applications and finding the perfect code partner."}"
                    </p>

                    <div className="pt-6 border-t border-black/[0.05]">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-4">Looking For...</p>
                        <div className="flex gap-6 text-2xl grayscale opacity-40">
                            <span>💻</span><span>🔗</span><span>📁</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            className="flex-1 bg-[#2D2D2D] text-white py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Connect
                        </button>
                        <button 
                            className="flex-1 border-2 border-black/10 text-black/60 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black/5 transition-all active:scale-95"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Pass
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Large Hero Section (Code Partners) */}
            <div className="relative flex-1 hidden lg:block h-[600px] w-full group">
                <div className="absolute inset-0 bg-[#D9CFC1] rounded-[80px] overflow-hidden shadow-inner">
                    <img 
                        src={photoUrl} 
                        alt="Hero" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-80 grayscale transition-transform duration-1000 group-hover:scale-105" 
                    />
                    
                    {/* Decorative Typography Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center p-16 select-none pointer-events-none">
                        <div className="overflow-hidden">
                            <h3 className="text-[140px] font-black text-white leading-none uppercase tracking-tighter opacity-10">CODE</h3>
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-[140px] font-black text-white leading-none uppercase tracking-tighter opacity-10 ml-24">PARTNERS</h3>
                        </div>
                    </div>
                    
                    {/* Location Badge */}
                    <div className="absolute bottom-12 right-12 flex items-center gap-2">
                        <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">Built for Developers</span>
                    </div>
                </div>
                
                {/* Background Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/30 rounded-full blur-3xl -z-10"></div>
            </div>

        </div>
    );
};

export default UserCard;