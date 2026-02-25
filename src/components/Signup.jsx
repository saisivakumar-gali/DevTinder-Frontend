import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res?.data?.data || res.data));
      navigate("/");
    } catch (err) { alert("SIGNUP_FAILED"); } finally { setLoading(false); }
  };

  return (
    <div className='flex justify-center items-center min-h-[85vh] py-10 px-4'>
      <div className="w-full max-w-lg p-12 bg-gradient-to-b from-[#111] to-black border border-white/10 rounded-xl shadow-2xl relative">
        {loading && <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center"><span className="loading loading-ring loading-lg text-white"></span></div>}

        <h2 className="text-6xl font-black tracking-tighter uppercase text-white mb-2 leading-none">Join</h2>
        <p className='text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-12'>Initialize_New_Node</p>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="border-b border-white/10 py-2">
              <label className="text-[10px] font-black text-gray-600 uppercase">First_Name</label>
              <input type="text" className="w-full bg-transparent outline-none text-white font-bold py-1" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="border-b border-white/10 py-2">
              <label className="text-[10px] font-black text-gray-600 uppercase">Last_Name</label>
              <input type="text" className="w-full bg-transparent outline-none text-white font-bold py-1" onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="border-b border-white/10 py-2">
            <label className="text-[10px] font-black text-gray-600 uppercase">Email_Address</label>
            <input type="email" className="w-full bg-transparent outline-none text-white font-bold py-1" onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div className="relative border-b border-white/10 py-2">
            <label className="text-[10px] font-black text-gray-600 uppercase">Passphrase</label>
            <input type={showPassword ? "text" : "password"} className="w-full bg-transparent outline-none text-white font-bold py-1" onChange={(e) => setPassword(e.target.value)} />
            <button className="absolute right-0 bottom-2 text-[10px] font-black text-gray-600 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "[Hide]" : "[View]"}
            </button>
          </div>
        </div>

        <button className="w-full bg-white text-black py-5 font-black text-xs uppercase tracking-[0.4em] hover:bg-gray-200 mt-12 shadow-xl active:scale-95 transition-all" onClick={handleSignup}>Create Identity</button>
        <p className='text-center text-[10px] font-black uppercase tracking-widest text-gray-600 mt-8'>Existing User? <Link to="/login" className='text-white underline underline-offset-4'>Log_In</Link></p>
      </div>
    </div>
  );
};

export default Signup;