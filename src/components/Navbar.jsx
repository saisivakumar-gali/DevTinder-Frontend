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
        <Link to={path} className={`text-sm font-semibold tracking-tight transition-all pb-2 border-b-2 ${location.pathname === path ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}>
            {label}
        </Link>
    );

    return (
        <nav className="flex items-center justify-between py-6 border-b border-gray-100 bg-white sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">🧑‍💻</div>
                <span className="text-xl font-bold tracking-tighter">DevTinder</span>
            </Link>

            {user && (
                <div className="hidden md:flex items-center gap-10">
                    {navLink("/", "Explore")}
                    {navLink("/connections", "Matches")}
                    {navLink("/requests", "Invites")}
                    {navLink("/profile", "Profile")}
                </div>
            )}

            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm overflow-hidden border border-gray-200">
                            <img src={user.photoUrl} alt="pfp" className="object-cover w-full h-full grayscale" />
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-1 text-sm font-bold border border-black px-4 py-2 hover:bg-black hover:text-white transition-all">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="text-sm font-bold border border-black px-6 py-2">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;