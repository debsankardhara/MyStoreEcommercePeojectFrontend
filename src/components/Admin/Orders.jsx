

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import {
    FaBoxOpen,
    FaCalendarAlt,
    FaCreditCard,
    FaShippingFast,
    FaMapMarkerAlt,
} from "react-icons/fa";

import toast from 'react-hot-toast'



function Orders() {


    const { token, url, fetchOrders } = useContext(AppContext);
    const [userOrders, setUserOrders] = useState([]);
    const navigate = useNavigate();

    const [shippingStatus, setShippingStatus] = useState();



    const getUserOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}/api/payment/all`, {
                headers: {
                    Authorization: token,
                },
            });
            setUserOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        }
    };


    useEffect(() => {

        if (token) {
            getUserOrder();
        }
    }, [token]);


    // console.log(userOrders);


    // chaneg the status of the order
    const handleChangeStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(`${url}/api/payment/${id}`, {
                shipStatus: status
            },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            )

            // console.log(response.data.order.shipStatus);
            toast.success(response.data.message)

            setShippingStatus(response.data.order.shipStatus);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUserOrder();

    }, [shippingStatus])



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
                <div className="px-4 md:px-10 bg-orange-50 min-h-screen">
                    <div className="max-w-4xl mx-auto py-8">
                        <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">
                            Manage Orders 🛍️
                        </h2>

                        {userOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-lg border-2 border-orange-200">
                                <FaBoxOpen className="text-orange-400 text-6xl mb-4" />
                                <p className="text-xl text-gray-600 font-medium">
                                    You haven't placed any orders yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {userOrders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-300 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                                    >
                                        {/* Order Header */}
                                        <div className="bg-orange-100 p-6 flex justify-between items-center border-b border-orange-300">
                                            <div className="flex items-center gap-3">
                                                <FaCalendarAlt className="text-orange-500 text-xl" />
                                                <p className="text-sm md:text-base text-gray-700 font-semibold">
                                                    Order Date:{" "}
                                                    <span className="font-bold text-orange-800">
                                                        {new Date(order.orderDate).toLocaleString()}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span
                                                    className={`px-4 py-1 text-xs md:text-sm rounded-full font-bold uppercase tracking-wide ${order.payStatus === "paid"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                                        }`}
                                                >
                                                    {order.payStatus}
                                                </span>
                                                <select
                                                    value={order.shipStatus}
                                                    onChange={(e) => {
                                                        handleChangeStatus(order._id, e.target.value)
                                                    }}
                                                    className="px-2 py-1 text-xs md:text-sm rounded-md font-bold uppercase tracking-wide border border-orange-400 bg-white text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>

                                            </div>

                                        </div>

                                        {/* Order Details & Items Grid */}
                                        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            {/* Order Info */}
                                            <div className="space-y-3">
                                                <h4 className="text-lg font-bold text-orange-600 flex items-center gap-2">
                                                    <FaCreditCard /> Order & Payment Info
                                                </h4>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-orange-500">
                                                        Order ID:
                                                    </span>{" "}
                                                    {order.orderId}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-orange-500">
                                                        Payment ID:
                                                    </span>{" "}
                                                    {order.paymentId}
                                                </p>
                                                <p className="text-lg font-bold text-orange-700">
                                                    <span className="text-sm font-semibold text-orange-500">
                                                        Amount:
                                                    </span>{" "}
                                                    ₹{(order.amount / 100).toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Shipping Info */}
                                            <div className="space-y-3">
                                                <h4 className="text-lg font-bold text-orange-600 flex items-center gap-2">
                                                    <FaShippingFast /> Shipping Address
                                                </h4>
                                                <div className="text-sm text-gray-700 space-y-1">
                                                    <p className="flex items-center gap-1">
                                                        <FaMapMarkerAlt className="text-orange-400" />
                                                        <span>
                                                            {order.userShipping.fullname}, {order.userShipping.address},{" "}
                                                            {order.userShipping.city}, {order.userShipping.state} -{" "}
                                                            {order.userShipping.pincode}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Phone: {order.userShipping.phoneNumber}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="lg:col-span-1 space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                                                <h4 className="text-lg font-bold text-orange-600 flex items-center gap-2">
                                                    <FaBoxOpen /> Items
                                                </h4>
                                                {order.orderItems.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className="flex items-start gap-4 p-3 bg-orange-50 rounded-lg shadow-sm"
                                                    >
                                                        <img
                                                            src={item.imgsrc}
                                                            alt={item.title}
                                                            className="w-20 h-20 object-cover rounded-lg border border-orange-200"
                                                        />
                                                        <div>
                                                            <p className="font-bold text-gray-800">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.description}
                                                            </p>
                                                            <p className="text-sm text-gray-700 font-semibold mt-1">
                                                                ₹{item.price} x {item.qty}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Orders;











