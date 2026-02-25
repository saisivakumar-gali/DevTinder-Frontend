import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchConnections(); }, []);

  return (
    <div className='max-w-4xl mx-auto py-10 px-4'>
      <div className="flex items-end gap-4 mb-16 border-b-2 border-white/10 pb-6">
        <h1 className='font-black text-7xl tracking-tighter uppercase text-white'>Network</h1>
        <span className='text-xs font-black text-gray-500 uppercase tracking-[0.5em] mb-2'>Active_Syncs // {connections?.length || 0}</span>
      </div>

      <div className='grid gap-4'>
        {connections?.map((connection) => (
          <div key={connection._id} className='flex items-center gap-8 p-8 bg-gradient-to-r from-[#1a1a1a] to-black border border-white/5 rounded-xl hover:border-white/20 transition-all group'>
            <div className="w-20 h-20 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10">
              <img src={connection.photoUrl} alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className='flex-1'>
              <h2 className='font-black text-2xl tracking-tight text-white uppercase'>{connection.firstName} {connection.lastName}</h2>
              <p className='text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1'>Access_Level // {connection.age} • {connection.gender}</p>
            </div>
            <Link to={"/chat/"+connection._id} className="bg-white text-black px-10 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 active:scale-95 transition-all">
              Message
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;