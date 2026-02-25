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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data || res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[85vh] py-10 px-4'>
      <div className="relative w-full max-w-lg p-1 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-[2.5rem] shadow-2xl">
        <div className="bg-[#0b1120] backdrop-blur-xl p-10 rounded-[2.4rem] border border-white/5">
          
          <div className='text-center mb-10'>
            <h2 className="text-4xl font-bold tracking-tighter text-white">Join the <span className="text-indigo-500">Source</span></h2>
            <p className='text-slate-400 text-sm mt-3 opacity-60'>Build your profile and meet code partners</p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">First Name</label>
                <input type="text" className="input bg-white/5 border-white/10 focus:border-indigo-500 rounded-2xl h-12 text-white" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                <input type="text" className="input bg-white/5 border-white/10 focus:border-indigo-500 rounded-2xl h-12 text-white" onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="form-control">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input type="email" className="input bg-white/5 border-white/10 focus:border-indigo-500 rounded-2xl h-12 text-white" onChange={(e) => setEmailId(e.target.value)} />
            </div>

            <div className="form-control">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Access Token (Password)</label>
              <input type="password" placeholder="••••••••" className="input bg-white/5 border-white/10 focus:border-indigo-500 rounded-2xl h-12 text-white" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {error && <p className='text-rose-400 text-[10px] mt-4 text-center font-bold uppercase tracking-widest'>{error}</p>}

          <div className="mt-10">
            <button 
              className={`btn border-none bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white w-full rounded-2xl h-14 font-bold shadow-xl active:scale-95 transition-all ${loading ? 'loading' : ''}`} 
              onClick={handleSignup}
            >
              Initialize Node
            </button>
            
            <p className='text-center text-sm mt-8 text-slate-500'>
              Already synchronized? <Link to="/login" className='text-indigo-400 font-bold hover:underline'>Return to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;