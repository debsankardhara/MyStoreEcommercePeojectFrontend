import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

function AdminEditProduct() {


    const { url, fetchProduct } = useContext(AppContext)
    const { id } = useParams();

    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [qty, setQty] = useState(1);
    const [imgsrc, setImgsrc] = useState();


    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState([]);




    const fetchProductDetails = async () => {

        const token = localStorage.getItem('token');
        const getProduct = await axios.get(`${url}/api/product/${id}`, {
            headers: {
                'Authorization': token
            }
        })
        // console.log(getProduct.data.product);
        setProductDetails(getProduct.data.product);
        setTitle(getProduct.data.product.title);
        setDescription(getProduct.data.product.description);
        setCategory(getProduct.data.product.category);
        setImgsrc(getProduct.data.product.imgsrc);
        setPrice(getProduct.data.product.price);

    }

    useEffect(() => {
        fetchProductDetails();
    }, [])



    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const token = localStorage.getItem('token');
            const response = await axios.put(`${url}/api/product/${id}`, {
                title, price, category, description
            }, {
                headers: {
                    'Authorization': token
                }
            })

            // console.log(response.data);
            toast.success(response.data.message);

            fetchProduct();
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
            <main className="flex-1 mt-1 mb-2 bg-gray-100 overflow-y-auto">
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                            Update Product
                        </h2>


                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left side fields: Image and Quantity */}
                            <div className="flex flex-col items-center">
                                {/* Image Preview */}
                                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg border-2 border-orange-600 mb-3">
                                    <span className="text-gray-500 text-sm">

                                        <img src={imgsrc} alt="productImage" />
                                    </span>
                                </div>
                                <label className="text-gray-700 font-medium mb-2">Image</label>


                                {/* Quantity - Not editable */}
                                <div className="mt-6 w-full">
                                    <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        value={qty}
                                        readOnly
                                        className="w-full border px-2 py-2.5 rounded-md bg-gray-100 cursor-not-allowed text-gray-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Cannot be updated</p>
                                </div>
                            </div>

                            {/* Right side fields */}
                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title || ""}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="can be updated"
                                        className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={price || ""}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="can be updated"
                                        className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={category || ""}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full border px-2 py-2.5 rounded-md focus:outline-none focus:border-orange-500"
                                        required
                                    >
                                        <option value="">can be updated</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="laptops">Laptops</option>
                                        <option value="headphones">Headphones</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description full width */}
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={description || ""}
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
                                    cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                                >
                                    update
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>





        </div>


    );
}

export default AdminEditProduct;



