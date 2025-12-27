import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (user) return; // If user is already in Redux, don't fetch again
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true, // This sends the cookie back
            });
            dispatch(addUser(res.data));
        } catch (err) {
            // If token is invalid or expired, redirect to login
            if (err.response && err.response.status === 401) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Body;