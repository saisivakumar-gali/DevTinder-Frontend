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
            setError("ERR: UNAUTHORIZED_ACCESS");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-full max-w-sm p-12 bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-xl shadow-2xl relative">
                {loading && (
                    <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
                        <span className="loading loading-ring loading-lg text-white"></span>
                    </div>
                )}
                
                <h2 className="text-5xl font-black tracking-tighter text-white uppercase mb-2">Login</h2>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-10">Access // DevTinder_Node</p>

                <div className="space-y-8">
                    <div className="border-b-2 border-white/10 focus-within:border-white transition-all py-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email_ID</label>
                        <input 
                            type="email" 
                            className="w-full bg-transparent outline-none text-white font-bold py-1 placeholder:text-gray-800"
                            onChange={(e) => setEmailId(e.target.value)} 
                        />
                    </div>
                    
                    <div className="border-b-2 border-white/10 focus-within:border-white transition-all py-2 relative">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Passphrase</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full bg-transparent outline-none text-white font-bold py-1 placeholder:text-gray-800"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button 
                            className="absolute right-0 bottom-2 text-[10px] font-black uppercase text-gray-500 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "[Hide]" : "[View]"}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-black text-center">{error}</p>}

                    <button 
                        className="w-full bg-white text-black py-5 font-black text-sm uppercase tracking-[0.3em] hover:bg-gray-200 transition-all mt-6 shadow-lg shadow-white/5"
                        onClick={handleLogin}
                    >
                        Execute Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;