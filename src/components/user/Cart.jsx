import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast'

function Cart() {
    const navigate = useNavigate();

    const { cart, url } = useContext(AppContext);

    // const url = 'http://localhost:3000'

    const { token, FetchCart } = useContext(AppContext);


    // increment cart item quantity
    const handleIncrement = async (productId) => {
        try {
            const response = await axios.post(`${url}/api/cart/incrQty`, { productId }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": 'application/json'
                }
            })
            FetchCart()
        } catch (error) {
            console.log(error);
        }
    }

    // decrement item quantity 
    const handleDecrement = async (productId) => {
        try {
            let qty = 1;
            const response = await axios.post(`${url}/api/cart/decrQty`, { productId, qty }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": 'application/json'
                }
            })
            FetchCart()
        } catch (error) {
            console.log(error);
        }
    }

    // remove item from the cart
    const handleRemoveCartItem = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/cart/${id}`, {
                headers: {
                    "Authorization": token,
                }
            })
            toast.success(response.data.message)
            FetchCart()
        } catch (error) {
            console.log(error);
        }
    }

    // clear all items from the cart
    const handleClearCart = async () => {
        try {
            const response = await axios.delete(`${url}/api/cart/clear`, {
                headers: {
                    "Authorization": token,
                }
            })
            FetchCart()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mt-28 flex flex-col items-center px-4 sm:px-6 md:px-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                Shopping Cart 🛒
            </h1>

            {cart.length === 0 ? (
                <p
                    onClick={() => navigate('/')}
                    className="text-gray-500 text-base sm:text-lg italic">Your cart is empty | <span className='text-orange-500 cursor-pointer underline'>continue shopping...</span></p>
            ) : (
                <div className="w-full max-w-4xl flex flex-col gap-6">
                    {cart.map((p) => (
                        <div
                            key={p._id}
                            className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4 sm:gap-0 rounded-xl border border-gray-200 bg-white shadow-md p-4 sm:p-5"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    src={p.imgsrc}
                                    alt={p.title}
                                    className="h-full w-full rounded-lg object-cover border border-gray-100"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://via.placeholder.com/128x128?text=No+Image';
                                    }}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 sm:px-6 text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {p.title}
                                </h3>
                                <p className="text-sm text-gray-500">{p.description}</p>
                                <p className="mt-2 text-base font-semibold text-orange-600">
                                    ₹{p.price}
                                </p>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleIncrement(p.productId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-600 cursor-pointer font-bold">
                                        +
                                    </button>
                                    <span className="text-base font-medium">{p.qty}</span>
                                    <button
                                        onClick={() => handleDecrement(p.productId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-600 cursor-pointer font-bold">
                                        -
                                    </button>
                                </div>


                                <button
                                    onClick={() => handleRemoveCartItem(p._id)}
                                    className="text-sm text-red-500 font-medium cursor-pointer">
                                    Remove
                                </button>


                            </div>
                        </div>
                    ))}

                    {/* Summary */}
                    <div className="mt-6 bg-white border border-gray-200 shadow-md rounded-xl p-4 sm:p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-3">
                            Order Summary
                        </h2>
                        <div className="flex justify-between text-gray-600 mb-1 text-sm sm:text-base">
                            <span>Total Items:</span>
                            <span className="font-medium text-gray-800">
                                {cart.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-600 mb-3 text-sm sm:text-base">
                            <span>Total Price:</span>
                            <span className="font-medium text-orange-600">
                                ₹{cart.reduce((acc, item) => acc + item.price, 0)}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                            <button
                                onClick={() => {
                                    navigate('/shipAddress')
                                }}
                                className="w-full cursor-pointer py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition">
                                Checkout
                            </button>
                            <button
                                onClick={handleClearCart}
                                className="w-full py-3 cursor-pointer rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition">
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
