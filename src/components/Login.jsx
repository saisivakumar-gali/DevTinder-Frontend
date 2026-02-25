import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) { setError("Invalid credentials. Try again."); }
  };

  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <div className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-md border border-black/5">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter text-black">Welcome Back</h2>
          <p className="text-[#9A7B5C] font-bold text-[10px] uppercase tracking-widest mt-3">Identity Verification Required</p>
        </header>

        <div className="space-y-6">
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ml-4">Email</label>
            <input type="email" className="bg-[#F2EDE4] border-none rounded-full p-4 text-sm outline-none focus:ring-2 ring-[#9A7B5C]" onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ml-4">Password</label>
            <input type="password" className="bg-[#F2EDE4] border-none rounded-full p-4 text-sm outline-none focus:ring-2 ring-[#9A7B5C]" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>}
          <button className="w-full bg-[#2D2D2D] text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all active:scale-95 mt-4" onClick={handleLogin}>
            Login
          </button>
        </div>
        <p className="text-center mt-10 text-xs font-medium opacity-50">
          New here? <Link to="/signup" className="text-[#9A7B5C] font-bold underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;