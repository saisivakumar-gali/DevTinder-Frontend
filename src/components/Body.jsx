import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (err) {
            if (location.pathname !== "/login" && location.pathname !== "/signup") {
                navigate("/login");
            }
        }
    };

    useEffect(() => { fetchUser(); }, []);

    return (
        <div 
            className="min-h-screen transition-colors duration-500" 
            style={{ backgroundColor: '#F2EDE4', color: '#2D2D2D', fontFamily: 'Inter, sans-serif' }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <Navbar />
                <main className="pb-24">
                    <Outlet />
                </main>
            </div>
            
            {/* Minimalist Side Branding */}
            <div className="fixed bottom-10 left-12 hidden xl:flex gap-8 opacity-20 text-[10px] font-bold uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">
                <span>DevTinder // Connect</span>
                <span>Match // Code</span>
            </div>
        </div>
    );
};

export default Body;