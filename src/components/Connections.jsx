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
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <div className="flex items-baseline gap-4 mb-12 border-b-4 border-black pb-4">
        <h1 className='font-black text-6xl tracking-tighter uppercase'>Connections</h1>
        <span className='text-xs font-bold opacity-30 uppercase tracking-widest'>Total // {connections?.length || 0}</span>
      </div>

      <div className='grid gap-1'>
        {connections?.map((connection) => (
          <div key={connection._id} className='flex items-center gap-6 p-6 bg-white border border-gray-100 hover:border-black transition-all group'>
            <div className="w-16 h-16 border border-gray-200 grayscale group-hover:grayscale-0 transition-all">
              <img src={connection.photoUrl} alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className='flex-1'>
              <h2 className='font-bold text-xl tracking-tight'>{connection.firstName} {connection.lastName}</h2>
              <p className='text-[10px] font-bold uppercase opacity-40 tracking-widest'>{connection.age} • {connection.gender}</p>
            </div>
            <Link to={"/chat/"+connection._id} className="border-2 border-black px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Message
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;