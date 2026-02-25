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
    <div className='max-w-3xl mx-auto py-10'>
      <h1 className='text-5xl font-black tracking-tighter mb-12 text-black'>Connections<span className="text-[#9A7B5C]">.</span></h1>
      <div className='grid gap-4'>
        {connections?.map((conn) => (
          <div key={conn._id} className='bg-white p-6 rounded-[35px] flex items-center justify-between shadow-sm border border-black/[0.03] hover:shadow-xl transition-all duration-500'>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F2EDE4]">
                <img src={conn.photoUrl} alt="pfp" className="object-cover w-full h-full" />
              </div>
              <div>
                <h2 className='font-black text-xl'>{conn.firstName} {conn.lastName}</h2>
                <p className='text-[#9A7B5C] font-bold text-[10px] uppercase tracking-widest'>{conn.gender} // {conn.age}</p>
              </div>
            </div>
            <Link to={"/chat/"+conn._id} className="bg-[#2D2D2D] text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Message</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Connections;