import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom';

function RelatedProduct({ category }) {

    const { products, url } = useContext(AppContext);

    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        const filterProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
        setRelatedProducts(filterProducts)
    }, [])


    const navigate = useNavigate();

    // console.log(filterProducts);
    // const url = "http://localhost:3000";

    // console.log(products);


    return (

        <div className='bg-gray-100 rounded-full bg-gradient-to-b from-white to-orange-50'>

            <h1 className='text-3xl font-semibold text-center mt-3 mb-2.5 '>Related Products</h1>
            <div className=" bg-gray-50 flex justify-center items-center p-6 bg-gradient-to-b from-white to-gray-100">


                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {relatedProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="w-64 bg-gradient-to-b from-white to-orange-50 border border-gray-200 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition duration-300"
                        >
                            {/* Image with hover zoom - centered */}
                            <div className="flex justify-center items-start pt-6 overflow-hidden">
                                <img
                                    src={product.imgsrc}
                                    alt={product.title}
                                    className="h-32 w-32 rounded-xl object-contain transform transition-transform duration-300 hover:scale-110"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    {product.category}
                                </p>


                                {/* Price + Button */}
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold text-orange-600">
                                        ₹{product.price}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        className="px-3 py-1.5 border border-orange-500 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition">
                                        🛒 view
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default RelatedProduct