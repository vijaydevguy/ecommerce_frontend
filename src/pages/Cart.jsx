import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      // console.log("items", items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);

    // console.log("tempData", tempData);
    // console.log("cartData", cartData);
  }, [cartItems]);

  // console.log("cartData", cartData);
  if (!token) {
    return (
      <div className="border-t border-gray-200 pt-16 flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Please Log In to View Your Cart
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          Sign in to your account to view saved items, update quantities, and proceed to checkout.
        </p>
        <button
          onClick={() => navigate("/login", { state: { from: "/cart" } })}
          className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Log In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-14 ">
      <div className="text-2xl  mb-3 ">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-base font-medium mb-1">
            Your cart is currently empty
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Browse our collection and add your favorite items!
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white text-sm px-6 py-2.5 font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item, i) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );
              if (!productData) return null;
              return (
                <div
                  key={i}
                  className="p-4 border-t border-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6 ">
                    <img
                      src={productData.image?.[0]}
                      alt={productData.name}
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {"."}
                          {productData.price}
                        </p>
                        <p className="px-2 sm:px-4 text-sm sm:py-1 border border-gray-300 bg-gray-50 rounded-full ">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    defaultValue={item.quantity}
                    min={1}
                    onChange={(e) => {
                      const value = e.target.value;
                      value === "" || value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, Number(value));
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  />
                  <img
                    src={assets.bin_icon}
                    alt="delete"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  className="bg-[#1E1E1E] text-white text-sm my-8 px-8 py-3 cursor-pointer hover:bg-black transition-colors"
                  onClick={() => navigate("/place-order")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
