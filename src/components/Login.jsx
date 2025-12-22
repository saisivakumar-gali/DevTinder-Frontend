import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { ERROR_ICON } from '../utils/icons';

const Login = () => {
  const [emailId, setEmailId] = useState('virat@gmail.com');
  const [password, setPassword] = useState('Virat@1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid Credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[80vh] px-4'>
      <div className="card bg-base-300 w-full max-w-md shadow-2xl border border-white/5 overflow-hidden">
        
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>

        <div className="card-body p-8">
          <div className='text-center mb-6'>
            <h2 className="text-3xl font-black tracking-tighter">Welcome Back</h2>
            <p className='text-sm opacity-60 mt-2'>Enter your credentials to access DevTinder</p>
          </div>

          <div className="space-y-4">
            {/* Email Field - Added w-full */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold opacity-70">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com"
                value={emailId} 
                className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                onChange={(e) => setEmailId(e.target.value)} 
              />
            </div>

            {/* Password Field - Added w-full */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold opacity-70">Password</span>
              </label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password} 
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                  type="button"
                  className="absolute right-3 top-3 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity uppercase"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt link link-hover opacity-50">Forgot password?</span>
              </label>
            </div>
          </div>

          {/* Elegant Error Message - No background, just text and icon */}
          {error && (
            <div className="flex items-center gap-2 mt-4 px-1 text-error animate-pulse">
              <ERROR_ICON/>
              <span className="text-xs font-medium">{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="card-actions flex-col mt-6">
            <button 
              className={`btn btn-primary btn-block text-lg shadow-lg ${loading ? 'loading' : ''}`} 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
            
            <div className='text-center w-full mt-6'>
              <p className='text-sm opacity-70'>
                New to DevTinder?{" "}
                <Link to="/signup" className='text-primary font-bold hover:underline'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;