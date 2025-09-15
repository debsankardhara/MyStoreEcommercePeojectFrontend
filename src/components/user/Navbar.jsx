import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // null for clarity

    const { token, fetchToken, url, setToken, cart, setCart } = useContext(AppContext);
    const [showCategory, setShowCategory] = useState(false);

    const category = ["All", "Mobile", "Electronics", "Laptops", "Headphones"];
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchToken();
    }, [token]);

    const handleToggle = () => setOpen(!open);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`product/search/${searchTerm}`);
        setSearchTerm("");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    // ✅ Fetch user profile only when logged in
    const fetchUser = async () => {
        try {
            if (!token) return;
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: {
                    Authorization: token,
                },
            });
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <div>
            <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-orange-400 bg-white">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => setShowCategory(false)}
                    className="text-2xl font-bold text-orange-500"
                >
                    MyStore
                </Link>

                {/* Desktop Menu */}
                <div className="hidden sm:flex">
                    <div className="flex items-center gap-8">
                        {/* Search Bar */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center text-sm gap-2 border border-orange-400 px-3 rounded-full">
                                <span className="material-symbols-outlined text-orange-500">
                                    search
                                </span>
                                <input
                                    className="py-1.5 w-full bg-transparent placeholder-gray-500 focus:outline-none"
                                    type="text"
                                    placeholder="Search products"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </form>

                        {/* Navigation Links */}
                        <div className="flex justify-center items-center text-sm">
                            <Link
                                to="/"
                                onClick={() => setShowCategory(false)}
                                className="w-full text-left pr-2 py-2 text-gray-700 mr-6 hover:text-orange-600"
                            >
                                Home
                            </Link>

                            {/* ✅ Category Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowCategory(!showCategory)}
                                    className="w-full text-left pr-2 py-2 text-gray-700 hover:text-orange-600"
                                >
                                    Category
                                </button>

                                {showCategory && (
                                    <ul className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-40 py-1 z-50">
                                        {category.map((c, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    navigate(`/category/${c.toLowerCase()}`);
                                                    setShowCategory(false);
                                                }}
                                                className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                                            >
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>

                        {/* Auth Buttons */}
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="cursor-pointer px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="cursor-pointer px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Profile
                                </Link>

                                {/* Cart */}
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => navigate("/cart")}
                                >
                                    <span className="text-orange-500 font-medium">Cart</span>
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                >
                                    Logout
                                </button>

                                {/* ✅ Show only if admin */}
                                {user?.email === "admin@gmail.com" && (
                                    <button
                                        onClick={() => navigate("/admin/dashboard")}
                                        className="cursor-pointer px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                    >
                                        Admin
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden block">
                    <button
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                        onClick={handleToggle}
                    >
                        Menu
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                        className={`transition-all duration-300 ${open ? "block" : "hidden"
                            } absolute top-[60px] left-0 w-full bg-white shadow-md`}
                    >
                        <div className="flex flex-col gap-4 px-5 py-4 text-sm">
                            {/* Home + Category */}
                            <Link to="/" className="py-2 text-gray-700">
                                Home
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setShowCategory(!showCategory)}
                                    className="w-full text-left pr-2 py-2 text-gray-700 hover:text-orange-600"
                                >
                                    Category
                                </button>

                                {showCategory && (
                                    <ul className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-40 py-1 z-50">
                                        {category.map((c, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    navigate(`/category/${c.toLowerCase()}`);
                                                    setShowCategory(false);
                                                }}
                                                className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                                            >
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>


                            {/* Auth */}
                            {!token ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-orange-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="text-gray-700 hover:text-orange-500 flex items-center gap-1"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cart
                                        <span className="bg-orange-500 text-white border px-1.5 py-0 rounded-full">
                                            {cart.length}
                                        </span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                    >
                                        Logout
                                    </button>

                                    {/* ✅ Only admin sees this */}
                                    {user?.email === "admin@gmail.com" && (
                                        <button
                                            onClick={() => {
                                                navigate("/admin/dashboard");
                                                setOpen(false);
                                            }}
                                            className="px-8 py-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full"
                                        >
                                            Admin
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
