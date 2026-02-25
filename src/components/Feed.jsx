import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { AnimatePresence, motion } from 'framer-motion';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  
  // State to control the exit direction
  const [exitX, setExitX] = useState(0);

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
      <div className="flex justify-center items-center h-[50vh] md:h-[60vh] px-6 text-center">
        <h1 className='font-bold text-xs md:text-sm uppercase tracking-[0.3em] opacity-20 italic'>
          End of Feed // Searching...
        </h1>
      </div>
    );
  }

  return (
    /* overflow-hidden is important so the card doesn't cause a scrollbar while exiting */
    <div className='flex justify-center my-6 md:my-10 px-4 overflow-hidden relative min-h-[600px]'>
      <AnimatePresence mode="wait">
        <motion.div
          key={feed[0]._id} // Vital for tracking entry/exit
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ 
            opacity: 0, 
            x: exitX,          // Flies off to the left or right
            rotate: exitX / 5, // Tilts based on the swipe direction
            scale: 0.8,
            transition: { duration: 0.4, ease: "easeInOut" } 
          }}
          className="w-full flex justify-center absolute"
        >
          <UserCard 
            user={feed[0]} 
            onAction={(direction) => setExitX(direction)} 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;