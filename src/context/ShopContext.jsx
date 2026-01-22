import { createContext, useEffect, useState } from "react";
import { products as products1 } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const navigate = useNavigate();

  const currency = "Rs";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  //api data we will store here
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("");

  // little bit i dont understand this concept i am new to this
  const addToCart = ({ itemId, size }) => {
    // structuredClone is modern way of deepclone
    let cartData = structuredClone(cartItems);
    console.log("item id from add cart", itemId);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    console.log(cartData);
    setCartItems(cartData);
    toast("Added item in cart");
  };

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  // cart count
  const getCartCount = () => {
    let totalCnt = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCnt += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCnt;
  };

  // total cart amount calculation
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        setProducts(products1);
        toast.error(res.data.messsage, "offline data fetched");
      }
      // console.log("products", products);
      // console.log("response", res.data.products);
      // console.log(res.data.message);
    } catch (error) {
      toast.error(error.message, "offline data fetched");
      setProducts(products1);
    }
  };

  useEffect(() => {
    getProductsData();
    console.log(products);
  }, []);

  useEffect(() => {
    console.log("products updated:", products);
    console.log("offline products updated:", products1);
  }, [products]);

  // this will help us to when reload it
  // wont allow us to go login bcz it will
  // handle local storage

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,

    // cntCount
    getCartCount,
    getCartAmount,

    // cart items
    addToCart,
    cartItems,
    updateQuantity,

    navigate,
    backendUrl,

    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
