import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user, onAction }) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

    const handleSendRequest = async (status, targetId) => {
        // 1. Trigger the direction for the animation
        // Interested = Right (200px), Ignored = Left (-200px)
        if (onAction) {
            onAction(status === "interested" ? 300 : -300);
        }

        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + targetId, {}, { withCredentials: true });
            
            // 2. Small delay to allow the "swipe" animation to be visible
            setTimeout(() => {
                dispatch(removeUserFromFeed(targetId));
            }, 200);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative h-48 md:h-64 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent"></div>
                <img src={photoUrl} alt="Hero" className="w-full h-full object-cover grayscale opacity-80" />
                <div className="absolute bottom-0 right-0 w-full h-16 md:h-24 bg-white transform origin-bottom-right -skew-y-6"></div>
            </div>

            <div className="p-6 md:p-8 -mt-10 md:-mt-12 relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white overflow-hidden shadow-md mb-4 bg-white">
                    <img src={user.photoUrl} alt="avatar" className="w-full h-full object-cover " />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">{firstName} {lastName}</h2>
                <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-1">
                    {gender} • {age} Years
                </p>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed italic border-l-2 border-gray-100 pl-4 line-clamp-3">
                    "{about || "Professional developer looking for mutual connections."}"
                </p>

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
            </div>
        </div>
    );
};

export default UserCard;