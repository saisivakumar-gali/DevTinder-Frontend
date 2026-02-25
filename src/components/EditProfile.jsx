import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
    const [age, setAge] = useState(user.age || '');
    const [about, setAbout] = useState(user.about || '');
    const [gender, setGender] = useState(user.gender || '');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, photoUrl, gender, age, about,
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            alert("Profile Updated Successfully");
        } catch (err) { 
            // Better error logging to see the 400 Bad Request reason
            console.error(err.response?.data);
            setError(err.response?.data || "Update failed"); 
        }
    };

    return (
        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 py-6 md:py-10 px-4'>
            
            <div className="w-full max-w-md bg-white border border-gray-100 p-6 md:p-10 shadow-sm order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6 md:mb-8">Settings</h2>
                
                <div className="space-y-5 md:space-y-6">
                    {['First Name', 'Last Name', 'Age', 'Photo URL'].map((label, idx) => (
                        <div key={idx} className="border-b border-gray-100 py-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
                            <input 
                              type="text" 
                              value={[firstName, lastName, age, photoUrl][idx]} 
                              className="w-full outline-none text-sm font-semibold py-1 bg-transparent"
                              onChange={(e) => [setFirstName, setLastName, setAge, setPhotoUrl][idx](e.target.value)}
                            />
                        </div>
                    ))}

                    {/* --- GENDER SECTION ADDED HERE --- */}
                    <div className="border-b border-gray-100 py-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Gender</label>
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full outline-none text-sm font-semibold py-1 bg-transparent cursor-pointer appearance-none"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div className="border-b border-gray-100 py-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">About</label>
                        <textarea 
                            className="w-full outline-none text-sm font-semibold py-1 h-20 resize-none bg-transparent" 
                            value={about} 
                            onChange={(e) => setAbout(e.target.value)} 
                        />
                    </div>

                    {error && <p className='text-red-500 text-[10px] font-bold uppercase'>{error}</p>}

                    <button 
                        className="w-full bg-black text-white py-4 font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform" 
                        onClick={saveProfile}
                    >
                        Save 
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center w-full max-w-sm lg:max-w-none order-1 lg:order-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Live Preview</p>
                <div className="w-full transform scale-90 md:scale-100 transition-transform">
                    <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;