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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(BASE_URL + "/signup", { 
        firstName, 
        lastName, 
        emailId, 
        password 
      }, { withCredentials: true });
      
      dispatch(addUser(res?.data?.data || res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Review inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[85vh] py-6 md:py-10 px-4'>
      {/* Reduced shadow on mobile (shadow-[12px_12px...]) to prevent horizontal scroll issues */}
      <div className="w-full max-w-lg p-6 md:p-12 bg-white border border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Loading Overlay */}
        {loading && (
            <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
                <span className="loading loading-ring loading-lg text-black"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4">Please wait a moment...</p>
            </div>
        )}

        <div className='mb-8 md:mb-10'>
            {/* Scaled text from 4xl to 5xl */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">Register</h2>
            <p className='text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mt-4'>
                DevTinder // New Developer Onboarding
            </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Identity Block: Stacks on mobile (flex-col), grid on tablet+ (sm:grid) */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
            <div className="border-b border-gray-200 py-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
              <input 
                type="text" 
                className="w-full outline-none text-sm font-semibold py-1 bg-transparent" 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className="border-b border-gray-200 py-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
              <input 
                type="text" 
                className="w-full outline-none text-sm font-semibold py-1 bg-transparent" 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
          </div>

          {/* Credentials Block */}
          <div className="border-b border-gray-200 py-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
            <input 
              type="email" 
              className="w-full outline-none text-sm font-semibold py-1 bg-transparent" 
              onChange={(e) => setEmailId(e.target.value)} 
            />
          </div>

          <div className="relative border-b border-gray-200 py-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Access Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full outline-none text-sm font-semibold py-1 bg-transparent" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button"
              className="absolute right-0 bottom-2 text-[10px] font-bold uppercase opacity-30 hover:opacity-100 transition-opacity p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>
        </div>

        {error && (
            <div className="mt-6 p-4 border border-black bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center">
                Error: {error}
            </div>
        )}

        <div className="mt-8 md:mt-12 flex flex-col gap-6">
          <button 
            className="w-full bg-black text-white py-4 md:py-5 font-black text-xs uppercase tracking-[0.3em] hover:invert transition-all duration-300 active:scale-[0.98]" 
            onClick={handleSignup}
            disabled={loading}
          >
            Register
          </button>
          
          <div className='text-center'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
                Existing User? <Link to="/login" className='text-black underline underline-offset-4 inline-block ml-1 py-2'>Return to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;