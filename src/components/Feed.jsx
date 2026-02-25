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
      /* Adjusted height for mobile view to center the text better */
      <div className="flex justify-center items-center h-[50vh] md:h-[60vh] px-6 text-center">
        <h1 className='font-bold text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-20 italic leading-relaxed'>
          End of Feed // Searching for new developers...
        </h1>
      </div>
    );
  }

  return (
    /* Added px-4 to prevent the card from touching the screen edges on mobile */
    /* Adjusted vertical margin from my-10 to my-6 for smaller screens */
    <div className='flex justify-center my-6 md:my-10 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700'>
      {/* Container to ensure the card doesn't exceed screen width */}
      <div className="w-full flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;