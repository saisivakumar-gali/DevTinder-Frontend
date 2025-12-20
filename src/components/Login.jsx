import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId,setEmailId]=useState('virat@gmail.com');
  const [password,setPassword]=useState('Virat@1234');
  const [error,setError]=useState('');
   const dispatch=useDispatch();
   const navigate=useNavigate();

  const handleLogin=async()=>{
    try{
      const res=await axios.post( BASE_URL+"/login",{
        emailId,
        password
      },{withCredentials:true});
      console.log("Login Response:",res.data);
      dispatch(addUser(res.data));
      navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
      console.log("Login Error:",err);
    }
  }
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-86 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
  <fieldset className="fieldset my-1">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text" value={emailId} className="input" onChange={(e)=>setEmailId(e.target.value)}  />
 
</fieldset>

<fieldset className="fieldset my-1">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" value={password} className="input" onChange={(e)=>setPassword(e.target.value)}  />
</fieldset>
    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login