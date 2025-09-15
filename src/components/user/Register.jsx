import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const url = 'http://localhost:3000/api/user'

    const { url } = useContext(AppContext);



    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();



        try {

            const response = await axios.post(`${url}/api/user/register`, { name, email, password }, {
                headers: {
                    "Content-Type": "Application/json"
                }
            })



            // console.log(response.data.message);
            toast.success(response.data.message)
            setName('');
            setEmail('');
            setPassword('');

            if (response.data.success === true) {

                navigate('/login');
            }

        } catch (error) {
            // console.log(error.response.data.message);
            toast.error(error.response.data.message)

        }



    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-300 bg-gradient-to-t from-orange-100 to-white">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 ">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition"
                            required
                        />
                    </div>

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
                        Register
                    </button>
                </form>

                {/* Footer */}
                <p
                    onClick={() => navigate('/login')}
                    className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;
