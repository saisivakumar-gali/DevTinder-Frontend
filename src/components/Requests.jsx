import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) { console.log(err); }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchRequests(); }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center opacity-20 font-bold uppercase tracking-[0.3em] text-xs">
          No Pending Invites
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto py-6 md:py-10 px-4'>
      <h1 className='font-black text-4xl md:text-6xl tracking-tighter uppercase mb-8 md:mb-12 border-b-4 border-black pb-4'>
        Invites
      </h1>
      
      <div className='grid gap-4'>
        {requests.map((request) => {
          const user = request.fromUserId;

          /* CRITICAL SAFETY CHECK: Skip if the user object is null/missing */
          if (!user) return null;

          return (
            <div key={user._id} className='p-6 md:p-8 bg-white border border-gray-100 flex flex-col sm:flex-row items-center gap-6 md:gap-8'>
              
              {/* Profile Image - Fixed with optional chaining */}
              <div className="w-20 h-20 md:w-24 md:h-24 grayscale border border-gray-200 flex-shrink-0">
                <img src={user?.photoUrl} alt="profile" className="w-full h-full object-cover" />
              </div>

              {/* Text info - Fixed with optional chaining */}
              <div className='flex-1 text-center sm:text-left'>
                <h2 className='font-bold text-xl md:text-2xl tracking-tighter'>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className='text-[10px] md:text-xs text-gray-400 mt-1 italic line-clamp-2 md:line-clamp-none'>
                  "{user?.about || "Wants to connect"}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col md:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                <button 
                  onClick={() => reviewRequest("rejected", request._id)} 
                  className="flex-1 sm:w-32 border border-gray-200 px-4 py-3 md:py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  Reject
                </button>
                <button 
                  onClick={() => reviewRequest("accepted", request._id)} 
                  className="flex-1 sm:w-32 bg-black text-white px-4 py-3 md:py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;