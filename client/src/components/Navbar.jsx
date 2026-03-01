import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
  } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
    toast.success("Logged Out");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-300 bg-white relative">

      <Link to="/">
        <h2 className="text-2xl font-bold text-orange-500">
          Fast Cart
        </h2>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none"
            type="text"
            placeholder="Search products"
          />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          🛒
          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount()}
          </span>
        </div>

        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-9 cursor-pointer" />
            <div className="hidden group-hover:block absolute top-full right-0 pt-2 z-40">
              <ul className="bg-white shadow border border-gray-200 py-2 w-32 rounded-md text-sm">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  My Orders
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      <div className="flex items-center gap-5 md:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          🛒
        </div>

        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-lg font-medium">

          <Link onClick={() => setOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setOpen(false)} to="/products">
            All Products
          </Link>

          <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full w-3/4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none"
              type="text"
              placeholder="Search products"
            />
          </div>

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/my-orders");
                  setOpen(false);
                }}
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
              className="px-8 py-3 bg-indigo-500 text-white rounded-full w-3/4"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;