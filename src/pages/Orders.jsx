import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { products, currency, backendUrl, token } = useContext(ShopContext);

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

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

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
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2 ">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={getOrders}
                disabled={load}
                className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
              >
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
