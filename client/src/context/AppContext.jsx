import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // Backend axios instance
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", // Dynamic URL based on environment
    withCredentials: true,                     // send cookies
  });

  // Products & Cart state
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // User state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showUserLogin, setShowUserLogin] = useState(false);

  // Seller state
  const [isSeller, setIsSeller] = useState(() => {
    return localStorage.getItem("isSeller") === "true";
  });

  // Persist seller state in localStorage
  useEffect(() => {
    localStorage.setItem("isSeller", isSeller ? "true" : "false");
  }, [isSeller]);

  // Persist user state in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cart functions
  const addToCart = (id) => {
    if (!user) {
      setShowUserLogin(true);
      toast.error("Please login to add items to the cart");
      return;
    }
    const newCart = { ...cartItems };
    newCart[id] = (newCart[id] || 0) + 1;
    setCartItems(newCart);
    toast.success("Added to cart");
  };

  const removeFromCart = (id) => {
    if (!user) {
      setShowUserLogin(true);
      toast.error("Please login to modify your cart");
      return;
    }
    const newCart = { ...cartItems };
    if (newCart[id]) {
      newCart[id]--;
      if (newCart[id] <= 0) delete newCart[id];
    }
    setCartItems(newCart);
  };

  const updateCartItem = (id, qty) => {
    if (!user) {
      setShowUserLogin(true);
      toast.error("Please login to modify your cart");
      return;
    }
    const newCart = { ...cartItems };
    if (qty <= 0) delete newCart[id];
    else newCart[id] = qty;
    setCartItems(newCart);
  };

  const cartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  const totalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += cartItems[id] * product.offerPrice;
    }
    return total;
  };

  // Seller Logout
  const sellerLogout = async () => {
    try {
      const { data } = await api.post(
        "/api/seller/logout",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setIsSeller(false);
        localStorage.removeItem("isSeller");
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  const value = {
    navigate,
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    cartCount,
    totalCartAmount,
    searchQuery,
    setSearchQuery,
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    isSeller,
    setIsSeller,
    sellerLogout, // add logout to context
    fetchProducts,
    axios: api,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use context
export const useAppContext = () => useContext(AppContext);
