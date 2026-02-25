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
        /* Adjusted max-width and added w-full for fluid scaling on mobile */
        <div className="w-full max-w-sm md:max-w-md mx-auto bg-white border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            {/* Header Hero Area - Scaled height for mobile */}
            <div className="relative h-48 md:h-64 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent"></div>
                <img src={photoUrl} alt="Hero" className="w-full h-full object-cover grayscale opacity-80" />
                {/* Diagonal Cut Overlay - Responsive skew */}
                <div className="absolute bottom-0 right-0 w-full h-16 md:h-24 bg-white transform origin-bottom-right -skew-y-6"></div>
            </div>

            {/* Tightened padding on mobile (p-6) vs desktop (md:p-8) */}
            <div className="p-6 md:p-8 -mt-10 md:-mt-12 relative z-10">
                {/* Scaled Avatar */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white overflow-hidden shadow-md mb-4 bg-white">
                    <img src={photoUrl} alt="avatar" className="w-full h-full object-cover " />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">{firstName} {lastName}</h2>
                <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-1">
                    {gender} • {age} Years
                </p>

                {/* Bio text - added line-clamp to keep card height consistent */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed italic border-l-2 border-gray-100 pl-4 line-clamp-3 md:line-clamp-none">
                    "{about || "Professional developer looking for mutual connections."}"
                </p>

                {/* Buttons - Optimized for touch with better height and font size */}
                <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
                    <button 
                        onClick={() => handleSendRequest("interested", _id)}
                        className="flex-1 bg-black text-white py-3 md:py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all"
                    >
                        + Add
                    </button>
                    <button 
                        onClick={() => handleSendRequest("ignored", _id)}
                        className="flex-1 border border-gray-200 py-3 md:py-4 font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-gray-50 active:bg-gray-100 transition-all"
                    >
                        Ignore
                    </button>
                </div>
                
                <div className="mt-6 flex justify-center">
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest">No Mutual Connections</span>
                </div>
            </div>
        </div>
    );
};

export default UserCard;