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
            alert("CONFIG_UPDATED");
        } catch (err) { setError("ERR: UPDATE_FAILED"); }
    };

    return (
        <div className='flex flex-col lg:flex-row justify-center gap-16 py-10 px-4'>
            <div className="w-full max-w-lg bg-gradient-to-b from-[#111] to-black border border-white/10 p-12 rounded-xl shadow-2xl">
                <h2 className="text-5xl font-black tracking-tighter uppercase text-white mb-10">Config</h2>
                <div className="space-y-8">
                    {['First Name', 'Last Name', 'Age', 'Photo URL'].map((label, idx) => (
                        <div key={idx} className="border-b border-white/10 focus-within:border-white transition-all py-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">{label}</label>
                            <input 
                              type="text" 
                              value={[firstName, lastName, age, photoUrl][idx]} 
                              className="w-full bg-transparent outline-none text-white font-bold py-1 text-lg"
                              onChange={(e) => [setFirstName, setLastName, setAge, setPhotoUrl][idx](e.target.value)}
                            />
                        </div>
                    ))}
                    <div className="border-b border-white/10 py-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Bio_Data</label>
                        <textarea className="w-full bg-transparent outline-none text-white font-bold py-1 h-24 resize-none" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </div>
                    {error && <p className="text-red-500 font-black text-[10px] uppercase">{error}</p>}
                    <button className="w-full bg-white text-black py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 active:scale-95 transition-all mt-6" onClick={saveProfile}>Overwrite Local Config</button>
                </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 mb-6">Realtime_Output</p>
              <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} isPreview={true} />
            </div>
        </div>
    );
};

export default EditProfile;