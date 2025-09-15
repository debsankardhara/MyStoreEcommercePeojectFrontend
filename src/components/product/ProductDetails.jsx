import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import { AppContext } from "../../Context/AppContext";
import toast from 'react-hot-toast'

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const { url } = useContext(AppContext);


    // const url = "http://localhost:3000/api/product";

    // const cartUrl = 'http://localhost:3000/api/cart'

    const navigate = useNavigate();

    const { token, fetchToken, FetchCart } = useContext(AppContext)

    useEffect(() => {
        fetchToken()

    }, [token])



    // console.log(token);



    //fetch product
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/api/product/${id}`, {
                    headers: {
                        "Content-Type": "Application/json",
                    },
                });
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [id]);

    // console.log(product);



    //add to cart
    const handleAddToCart = async (id, title, category, description, price, image) => {

        // console.log(id, title, category, description, price, image);


        try {

            let qty = 1;



            const response = await axios.post(`${url}/api/cart/add`, {
                productId: id, title, category, description, price, qty, imgsrc: image
            },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            )

            console.log(response.data);
            toast.success(response.data.message)
            FetchCart();

        } catch (error) {
            console.log(error.message);
            toast.error("login First..😢")

        }

    }

    // console.log(product);



    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );

    return (

        <div>

            <button
                onClick={() => navigate('/')}
                className="border-orange-500 px-3 py-2 border rounded-md text-orange-500  font-semibold hover:cursor-pointer hover:bg-orange-10 ">Back</button>
            <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-10">

                {/* Product Details Card */}
                <div className="w-full max-w-6xl rounded-3xl mt-6 shadow-md p-6 flex flex-col md:flex-row gap-6 md:gap-10 bg-gradient-to-b from-white to-orange-50 border border-gray-200">

                    {/* Product Image */}
                    <div className="flex justify-center items-center md:w-1/2 bg-white rounded-xl p-4">
                        <img
                            src={product.imgsrc}
                            alt={product.title}
                            className="object-contain w-48 h-48 md:w-64 md:h-64 transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>
                            <p className="text-sm md:text-base text-gray-500 mb-4 uppercase tracking-wide">
                                {product.category}
                            </p>
                            <p className="text-gray-700 text-base md:text-lg mb-6">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:gap-4">
                            <span className="text-2xl md:text-3xl font-extrabold text-[#ff6600]">
                                ₹{product.price}
                            </span>

                            {/* Buttons */}
                            <div className="flex gap-4 mt-2 flex-wrap">
                                <button
                                    onClick={() => {
                                        handleAddToCart(
                                            product._id,
                                            product.title,
                                            product.category,
                                            product.description,
                                            product.price,
                                            product.imgsrc

                                        )
                                    }}
                                    className="flex-1 px-4 py-2 border border-[#ff6600] text-[#ff6600] bg-white rounded-lg font-medium text-base md:text-lg hover:bg-[#ffe6d6] cursor-pointer  transition duration-200">
                                    🛒 Add to Cart
                                </button>
                                <button className="flex-1 px-4 py-2 border border-[#ff6600] text-[#ff6600] bg-white rounded-lg font-medium text-base md:text-lg hover:bg-[#ffe6d6] cursor-pointer transition duration-200">
                                    💳 Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedProduct category={product?.category} />

            </div>
        </div>

    );
}

export default ProductDetails;
