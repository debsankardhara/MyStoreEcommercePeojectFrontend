import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

function AdminAddProduct() {


    const { url, fetchProduct } = useContext(AppContext)

    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [qty, setQty] = useState(1);
    const [imgsrc, setImgsrc] = useState();

    const [add, setAdd] = useState(true);



    const navigate = useNavigate();

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const token = localStorage.getItem('token');


            const formData = new FormData();

            formData.append('title', title);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('qty', qty);
            formData.append('image', imgsrc);

            setAdd(false)
            const response = await axios.post(`${url}/api/product/add`, formData, {
                headers: {
                    Authorization: token
                }
            })

            // console.log(response.data);
            setAdd(true)

            toast.success(response.data.message);
            fetchProduct()
            navigate('/admin/products');



        } catch (error) {
            console.log(error);

        }
    };

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
                <div className="flex justify-center bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                            Add New Product
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter product title"
                                    className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                    className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Category</label>
                                <select
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="headphones">Headphones</option>
                                </select>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    name="imgsrc"
                                    onChange={(e) => setImgsrc(e.target.files[0])}
                                    className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter product description"
                                    rows="4"
                                    className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="md:col-span-2 flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                                >

                                    {add ? "Add Product" : "Adding..."}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>



        </div>


    );
}

export default AdminAddProduct;
