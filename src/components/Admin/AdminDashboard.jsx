import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";

function AdminDashboard() {


    const navigate = useNavigate();


    return (
        <div className="flex h-screen mt-[100px] bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-orange-50 text-orange-600 flex flex-col">
                <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
                <div className="flex flex-col hover:bg-orange-300 hover:text-white gap-4 p-4">


                    <button


                        onClick={() => {
                            navigate('/admin/dashboard');

                        }}
                        className="hover:bg-orange-500 hover:text-white p-2 rounded">Dashboard</button>
                    <button
                        onClick={() => {
                            navigate('/admin/products');

                        }} className="hover:bg-orange-500 hover:text-white p-2 rounded">Products</button>
                    <button

                        onClick={() => {
                            navigate('/admin/orders');

                        }} className="hover:bg-orange-500 hover:text-white p-2 rounded">Orders</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">

            </main>
        </div>
    );
}

export default AdminDashboard;
