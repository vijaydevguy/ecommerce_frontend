import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { products, currency, backendUrl, token, navigate } =
    useContext(ShopContext);

  const slicedProd = products.slice(1, 4);

  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);
  console.log("token", token);

  const getOrders = async () => {
    try {
      setLoad(true);
      if (!token) {
        return null;
      }

      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: { token },
        },
      );
      let allOrdersItem = [];
      if (res.data.success) {
        console.log("res", res.data);

        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrders(allOrdersItem.reverse());
        console.log("allOrdersItem", allOrdersItem);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Please Log In to View Your Orders
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          Sign in to your account to view your order history and track active shipments.
        </p>
        <button
          onClick={() => navigate("/login", { state: { from: "/orders" } })}
          className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Log In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {load ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 sm:w-20 aspect-square bg-gray-200 rounded-sm" />
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-9 w-28 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-base font-medium mb-1">
            No orders placed yet
          </p>
          <p className="text-gray-400 text-sm mb-6">
            When you place orders, they will show up here.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white text-sm px-6 py-2.5 font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map((item, i) => (
            <div
              key={i}
              className={`py-4 border-t ${
                i === orders.length - 1 ? "border-b" : ""
              }  border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt="img" className="w-16 sm:w-20" />

                <div>
                  <p className="font-medium sm:text-base  ">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}.{item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="flex gap-2 items-center my-2">
                    Payment Method:
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="text-gray-400 ">
                      {" "}
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2 ">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={getOrders}
                  disabled={load}
                  className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Track order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
