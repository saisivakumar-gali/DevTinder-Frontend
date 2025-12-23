import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  
  const dispatch=useDispatch();
  const requests=useSelector(store=>store.requests);

  const reviewRequest=async(status,_id)=>{
    try{
      const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
      dispatch(removeRequest(_id));

     
    }
    catch(err){
      console.log("Error reviewing request",err);
    }
  }

  const fetchRequests=async()=>{
    try{
      const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    }
    catch(err){
      console.log("Error fetching requests",err);
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[]);
  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className='font-bold text-2xl opacity-50 italic'>No requests found yet...</h1>
      </div>
    );
  }

  return (
    // Added container constraints and pb-20 to avoid footer overlap
    <div className='max-w-4xl mx-auto my-10 px-4 pb-20'>
      <div className="flex justify-between items-center mb-10 border-b border-base-300 pb-4">
        <h1 className='font-extrabold text-4xl tracking-tight'>Requests</h1>
        <div className="badge badge-primary badge-lg px-4">{requests.length} total</div>
      </div>

      <div className='grid gap-6'>
        {requests.map((request) => {
          if (!request.fromUserId) return null;
          const { firstName, lastName, photoUrl, gender, age, about, _id } = request.fromUserId;
          
          return (
            <div 
              key={_id} 
              className='flex items-center gap-6 p-5 rounded-2xl bg-base-300/50 hover:bg-base-300 border border-white/5 transition-all shadow-xl hover:shadow-primary/5 group'
            >
              {/* Profile Image with Ring */}
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={photoUrl || "https://via.placeholder.com/150"} alt="profile" />
                </div>
              </div>

              {/* Text Info Section */}
              <div className='flex-1 overflow-hidden'>
                <div className='flex items-baseline gap-2'>
                  <h2 className='font-bold text-2xl group-hover:text-primary transition-colors'>
                    {firstName} {lastName}
                  </h2>
                  {age && (
                    <span className='text-sm opacity-60 font-medium'>• {age} {gender && `, ${gender}`}</span>
                  )}
                </div>

                {/* About Section with Line Clamping */}
                <p className='mt-2 text-sm opacity-80 leading-relaxed line-clamp-2 italic'>
                  {about ? `"${about}"` : "No bio available."}
                </p>

                <div className='mt-3 flex gap-2'>
                   <button className="btn btn-xs btn-outline btn-primary px-4">Message</button>
                   <button className="btn btn-xs btn-ghost opacity-50">View Profile</button>
                </div>
              </div>

            
              <div className="flex flex-col sm:flex-row gap-3">
  <button 
    className="btn btn-sm btn-ghost text-error hover:bg-error/10 border border-error/20 px-6 rounded-xl transition-all duration-300 active:scale-95"
    onClick={() =>{
      reviewRequest("rejected",request._id);
    }}
  >
    Reject
  </button>
  <button 
    className="btn btn-sm btn-primary px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95"
    onClick={() => {
      reviewRequest("accepted",request._id);
    }}
  >
    Accept
  </button>
</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests