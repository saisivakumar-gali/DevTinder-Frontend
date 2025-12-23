import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector(store=>store.feed);
 
 const getFeed=async()=>{
  if(feed)return;
  try{
    
    const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
    console.log(res.data.data);
    dispatch(addFeed(res.data.data));

  }
  catch(err){
    console.log("Feed Error:",err);
  }
 }

 useEffect(()=>{
  getFeed();
 },[]);

//  if(!feed||feed.length===0)return;


  if (!feed||feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className='font-bold text-2xl opacity-50 italic'>No new Users found yet...</h1>
      </div>
    );
  }

  return feed && (
    <div className='flex  justify-center my-7'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed