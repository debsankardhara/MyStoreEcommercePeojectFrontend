import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AppContext } from '../../Context/AppContext'
import { useFetcher, useNavigate } from 'react-router-dom'

function Address() {

    const [fullname, setFullName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState('');


    const [shippingAddress, setShippingAddress] = useState({})

    // const url = "http://localhost:3000/api/address"



    const { token, url } = useContext(AppContext);
    const navigate = useNavigate()





    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${url}/api/address/add`, {
                fullname,
                state,
                city,
                pincode,
                phoneNumber: phone,
                address
            }, {
                headers: {
                    'Authorization': token
                }
            }
            )

            console.log(response.data);
            toast.success(response.data.message);
            setFullName('');
            setState('');
            setCity('');
            setAddress('');
            setPhone('');
            setPincode('');
            navigate('/checkout')

        } catch (error) {
            console.log(error);

        }

    };

    useEffect(() => {
        const hanldeGetUserAddress = async () => {
            const response = await axios.get(`${url}/api/address/get`, {
                headers: {
                    'Authorization': token
                }
            })

            console.log(response.data.userAddress);

            setShippingAddress(response.data.userAddress)
        }

        hanldeGetUserAddress();


    }, [token])


    const handleOldAddress = async () => {
        navigate('/checkout')
    };

    return (
        <div className="max-w-xl bg-gradient-to-b from-white to-orange-100 mx-auto  mt-[100px] p-6 border-2 border-orange-500 rounded-2xl bg-white shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Shipping Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2   focus:border-amber-500"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2 focus:border-amber-500"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2 focus:border-amber-500"
                />
                <input
                    type="number"
                    name="pincode"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2 focus:border-amber-500"
                />
                <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2 focus:border-amber-500"
                />
                <textarea
                    name="address"
                    placeholder="Address / Nearby"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none  focus:border-2 focus:border-amber-500"
                ></textarea>

                <div className="flex justify-between space-x-4">
                    <button

                        onClick={() => {
                            navigate('/checkout')
                        }}
                        type="submit"
                        className="w-1/2 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                        Submit
                    </button>
                    {
                        shippingAddress && (
                            <button
                                type="button"
                                onClick={handleOldAddress}
                                className="w-1/2 border border-orange-500 text-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-50 transition"
                            >
                                Use Old Address
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default Address;
