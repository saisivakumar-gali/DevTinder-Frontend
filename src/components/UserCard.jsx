import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user, isPreview = false }) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

    const handleSendRequest = async (status, targetId) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + targetId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(targetId));
        } catch (err) { console.log(err); }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* Left: Floating Card */}
            <div className="z-20 bg-white/80 backdrop-blur-xl p-10 rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] w-full max-w-[420px] border border-white">
                <div className="flex flex-col gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F2EDE4] shadow-sm">
                        <img src={photoUrl || "https://via.placeholder.com/150"} alt="pfp" className="w-full h-full object-cover" />
                    </div>
                    
                    <div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none">{firstName} <br/> <span className="opacity-10">{lastName}</span></h2>
                        <p className="text-[#9A7B5C] font-bold text-[11px] uppercase tracking-widest mt-4">Developer • {age} • {gender}</p>
                    </div>

                    <p className="text-sm leading-relaxed opacity-50 font-medium italic">"{about || "Creating clean code and seeking the perfect development partner."}"</p>

                    {!isPreview && (
                        <div className="flex gap-4 pt-6">
                            <button onClick={() => handleSendRequest("interested", _id)} className="flex-1 bg-gradient-to-r from-[#2D2D2D] to-[#4A4A4A] text-white py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Connect</button>
                            <button onClick={() => handleSendRequest("ignored", _id)} className="flex-1 border-2 border-black/5 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-black/5 active:scale-95 transition-all">Pass</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Large Hero Image with Soft Gradient */}
            <div className="relative flex-1 hidden lg:block h-[600px] w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D9CFC1] to-[#FDFCFB] rounded-[80px] overflow-hidden border-[16px] border-white/30 shadow-2xl">
                    <img src={photoUrl} alt="Hero" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-60 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex flex-col justify-center p-16 select-none pointer-events-none">
                        <h3 className="text-[140px] font-black text-white leading-none uppercase tracking-tighter opacity-10">CODE</h3>
                        <h3 className="text-[140px] font-black text-white leading-none uppercase tracking-tighter opacity-10 ml-24 text-[#9A7B5C]">PARTNER</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;