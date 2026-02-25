import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError("Credentials mismatch. Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <div className="bg-white/70 backdrop-blur-2xl p-12 rounded-[60px] shadow-2xl w-full max-w-md border border-white relative overflow-hidden">
        {loading && (
            <div className="absolute inset-0 bg-white/60 z-50 flex flex-col items-center justify-center backdrop-blur-md">
                <span className="loading loading-ring loading-lg text-[#9A7B5C]"></span>
                <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-50">Synchronizing...</p>
            </div>
        )}
        
        <header className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter">Welcome Back</h2>
          <p className="text-[#9A7B5C] font-bold text-[10px] uppercase tracking-widest mt-2">Initialize Session</p>
        </header>

        <div className="space-y-6">
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ml-4">Email</label>
            <input type="email" className="bg-[#F2EDE4]/50 border-none rounded-full p-5 text-sm outline-none focus:ring-2 ring-[#9A7B5C]" onChange={(e) => setEmailId(e.target.value)} />
          </div>
          
          <div className="form-control relative">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ml-4">Password</label>
            <input 
                type={showPassword ? "text" : "password"} 
                className="bg-[#F2EDE4]/50 border-none rounded-full p-5 text-sm outline-none focus:ring-2 ring-[#9A7B5C]" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
                className="absolute right-6 top-[44px] text-[9px] font-black uppercase opacity-40 hover:opacity-100"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="text-red-400 text-[10px] font-black text-center uppercase">{error}</p>}

          <button className="w-full bg-gradient-to-r from-[#2D2D2D] to-[#555] text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all mt-4" onClick={handleLogin}>
            Login Session
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;