import React from 'react';

const UserCard = ({ user, isPreview = false }) => {
    if (!user) return null;
    const { firstName, lastName, age, about, photoUrl } = user;

    return (
        <div className="relative bg-white p-10 rounded-[45px] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.1)] w-full max-w-[380px] border border-black/5 animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
                {/* Profile Photo Preview */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F2EDE4] shadow-sm">
                    <img 
                        src={photoUrl || "https://via.placeholder.com/150"} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    />
                </div>
                
                <div>
                    <h2 className="text-4xl font-black tracking-tighter leading-tight text-black">
                        {firstName || "New"}<br/>
                        <span className="opacity-20">{lastName || "User"}</span>
                    </h2>
                    <p className="text-[#9A7B5C] font-bold text-[10px] uppercase tracking-[0.2em] mt-3">
                        Developer • {age || "24"} Years
                    </p>
                </div>

                <p className="text-sm leading-relaxed opacity-50 font-medium italic line-clamp-3">
                    "{about || "Your bio will appear here. Start typing to see it change in the preview..."}"
                </p>

                <div className="pt-4 border-t border-black/5">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-3">Looking For...</p>
                    <div className="flex gap-4 text-xl grayscale opacity-30">
                        <span>💻</span><span>🔗</span><span>📁</span>
                    </div>
                </div>

                {/* Hide buttons in preview mode if desired, or keep for visual accuracy */}
                {!isPreview && (
                    <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-[#2D2D2D] text-white py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Connect</button>
                        <button className="flex-1 border border-black/10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Pass</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;