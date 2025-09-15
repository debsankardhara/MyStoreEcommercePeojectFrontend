import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import {
    FaBoxOpen,
    FaCalendarAlt,
    FaCreditCard,
    FaShippingFast,
    FaMapMarkerAlt,
} from "react-icons/fa";

function OrderConfirmation() {
    // const url = "http://localhost:3000";
    const { token, url } = useContext(AppContext);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const getUserOrder = async () => {
            try {
                const response = await axios.get(`${url}/api/payment/userOrder`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setUserOrders(response.data);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            }
        };

        if (token) {
            getUserOrder();
        }
    }, [token]);

    // console.log(userOrders);


    return (
        <div className="mt-[100px] px-4 md:px-10 bg-orange-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">
                    My Orders 🛍️
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
                                        <span
                                            className={`px-4 py-1 text-xs md:text-sm rounded-full font-bold uppercase tracking-wide bg-amber-500 text-white`}
                                        >
                                            {order.shipStatus}
                                        </span>
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
    );
}

export default OrderConfirmation;