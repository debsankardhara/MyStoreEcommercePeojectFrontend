
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../Context/AppContext";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);



    const { token, url, products, orders } = useContext(AppContext)

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
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
        fetchProfile();
    }, []);

    // console.log(orders.length);



    return (
        <div className="flex  mt-[100px] h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-orange-50 text-orange-600 flex flex-col">
                <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
                <nav className="flex flex-col gap-4 p-4">

                    <button
                        onClick={() => {
                            navigate('/admin/dashboard');

                        }}
                        className="hover:bg-orange-500 p-2 rounded">Dashboard</button>
                    <button
                        onClick={() => {
                            navigate('/admin/products');

                        }} className="hover:bg-orange-500 p-2 rounded">Products</button>
                    <button

                        onClick={() => {
                            navigate('/admin/orders');

                        }} className="hover:bg-orange-500 p-2 rounded">Orders</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div>
                    <h1 className="text-3xl font-bold text-orange-600 mb-6">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-600">
                            <h2 className="text-xl font-semibold">Admin Details</h2>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-600">
                            <h2 className="text-xl font-semibold">Products</h2>
                            <p>Total: {products.length}</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-600">
                            <h2 className="text-xl font-semibold">Orders</h2>
                            <p>Total: {orders.length} </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
