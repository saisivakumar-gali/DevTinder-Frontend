import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (err) { console.log(err); }
    };

    return (
        <nav className="flex items-center justify-between py-6 sticky top-0 z-50 backdrop-blur-md border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
                    <span className="text-xl">🚀</span>
                </div>
                <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    dev<span className="text-indigo-500">tinder</span>
                </span>
            </Link>

            {user && (
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex gap-8 text-[13px] font-medium tracking-wide uppercase">
                        <Link to="/" className="hover:text-indigo-400 transition-colors">Feed</Link>
                        <Link to="/connections" className="hover:text-indigo-400 transition-colors">Network</Link>
                        <Link to="/requests" className="hover:text-indigo-400 transition-colors">Invites</Link>
                    </div>
                    
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                <img src={user.photoUrl} alt="pfp" className="object-cover w-full h-full" />
                            </div>
                            <span className="text-xs font-bold">{user.firstName}</span>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content bg-[#111827] mt-4 w-52 p-2 shadow-2xl rounded-2xl border border-white/10">
                            <li><Link to="/profile" className="py-3">Profile Settings</Link></li>
                            <li><a onClick={handleLogout} className="text-rose-400 font-bold py-3">Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;