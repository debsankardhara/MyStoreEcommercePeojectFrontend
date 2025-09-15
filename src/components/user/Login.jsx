import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    // const url = 'http://localhost:3000/api/user'


    const navigate = useNavigate();

    const { token, fetchToken, url } = useContext(AppContext);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/api/user/login`, { email, password }, {
                headers: {
                    "Content-Type": "Application/json"
                }
            })



            // console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            setEmail('');
            setPassword('');

            if (response.data.success === true) {
                toast.success(response.data.message)
                navigate('/');
            }

            fetchToken();

        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-300 bg-gradient-to-t from-orange-100 to-white">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                    Login Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 ">


                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-orange-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p

                    onClick={() => navigate('/register')}
                    className="text-center text-gray-600 mt-6 text-sm">
                    Don't have an account?{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
