import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { LOGOUT_ICON } from '../utils/icons';

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.log("Logout Error:", err);
        }
    };

    // Helper to style active links
    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return `text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:text-[#9A7B5C] ${
            isActive ? "text-[#9A7B5C] border-b-2 border-[#9A7B5C] pb-1" : "text-[#2D2D2D] opacity-50"
        }`;
    };

    return (
        <nav className="flex items-center justify-between py-10 border-b border-black/[0.05]">
            {/* --- LEFT: ORIGINAL LOGO --- */}
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-[#9A7B5C] transition-colors duration-500">
                        <span className="text-2xl">🧑‍💻</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-2xl tracking-tighter text-[#2D2D2D]">
                            Dev<span className="text-[#9A7B5C]">Tinder</span>
                        </span>
                        <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em] mt-1.5">Match • Code • Connect</span>
                    </div>
                </Link>
            </div>

            {/* --- CENTER: SEPARATE NAVIGATION FIELDS --- */}
            {user && (
                <div className="hidden lg:flex items-center gap-12">
                    <Link to="/" className={getLinkStyle("/")}>Explore</Link>
                    <Link to="/connections" className={getLinkStyle("/connections")}>Connections</Link>
                    <Link to="/requests" className={getLinkStyle("/requests")}>Requests</Link>
                    <Link to="/profile" className={getLinkStyle("/profile")}>My Profile</Link>
                </div>
            )}

            {/* --- RIGHT: ACCOUNT & LOGOUT --- */}
            <div className="flex-1 flex justify-end items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black opacity-30 uppercase tracking-tighter">Verified User</p>
                            <p className="text-sm font-bold text-[#2D2D2D]">{user.firstName}</p>
                        </div>
                        
                        {/* Logout moved out of dropdown for immediate access */}
                        <button 
                            onClick={handleLogout}
                            className="p-3 rounded-full bg-black/5 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 group"
                            title="Logout"
                        >
                            <LOGOUT_ICON className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </button>

                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xl">
                            <img src={user.photoUrl || "https://via.placeholder.com/150"} alt="pfp" className="object-cover w-full h-full" />
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-[#2D2D2D] hover:text-[#9A7B5C]">
                        Login Session
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;