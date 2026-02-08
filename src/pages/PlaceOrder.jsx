import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const paymentMethods = [
  {
    icon: assets.stripe_logo,
    type: "stripe",
  },
  // {
  //   icon: assets.razorpay_logo,
  //   type: "razorpay",
  // },
  {
    // icon: assets.stripe_logo,
    text: "CASH ON DELIVERY",
    type: "cod",
  },
];

const PlaceOrder = () => {
  // payment method
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    backendUrl,
    navigate,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
    token,
  } = useContext(ShopContext);

  const onChangeHandler = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // console.log("formData", formData, { [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("formData for placeorder", formData);
    let orderItems = [];

    console.log("token", token);

    try {
      //in this function we get info from cartItems
      //and matching with products and if cart count is more than zero
      //we will add that item id and quantity with that item form products
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            // console.log("itemInfo",itemInfo)
            if (itemInfo) {
              //actually size we should get it throws error so i as of not took as sizes
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("orderData", orderData);

      switch (method) {
        // api call for COD
        case "cod":
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            {
              address: formData,
              items: orderItems,
              amount: getCartAmount() + delivery_fee,
            },
            { headers: { token } },
          );
          console.log("order", res);
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;

        case "stripe":
          const resStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } },
          );

          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
            console.log(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            type="text"
            placeholder="First name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            placeholder="Last name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          placeholder="example@gmail.com"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          placeholder="street"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            name="zipcode"
            onChange={onChangeHandler}
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone number"
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
          required
          inputMode="numeric"
          pattern="\d{10}"
          maxLength={10}
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
              type="submit"
              className="bg-[#1E1E1E] text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
