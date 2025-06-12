import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // 🔁 Keep token in localStorage updated
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // ➕ Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Select product size");

    const updatedCart = { ...cartItems };
    updatedCart[itemId] = updatedCart[itemId] || {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    setCartItems(updatedCart);

    if (!token) {
      toast.error("Authentication failed. Please log in.");
      return;
    }

    try {
      await axios.post(
  `${backendUrl}/api/cart/add`,
  { itemId, size },
  { headers: { Authorization: `Bearer ${token}` } } // ✅ CORRECT
);
console.log("Sending token in addToCart:", token);

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  // 🔢 Get Cart Count
  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (total, item) =>
        total + Object.values(item).reduce((sum, count) => sum + count, 0),
      0
    );

  // 🔁 Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId][size] = quantity;
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // 💰 Get Total Amount
  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        return (
          total +
          Object.entries(sizes).reduce(
            (sum, [size, count]) => sum + count * product.price,
            0
          )
        );
      }
      return total;
    }, 0);

  // 📦 Fetch Products
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        console.log("✅ Products fetched from backend:", res.data.products); // ADD THIS
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  // 🛒 Fetch User Cart
  const getUserCart = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔁 Auto Fetch on Load
  useEffect(() => {
    getProductsData();
  }, [backendUrl]);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
