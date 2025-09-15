import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Checkout() {

    const { token, cart, FetchCart, url } = useContext(AppContext);
    const [shippingAddress, setShippingAddress] = useState({})

    // const url = "http://localhost:3000"


    const navigate = useNavigate();


    useEffect(() => {
        const hanldeGetUserAddress = async () => {
            const response = await axios.get(`${url}/api/address/get`, {
                headers: {
                    'Authorization': token
                }
            })

            // console.log(response.data.userAddress);
            setShippingAddress(response.data.userAddress)
        }

        hanldeGetUserAddress();
    }, [token])

    // console.log(shippingAddress);
    // console.log(cart);


    // total price (UI only use)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleCheckOut = async () => {
        try {

            const response = await axios.post(`${url}/api/payment/createOrder`, {
                amount: totalPrice,
                cartItem: cart,
                userShipping: shippingAddress
            }, {
                headers: {
                    'Authorization': token
                }
            })

            // console.log(response.data);

            const { order } = response.data;



            var options = {
                "key": "rzp_test_RFv4fvNI6XhJuY",
                "amount": order.amount,
                "currency": "INR",
                "name": "MyStore",
                "description": "MyStore",
                "order_id": order.id,

                handler: async function (response) {
                    // console.log(response.razorpay_order_id);
                    // console.log(response.razorpay_payment_id);
                    // console.log(response.razorpay_signature);

                    const paymentData = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        amount: order.amount,
                        orderItems: cart,
                        userShipping: shippingAddress

                    }

                    const verifyPaymentResponse = await axios.post(`${url}/api/payment/verify`, paymentData,
                        {
                            headers: {
                                'Authorization': token
                            }
                        }
                    )

                    console.log(verifyPaymentResponse.data);

                    if (verifyPaymentResponse.data.success) {
                        navigate('/orderconfermation')

                        await axios.delete(`${url}/api/cart/clear`, {
                            headers: {
                                'Authorization': token
                            }
                        })
                        FetchCart()
                    }


                },


                "prefill": {
                    "name": "MyStore",
                    "email": "mystore@gmail.com",
                    "contact": "+919372849247"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();


        } catch (error) {
            console.log(error.message);

        }
    }


    return (
        <div className="mt-[100px] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Cart Section */}
                <div className="bg-white shadow-md rounded-2xl p-6 border">
                    <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2 mb-4">
                        Your Cart
                    </h2>
                    {cart.length > 0 ? (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li
                                    key={item._id || item.productId}
                                    className="flex items-center justify-between border-b pb-3"
                                >
                                    <div className="flex items-center space-x-4">
                                        {item.imgsrc ? (
                                            <img
                                                src={item.imgsrc}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                                        )}
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.qty}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-orange-500">
                                        ₹{item.price * item.qty}
                                    </p>
                                </li>
                            ))}
                            <li className="flex justify-between pt-3 font-semibold text-lg">
                                <span>Total</span>
                                <span className="text-orange-600">₹{totalPrice}</span>
                            </li>
                        </ul>
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                </div>

                {/* Shipping Address Section */}
                <div className="bg-white shadow-md rounded-2xl p-6 border">
                    <h2 className="text-2xl font-semibold text-orange-600 border-b pb-2 mb-4">
                        Shipping Address
                    </h2>
                    {shippingAddress && shippingAddress.fullname ? (
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <span className="font-medium">Name:</span>{" "}
                                {shippingAddress.fullname}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span>{" "}
                                {shippingAddress.phoneNumber}
                            </p>
                            <p>
                                <span className="font-medium">Address:</span>{" "}
                                {shippingAddress.address}
                            </p>
                            <p>
                                <span className="font-medium">City:</span>{" "}
                                {shippingAddress.city}
                            </p>
                            <p>
                                <span className="font-medium">State:</span>{" "}
                                {shippingAddress.state}
                            </p>
                            <p>
                                <span className="font-medium">Pincode:</span>{" "}
                                {shippingAddress.pincode}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No address found.</p>
                    )}
                    <button
                        onClick={handleCheckOut}
                        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md transition cursor-pointer">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
