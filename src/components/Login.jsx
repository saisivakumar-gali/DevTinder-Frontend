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
            setError("Authentication Failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-sm p-10 bg-white border border-gray-100 shadow-2xl relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                )}
                
                <h2 className="text-4xl font-bold tracking-tighter mb-2">Login</h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">DevTinder // Secure Access</p>

                <div className="space-y-6">
                    <div className="relative border-b border-gray-200 py-2">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full outline-none text-sm placeholder:text-gray-300"
                            onChange={(e) => setEmailId(e.target.value)} 
                        />
                    </div>
                    
                    <div className="relative border-b border-gray-200 py-2">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            className="w-full outline-none text-sm placeholder:text-gray-300"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button 
                            className="absolute right-0 top-2 text-[10px] font-bold uppercase opacity-30 hover:opacity-100"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "View"}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase">{error}</p>}

                    <button 
                        className="w-full bg-black text-white py-4 font-bold text-sm uppercase tracking-widest mt-4"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    
                    <div className="text-center mt-6">
                        <Link to="/signup" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                            Create Account →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;