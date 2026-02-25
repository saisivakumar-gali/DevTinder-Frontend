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

  if (!requests || requests.length === 0) return <div className="text-center py-20 font-black uppercase tracking-widest text-gray-700">No Pending Requests</div>;

  return (
    <div className='max-w-4xl mx-auto py-10 px-4'>
      <h1 className='font-black text-7xl tracking-tighter uppercase text-white mb-16 border-b-2 border-white/10 pb-6'>Invites</h1>
      <div className='grid gap-6'>
        {requests.map((request) => {
          const user = request.fromUserId;
          return (
            <div key={user._id} className='p-10 bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-xl flex flex-col md:flex-row items-center gap-10'>
              <div className="w-28 h-28 grayscale border border-white/10 rounded-lg">
                <img src={user.photoUrl} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className='flex-1 text-center md:text-left'>
                <h2 className='font-black text-3xl tracking-tighter text-white uppercase'>{user.firstName} {user.lastName}</h2>
                <p className='text-xs text-gray-500 mt-2 font-medium italic opacity-60'>"{user.about || "Wants to sync"}"</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => reviewRequest("rejected", request._id)} className="border border-white/10 px-8 py-4 font-black text-xs uppercase tracking-widest text-white hover:bg-white/5 transition-all">Reject</button>
                <button onClick={() => reviewRequest("accepted", request._id)} className="bg-white text-black px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;