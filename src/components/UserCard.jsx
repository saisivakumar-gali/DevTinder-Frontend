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
        <div className="flex justify-center items-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="relative group w-full max-w-[420px] h-[600px] overflow-hidden rounded-[3rem] bg-slate-900 border border-white/10 shadow-2xl">
                
                {/* Hero Background Image */}
                <img 
                    src={photoUrl} 
                    alt="Developer" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent"></div>

                {/* Content Plate */}
                <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-md bg-white/[0.03] border-t border-white/10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-white">
                                {firstName} <span className="text-indigo-400">{lastName}</span>
                            </h2>
                            <p className="text-indigo-300 font-mono text-xs mt-1 uppercase tracking-widest">
                                {gender} // {age} Years
                            </p>
                        </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-6 opacity-80 italic">
                        "{about || "Ready to collaborate on the next big tech stack."}"
                    </p>

                    {/* Tech Badges (Dummy Icons for UI) */}
                    <div className="flex gap-3 mb-8">
                        {['React', 'Node', 'AWS'].map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="flex gap-4">
                        <button 
                            className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-95 flex items-center justify-center gap-2"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            <span>Connect</span>
                            <span className="text-xl">⚡</span>
                        </button>
                        <button 
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all active:scale-95"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Skip
                        </button>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Available for collab</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;