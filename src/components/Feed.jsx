import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const getFeed = async () => {
    // Don't fetch if feed already exists in store
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Feed Fetch Error:", err);
    }
  };

  useEffect(() => {
    // Only attempt to fetch feed if we have a logged-in user
    if (user) {
      getFeed();
    }
  }, [user]);

  // 1. If not logged in, render nothing while Body.jsx handles redirect
  if (!user) return null;

  // 2. Loading State: feed is null initially
  if (!feed) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-primary"></span>
          <p className="text-sm opacity-50 font-bold tracking-widest uppercase">Finding developers...</p>
        </div>
      </div>
    );
  }

  // 3. Truly Empty State: API returned an empty array []
  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center p-10 bg-base-200 rounded-3xl border border-dashed border-base-content/20">
          <h1 className='font-black text-3xl opacity-30 italic mb-2'>No new Users found</h1>
          <p className="opacity-50">You've seen everyone! Check back later.</p>
        </div>
      </div>
    );
  }

  // 4. Success State
  return (
    <div className='flex justify-center my-10 animate-in fade-in zoom-in duration-500'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;