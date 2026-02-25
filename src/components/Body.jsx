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
        <div className="min-h-screen bg-[#F9F9F9] text-black font-sans selection:bg-black selection:text-white">
            <div className="max-w-[1400px] mx-auto px-6">
                <Navbar />
                <main className="py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Body;