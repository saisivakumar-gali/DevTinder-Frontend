import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user=useSelector(store=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async()=>{
    try{
     await axios.post(BASE_URL+"/logout",{}, {withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");

    }
    catch(err){
      console.log("Logout Error:",err);
    }
  }
  return (
    
<div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost hover:bg-base-100 rounded-xl  text-xl">🧑‍💻DevTinder</Link>
  </div>
  {user && <div className="flex ">
    
    <div className='py-2 -mx-2'>Welcome,{user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 flex ">
      
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>

      
    
  )
}

export default Navbar