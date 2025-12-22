import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { PROFILE_ICON, CONNECTIONS_ICON, LOGOUT_ICON, REQUESTS_ICON } from '../utils/icons';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  return (
    <div className="navbar bg-base-300 px-4 md:px-12 shadow-2xl sticky top-0 z-50 h-20 border-b border-white/5">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3 group transition-all duration-300">
          <div className="relative flex items-center justify-center w-11 h-11 bg-linear-to-br from-primary to-secondary rounded-2xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
            <span className="text-2xl">🧑‍💻</span>
            <div className="absolute inset-0 bg-primary rounded-2xl animate-pulse opacity-20"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl tracking-tighter flex items-center">
              <span className="text-base-content">Dev</span>
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ml-0.5">Tinder</span>
            </span>
            <span className="text-[9px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1 ml-0.5">Match • Code • Connect</span>
          </div>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center">
            <p className="text-sm font-medium opacity-70">
              Welcome back, <span className="font-extrabold text-base-content underline decoration-primary decoration-2 underline-offset-4">{user.firstName}</span>
            </p>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-primary/30 hover:border-primary transition-all p-0.5">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={user.photoUrl || "https://via.placeholder.com/150"} className="object-cover" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-200 rounded-2xl z-1 mt-4 w-60 p-3 shadow-2xl border border-white/10 backdrop-blur-md">
              <div className="px-4 py-3 mb-2 border-b border-base-100 md:hidden">
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Account</p>
                <p className="font-bold truncate text-primary">{user.firstName} {user.lastName}</p>
              </div>
              <li>
                <Link to="/profile" className="flex items-center gap-3 py-3 rounded-xl group hover:bg-primary hover:text-primary-content transition-all">
                  <PROFILE_ICON className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  <span className="font-semibold">My Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="flex items-center gap-3 py-3 rounded-xl group hover:bg-primary hover:text-primary-content transition-all">
                  <CONNECTIONS_ICON className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  <span className="font-semibold">Connections</span>
                </Link>
              </li>

              <li>
                <Link to="/requests" className="flex items-center gap-3 py-3 rounded-xl group hover:bg-primary hover:text-primary-content transition-all">
                  <REQUESTS_ICON className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  <span className="font-semibold">Requests</span>
                </Link>
              </li>



              <div className="divider my-1 opacity-20"></div>
              <li>
                <a onClick={handleLogout} className="flex items-center gap-3 py-3 text-error hover:bg-error hover:text-error-content rounded-xl font-bold transition-all">
                  <LOGOUT_ICON className="w-5 h-5" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;