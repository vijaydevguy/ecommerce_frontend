import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const paymentMethods = [
  {
    icon: assets.stripe_logo,
    type: "stripe",
  },
  {
    icon: assets.razorpay_logo,
    type: "razorpay",
  },
  {
    // icon: assets.stripe_logo,
    text: "CASH ON DELIVERY",
    type: "cod",
  },
];

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* left */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* payment methods */}
          <div className="flex gap-3 flex-col lg:flex-row ">
            {paymentMethods.map((p, i) => (
              <div
                className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer"
                key={i}
                onClick={() => setMethod(p.type)}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full border-gray-400 ${
                    p.type == method ? "bg-green-500" : ""
                  }`}
                ></p>
                {p.icon && (
                  <img src={p.icon} alt="stripe" className="h-5 mx-4" />
                )}

                {p.text && (
                  <p className="text-gray-500 text-sm font-medium ">
                    CASH ON DELIVERY
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="w-full text-end mt-8 ">
            <button
              className="bg-[#1E1E1E] text-white px-16 py-3 text-sm cursor-pointer"
              onClick={() => navigate("/orders")}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
