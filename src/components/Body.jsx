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
        /** * 1. Responsive Gradient Background: 
         * Added a subtle linear gradient from top-left to bottom-right.
         */
        <div className="min-h-screen bg-gradient-to-br from-[#d0c5c5] via-[#b8adaa] to-[#a39696] text-black font-sans selection:bg-black selection:text-white">
            
            /** * 2. Max-Width Container & Responsive Padding:
             * px-4 for small mobile devices, px-8 for tablets, and px-12 for desktops.
             */
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
                
                /** * 3. Navbar logic: 
                 * Ensure your Navbar component uses flex-col or hidden menus on mobile.
                 */
                <Navbar />
                
                /** * 4. Main Responsive Content:
                 * py-4 on mobile and py-10 on larger screens to maximize space.
                 */
                <main className="py-4 md:py-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Body;