import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (err) { console.error("Logout_Error", err); }
    };

    const navLink = (path, label) => (
        <Link to={path} className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${location.pathname === path ? 'text-white border-b-2 border-white pb-1' : 'text-gray-500 hover:text-white'}`}>
            {label}
        </Link>
    );

    return (
        <nav className="flex items-center justify-between py-10 border-b border-white/5 bg-transparent">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:rotate-6 transition-transform duration-500">
                        <span className="text-2xl">🧑‍💻</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-2xl tracking-tighter text-white uppercase">
                            Dev<span className="text-gray-500">Tinder</span>
                        </span>
                        {/* Tagline Integration */}
                        <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.5em] mt-2">
                            MATCH // CODE // SYNC
                        </span>
                    </div>
                </Link>
            </div>

            {user && (
                <div className="hidden lg:flex items-center gap-12">
                    {navLink("/", "Explore")}
                    {navLink("/connections", "Network")}
                    {navLink("/requests", "Invites")}
                    {navLink("/profile", "Config")}
                </div>
            )}

            <div className="flex-1 flex justify-end items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-5">
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest text-[7px]">Status: Authorized</p>
                            <p className="text-sm font-black text-white">{user.firstName}</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/10 shadow-xl hover:border-white transition-all">
                                <img src={user.photoUrl} alt="pfp" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-[#111] mt-6 w-52 p-4 shadow-2xl rounded-2xl border border-white/10 z-50">
                                <li>
                                    <button onClick={handleLogout} className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/10 py-3">
                                        Terminate_Session
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-white border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
                        Initialize
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;