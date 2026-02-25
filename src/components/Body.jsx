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
        // UI: Beige background, dark neutral text, and clean sans-serif font
        <div className="min-h-screen bg-[#F2EDE4] text-[#2D2D2D] font-sans selection:bg-orange-100">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <Navbar />
                <main className="pb-20">
                    <Outlet />
                </main>
            </div>
            {/* Minimalist Footer integrated into the layout */}
            <div className="fixed bottom-6 left-12 hidden lg:flex gap-6 opacity-30 text-xs font-bold uppercase tracking-widest">
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Instagram</span>
            </div>
        </div>
    );
};

export default Body;