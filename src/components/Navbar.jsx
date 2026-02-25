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
        } catch (err) { console.log(err); }
    };

    const navLink = (path, label) => (
        <Link to={path} className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all ${location.pathname === path ? 'text-[#9A7B5C] border-b-2 border-[#9A7B5C]' : 'opacity-40 hover:opacity-100'}`}>
            {label}
        </Link>
    );

    return (
        <nav className="flex items-center justify-between py-10 border-b border-black/[0.03]">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D2D2D] to-[#666] rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">🧑‍💻</span>
                </div>
                <div className="flex flex-col leading-none">
                    <span className="font-black text-2xl tracking-tighter">Dev<span className="text-[#9A7B5C]">Tinder</span></span>
                    <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em] mt-1.5">Match • Code • Connect</span>
                </div>
            </Link>

            {user && (
                <div className="hidden lg:flex items-center gap-10">
                    {navLink("/", "Explore")}
                    {navLink("/connections", "Connections")}
                    {navLink("/requests", "Requests")}
                    {navLink("/profile", "Profile")}
                </div>
            )}

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black opacity-30 uppercase tracking-tighter">Verified</p>
                            <p className="text-sm font-bold">{user.firstName}</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xl">
                                <img src={user.photoUrl} alt="pfp" className="object-cover w-full h-full" />
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-white mt-6 w-52 p-4 shadow-2xl rounded-[30px] border border-black/5 z-50">
                                <li><a onClick={handleLogout} className="text-red-500 font-bold uppercase text-[10px] tracking-widest">Logout Session</a></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="text-[11px] font-black uppercase tracking-widest hover:text-[#9A7B5C]">Login</Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;