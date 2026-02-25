import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {

    if(!user){
        return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className='font-bold text-2xl opacity-50 italic'>No new Users found yet...</h1>
      </div>
    );
    }
    const { firstName, lastName, age, gender, about, photoUrl,_id } = user;
    const dispatch=useDispatch();

    const handleSendRequest=async(status,_id)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        }
        catch(err){
            console.log("Send Request Error:",err);
        }
    }

    return (
        /* Perfectly matches the Form Card height and width */
        <div className="card bg-base-300 w-96 h-550px shadow-2xl border border-white/5 overflow-hidden">
            <figure className="h-[60%] relative">
                <img
                    src={photoUrl || "https://via.placeholder.com/400"}
                    alt="User photo"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-base-300 to-transparent opacity-50"></div>
            </figure>

            <div className="card-body p-8 flex flex-col justify-between">
                <div>
                    <h2 className="card-title text-2xl font-bold truncate">
                        {firstName} {lastName}
                    </h2>
                    {(age || gender) && (
                        <div className="flex gap-2 mt-1">
                            {age && <span className="badge badge-sm badge-secondary badge-outline">{age} years</span>}
                            {gender && <span className="badge badge-sm badge-ghost capitalize">{gender}</span>}
                        </div>
                    )}
                    <p className="mt-3 text-sm opacity-70 line-clamp-3 italic">
                        "{about || "No description yet..."}"
                    </p>
                </div>
                
                <div className="card-actions justify-center gap-3">
                    <button className="btn btn-outline btn-sm flex-1" onClick={()=>{
                        handleSendRequest("ignored",_id)
                    }
                    }>Ignore</button>
                    <button className="btn btn-primary btn-sm flex-1" onClick={()=>{
                        handleSendRequest("interested",_id)
                    }}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;