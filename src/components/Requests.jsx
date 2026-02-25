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

  if (!requests || requests.length === 0) return <div className="text-center py-20 opacity-20 font-bold uppercase tracking-widest">No Pending Invites</div>;

  return (
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <h1 className='font-black text-6xl tracking-tighter uppercase mb-12 border-b-4 border-black pb-4'>Invites</h1>
      <div className='grid gap-4'>
        {requests.map((request) => {
          const user = request.fromUserId;
          return (
            <div key={user._id} className='p-8 bg-white border border-gray-100 flex flex-col sm:flex-row items-center gap-8'>
              <div className="w-24 h-24 grayscale border border-gray-200">
                <img src={user.photoUrl} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className='flex-1 text-center sm:text-left'>
                <h2 className='font-bold text-2xl tracking-tighter'>{user.firstName} {user.lastName}</h2>
                <p className='text-xs text-gray-400 mt-1 italic'>"{user.about || "Wants to connect"}"</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => reviewRequest("rejected", request._id)} className="border border-gray-200 px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-gray-50">Reject</button>
                <button onClick={() => reviewRequest("accepted", request._id)} className="bg-black text-white px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-gray-800">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;