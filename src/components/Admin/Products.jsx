import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

function Products() {
    const { products } = useContext(AppContext);
    const navigate = useNavigate();

    const { url, fetchProduct } = useContext(AppContext);


    const handleAddProduct = async () => {
        navigate('/admin/products/addproduct');
    }

    const handleEdit = async (id) => {
        try {

            navigate(`/admin/products/${id}`);



        } catch (error) {
            console.log(error);

        }
    }

    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(`${url}/api/product/${id}`)
            console.log(response.data);
            toast.success(response.data.message);
            fetchProduct();

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className="flex h-screen mt-[100px] bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-orange-50 text-orange-600 flex flex-col shadow-md">
                <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
                <nav className="flex flex-col gap-4 p-4">
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="hover:bg-orange-500 p-2 rounded"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="hover:bg-orange-500 p-2 rounded"
                    >
                        Products
                    </button>
                    <button
                        onClick={() => navigate("/admin/orders")}
                        className="hover:bg-orange-500 p-2 rounded"
                    >
                        Orders
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div>
                    <h1 className="text-2xl font-bold text-orange-600 mb-4">
                        Manage Products
                    </h1>
                    <button
                        onClick={handleAddProduct}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-orange-700">
                        + Add Product
                    </button>

                    {/* Products Table */}
                    <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-orange-100 text-left">
                                <th className="p-3">Image</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <img
                                            src={p.imgsrc}
                                            alt={p.title}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 font-semibold">{p.title}</td>
                                    <td className="p-3 capitalize">{p.category}</td>
                                    <td className="p-3 text-green-600 font-bold">₹{p.price}</td>
                                    <td className="p-3 text-gray-600 truncate max-w-xs">
                                        {p.description.length > 50
                                            ? p.description.substring(0, 50) + "..."
                                            : p.description}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                handleEdit(p._id)
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Products;
