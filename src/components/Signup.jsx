import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { ERROR_ICON } from '../utils/icons';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
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
     
      setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate("/");
            } ,1000);
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='flex justify-center items-center min-h-[85vh] py-10 px-4'>
      <div className="card bg-base-300 w-full max-w-md shadow-2xl border border-white/5 overflow-hidden">
        
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-linear-to-r from-primary via-secondary to-accent"></div>

        <div className="card-body p-8">
          <div className='text-center mb-6'>
            <h2 className="text-3xl font-black tracking-tighter">Join DevTinder</h2>
            <p className='text-sm opacity-60 mt-2'>Create your profile and start connecting</p>
          </div>

          <div className="space-y-4">
            {/* First & Last Name Row */}
            <div className="flex gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-bold opacity-70">First Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder=""
                  value={firstName} 
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-bold opacity-70">Last Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder=""
                  value={lastName} 
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold opacity-70">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder=""
                value={emailId} 
                className="input input-bordered w-full focus:input-primary transition-all bg-base-200" 
                onChange={(e) => setEmailId(e.target.value)} 
              />
            </div>

            {/* Password Field */}
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
            </div>
          </div>

          {/* Elegant Error Message */}
          {error && (
            <div className="flex items-center gap-2 mt-4 px-1 text-error animate-pulse">
              <ERROR_ICON />
              <span className="text-xs font-medium">{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="card-actions flex-col mt-8">
            <button 
              className={`btn btn-primary btn-block text-lg shadow-lg ${loading ? 'loading' : ''}`} 
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            
            <div className='text-center w-full mt-6'>
              <p className='text-sm opacity-70'>
                Already have an account?{" "}
                <Link to="/login" className='text-primary font-bold hover:underline'>
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
     {showToast && <div className="toast toast-top toast-end mt-15">
  <div className="alert alert-success">
    <span>Sign Up Account successfully!!</span>
  </div>
</div>}
    </>
  );
};

export default Signup;