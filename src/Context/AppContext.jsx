import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // const url = "http://localhost:3000"

    const url = "https://ecommercepeojectbackend.onrender.com"

    const [products, setProducts] = useState([])
    const fetchProduct = async () => {
        const api = await axios.get(`${url}/api/product/all`,
            {
                headers: {
                    "Content-type": "Application/json"
                },
                withCredentials: true
            }
        )

        setProducts(api.data.products)
    }

    useEffect(() => {

        fetchProduct();

    }, [])


    //login token set and  access
    const [token, setToken] = useState('');
    const fetchToken = () => {
        const userToken = localStorage.getItem('token');
        setToken(userToken);
    }
    useEffect(() => {
        fetchToken()

    }, [token])

    //filter products
    const [filterData, setFilterData] = useState([

    ]);

    const [cart, setCart] = useState([]);

    const FetchCart = async () => {

        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${url}/api/cart`, {
                headers: {
                    "Authorization": token
                }
            })

            // console.log(response.data.cart);
            setCart(response.data.cart.items)


        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {

        FetchCart();
    }, [token])

    // console.log(cart);

    //user orders

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${url}/api/payment/all`, {
                headers: {
                    'Authorization': token
                }
            })

            setOrders(response.data.orders)
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])

    // console.log(orders);



    return (
        <AppContext.Provider value={{ products, fetchProduct, orders, fetchOrders, url, token, setToken, fetchToken, filterData, cart, setCart, FetchCart }}>
            {children}
        </AppContext.Provider>
    )
}