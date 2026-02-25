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
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { if (user) getFeed(); }, [user]);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className='font-bold text-sm uppercase tracking-[0.3em] opacity-20 italic'>End of Feed // Searching...</h1>
      </div>
    );
  }

  return (
    <div className='flex justify-center my-10 animate-in fade-in slide-in-from-bottom-5 duration-700'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;