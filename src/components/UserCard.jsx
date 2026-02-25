import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
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
        <div className="max-w-md mx-auto relative group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-black rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-gradient-to-b from-[#222] to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Section with monochrome gradient overlay */}
                <div className="relative h-72">
                    <img src={photoUrl} alt="Hero" className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter text-white uppercase">{firstName}</h2>
                            <h2 className="text-4xl font-black tracking-tighter text-gray-600 uppercase -mt-2">{lastName}</h2>
                        </div>
                        <div className="bg-white text-black px-2 py-1 text-[10px] font-black uppercase tracking-tighter">
                            LVL // {age}
                        </div>
                    </div>

                    <p className="mt-6 text-gray-400 text-sm leading-relaxed font-medium">
                        "{about || "A high-performance developer looking for peer synchronization."}"
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button 
                            onClick={() => handleSendRequest("interested", _id)}
                            className="flex-1 bg-white text-black py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
                        >
                            + Connect
                        </button>
                        <button 
                            onClick={() => handleSendRequest("ignored", _id)}
                            className="flex-1 border border-white/20 text-white py-4 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;