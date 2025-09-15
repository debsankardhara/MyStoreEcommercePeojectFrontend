import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Context/AppContext'



function Profile() {
    const [token, setToken] = useState();
    const [user, setUser] = useState({});

    const { url } = useContext(AppContext)

    // const url = "http://localhost:3000/api/user/profile";

    const navigate = useNavigate();



    // Fetch user profile
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        setToken(userToken);
        if (userToken) {
            fetchProfile();
        }
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-orange-100 relative overflow-hidden">
                {/* Decorative top circle */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full -mr-20 -mt-20 opacity-30"></div>

                {/* Avatar */}
                <div className="flex justify-center mb-6 relative">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name || "User"
                            }&background=ff7f50&color=fff&size=120`}
                        alt="avatar"
                        className="w-28 h-28 rounded-full border-4 border-orange-400 shadow-md z-10"
                    />
                </div>

                {/* User Info */}
                <h1 className="text-2xl font-extrabold text-gray-900">
                    {user.name || "Guest User"}
                </h1>
                <p className="text-gray-600 text-sm mb-6">{user.email || "No Email"}</p>

                <button
                    onClick={() => {
                        navigate('/orderconfermation')
                    }}
                    className="w-full mb-[20px] py-3 border-orange-500 border  text-orange font-semibold rounded-lg shadow-md hover:bg-gradient-to-b hover:from-orange-50 hover:to-orange-100  transition">
                    All  Orders
                </button>


                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition duration-300">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default Profile;
