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

    // Mobile specific link style
    const mobileNavLink = (path, icon, label) => (
        <Link to={path} className={`flex flex-col items-center justify-center gap-1 ${location.pathname === path ? 'text-black' : 'text-gray-400'}`}>
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
        </Link>
    );

    return (
        <>
            {/* Top Navbar */}
            <nav className="flex items-center justify-between py-4 md:py-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-0">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">🧑‍💻</div>
                    <span className="text-lg md:text-xl font-bold tracking-tighter">DevTinder</span>
                </Link>

                {user && (
                    <div className="hidden md:flex items-center gap-10">
                        {navLink("/", "Explore")}
                        {navLink("/connections", "Matches")}
                        {navLink("/requests", "Invites")}
                        {navLink("/profile", "Profile")}
                    </div>
                )}

                <div className="flex items-center gap-3 md:gap-6">
                    {user ? (
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-sm overflow-hidden border border-gray-200">
                                <img src={user.photoUrl} alt="pfp" className="object-cover w-full h-full " />
                            </div>
                            <button onClick={handleLogout} className="text-[10px] md:text-sm font-bold border border-black px-3 py-1.5 md:px-4 md:py-2 hover:bg-black hover:text-white transition-all">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-xs md:text-sm font-bold border border-black px-4 py-2 md:px-6 md:py-2">Login</Link>
                    )}
                </div>
            </nav>

            {/* Bottom Navigation (Mobile Only) */}
            {user && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    {mobileNavLink("/", "🔥", "Explore")}
                    {mobileNavLink("/connections", "🤝", "Matches")}
                    {mobileNavLink("/requests", "📩", "Invites")}
                    {mobileNavLink("/profile", "👤", "Profile")}
                </div>
            )}
            
            {/* Spacer for bottom nav so content isn't hidden behind it */}
            {user && <div className="h-20 md:hidden"></div>}
        </>
    );
};

export default Navbar;