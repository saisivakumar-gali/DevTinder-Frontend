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
        <nav className="flex items-center justify-between py-10">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-[#9A7B5C] rounded-full flex items-center justify-center text-white text-xs">👁️</div>
                <span className="text-2xl font-black tracking-tighter text-[#9A7B5C]">DevTinder</span>
            </Link>

            {user && (
                <div className="flex items-center gap-16">
                    <div className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] opacity-60">
                        <Link to="/" className="hover:text-[#9A7B5C] transition-all">Explore</Link>
                        <Link to="/connections" className="hover:text-[#9A7B5C] transition-all">Matches</Link>
                        <Link to="/profile" className="hover:text-[#9A7B5C] transition-all">Profile</Link>
                    </div>
                    
                    <div className="flex items-center gap-4 group cursor-pointer relative">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Account</p>
                            <p className="text-sm font-bold">{user.firstName}</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img src={user.photoUrl || "https://via.placeholder.com/150"} alt="pfp" className="object-cover w-full h-full" />
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-white mt-6 w-52 p-3 shadow-2xl rounded-3xl border border-black/5 z-50">
                                <li className="font-bold"><Link to="/profile">My Profile</Link></li>
                                <li className="font-bold"><Link to="/requests">Requests</Link></li>
                                <div className="divider my-1 opacity-5"></div>
                                <li><a onClick={handleLogout} className="text-red-500 font-bold">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;