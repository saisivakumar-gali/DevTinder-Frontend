import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Body = () => {
  const dispatch=useDispatch();
  const Navigate=useNavigate();
  const userData=useSelector(store=>store.user);

  const fetchuser=async()=>{
    if(userData)return;
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));

    }
    catch(err){
      if(err.status==="401"){
        Navigate("/login");
      }
      
      console.log("Fetch User Error:",err);
    }
  }

  useEffect(()=>{

      fetchuser();
    
    
  },[]);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body