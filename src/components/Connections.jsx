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
    <div className='max-w-3xl mx-auto py-6 md:py-10 px-4'>
      {/* Responsive Header: Font size scales from 4xl to 6xl */}
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-8 md:mb-12 border-b-4 border-black pb-4">
        <h1 className='font-black text-4xl md:text-6xl tracking-tighter uppercase'>Connections</h1>
        <span className='text-[10px] md:text-xs font-bold opacity-30 uppercase tracking-widest'>Total // {connections?.length || 0}</span>
      </div>

      <div className='grid gap-1'>
        {connections?.map((connection) => (
          <div key={connection._id} className='flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-4 md:p-6 bg-white border border-gray-100 hover:border-black transition-all group'>
            
            {/* Profile Image - Slightly smaller on mobile */}
            <div className="w-14 h-14 md:w-16 md:h-16 border border-gray-200 group-hover:grayscale-0 transition-all flex-shrink-0">
              <img src={connection.photoUrl} alt="profile" className="w-full h-full object-cover" />
            </div>

            {/* Info Section */}
            <div className='flex-1'>
              <h2 className='font-bold text-lg md:text-xl tracking-tight'>{connection.firstName} {connection.lastName}</h2>
              <p className='text-[10px] font-bold uppercase opacity-40 tracking-widest'>{connection.age} • {connection.gender}</p>
            </div>

            {/* Link/Button - Full width on mobile, auto on tablet+ */}
            <Link 
              to={"/chat/"+connection._id} 
              className="w-full sm:w-auto text-center border-2 border-black px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Message
            </Link>
          </div>
        ))}
        
        {connections?.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200">
            <p className="font-bold uppercase tracking-widest opacity-20">No connections found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;