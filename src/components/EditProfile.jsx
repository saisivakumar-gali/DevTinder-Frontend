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
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err?.response?.data?.error || "Update failed");
        }
    };

    return (
    <>    
  <div className='flex justify-center items-center gap-10 px-4 h-[calc(100vh-80px)] overflow-hidden bg-base-100'>
            
            
  <div className="card bg-base-300 w-96 h-[550px] shadow-2xl border border-white/5">
    <div className="card-body p-8 flex flex-col justify-between">
       <div>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Edit Profile</h2>
                        
        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">First Name</label>
                                    <input type="text" value={firstName} className="input input-bordered input-sm w-full" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">Last Name</label>
                                    <input type="text" value={lastName} className="input input-bordered input-sm w-full" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="form-control">
                                    <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">Age</label>
                                    <input type="number" value={age} className="input input-bordered input-sm w-full" onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div className="form-control">
                                    <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">Gender</label>
                                    <select className="select select-bordered select-sm w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="" disabled>Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">Photo URL</label>
                                <input type="text" value={photoUrl} className="input input-bordered input-sm w-full" onChange={(e) => setPhotoUrl(e.target.value)} />
                            </div>

                            <div className="form-control">
                                <label className="label-text text-[10px] font-bold opacity-50 uppercase mb-1">About</label>
                                <textarea className="textarea textarea-bordered w-full h-20 resize-none leading-tight" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        {error && <p className='text-error text-[10px] mb-2 text-center font-semibold'>{error}</p>}
                        <button className="btn btn-primary btn-block btn-sm" onClick={saveProfile}>Update Profile</button>
                    </div>
                </div>
            </div>

            {/* Standardized UserCard */}
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />

   </div>
   {showToast && <div className="toast toast-top toast-end mt-15">
  <div className="alert alert-success">
    <span>Profile Updated successfully!!</span>
  </div>
</div>}
   </>
 );
};

export default EditProfile;