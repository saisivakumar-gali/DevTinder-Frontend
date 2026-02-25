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
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[80vh] px-4'>
      <div className="relative w-full max-w-md p-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] shadow-2xl">
        <div className="bg-[#0b1120] backdrop-blur-xl p-10 rounded-[2.4rem] border border-white/5">
          
          <div className='text-center mb-10'>
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
              Developer Portal
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white">Welcome Back</h2>
            <p className='text-slate-400 text-sm mt-3 opacity-60'>Continue your journey on devtinder</p>
          </div>

          <div className="space-y-6">
            <div className="form-control">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Hash</label>
              <input 
                type="email" 
                placeholder="root@devtinder.io"
                className="input bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all rounded-2xl h-14 text-white"
                onChange={(e) => setEmailId(e.target.value)} 
              />
            </div>

            <div className="form-control">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Secret Key</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="input bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all rounded-2xl h-14 text-white"
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          {error && <p className='text-rose-400 text-xs mt-4 text-center font-medium animate-pulse'>{error}</p>}

          <div className="mt-10">
            <button 
              className={`btn border-none bg-indigo-600 hover:bg-indigo-500 text-white w-full rounded-2xl h-14 font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-95 transition-all ${loading ? 'loading' : ''}`} 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Establish Connection"}
            </button>
            
            <p className='text-center text-sm mt-8 text-slate-500'>
              New member? <Link to="/signup" className='text-indigo-400 font-bold hover:underline'>Initialize Account</Link>
            </p>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center mt-20">
          <div className="alert bg-indigo-600 text-white border-none rounded-2xl shadow-2xl">
            <span className="font-bold">✓ Connection Established</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;