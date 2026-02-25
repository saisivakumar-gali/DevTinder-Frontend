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
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, photoUrl, gender, age, about,
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            setError(err?.response?.data?.error || "Update failed");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-start gap-16 px-4 py-10">
            {/* --- LEFT: EDIT FORM --- */}
            <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h2 className="text-3xl font-black tracking-tighter mb-8 text-[#9A7B5C]">Edit Profile</h2>
                
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">First Name</label>
                            <input type="text" value={firstName} className="bg-[#F2EDE4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#9A7B5C] outline-none" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Last Name</label>
                            <input type="text" value={lastName} className="bg-[#F2EDE4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#9A7B5C] outline-none" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Photo URL</label>
                        <input type="text" value={photoUrl} className="bg-[#F2EDE4] border-none rounded-2xl p-3 text-sm outline-none" onChange={(e) => setPhotoUrl(e.target.value)} />
                    </div>

                    <div className="form-control">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Bio</label>
                        <textarea className="bg-[#F2EDE4] border-none rounded-2xl p-3 text-sm h-28 resize-none outline-none" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </div>

                    {error && <p className='text-red-500 text-[10px] font-bold uppercase'>{error}</p>}
                    
                    <button className="w-full bg-[#2D2D2D] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 mt-4" onClick={saveProfile}>
                        Save Changes
                    </button>
                </div>
            </div>

            {/* --- RIGHT: THE DYNAMIC PREVIEW --- */}
            <div className="w-full lg:w-auto flex flex-col items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Live Preview</p>
                {/* We pass the local state variables to UserCard so the photo updates instantly */}
                <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} isPreview={true} />
            </div>

            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert bg-[#9A7B5C] text-white rounded-2xl border-none shadow-2xl">
                        <span className="font-bold">✓ Profile Updated</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;