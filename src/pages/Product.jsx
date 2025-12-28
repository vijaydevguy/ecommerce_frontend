import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  console.log(productId);

  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState();
  const [size, setSize] = useState();
  const [img, setImg] = useState();
  const [activeToggle, setActiveToggle] = useState(true);

  const fetchData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImg(item.image[0]);
        setSize(item.sizes[0]);
        return null;
      }
    });
  };
  // console.log("image", img);
  // console.log(item);
  // console.log(productData);

  useEffect(() => {
    fetchData();
  }, [productId]);

  // const product = products.filter((item) => item._id == productId);
  // console.log("product", product[0].name);
  // console.log("products", products);

  return productData ? (
    <div className="border-t border-gray-200 py-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
        {/* product images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex  sm:flex-col flex-1 overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, i) => (
              <img
                src={img}
                alt="product"
                key={i}
                className="w-[24%] sm:w-full sm:mb-3 flex shrink-0 cursor-pointer"
                onClick={() => setImg(img)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={img} alt="productImg" className="w-full h-auto" />
          </div>
        </div>

        {/* --------- Product Info ------------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3 h-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}. {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size </p>
            <div className="flex gap-2">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  className={`cursor-pointer ${
                    size == s
                      ? "border bg-black/80 text-white transition-all duration-150 ease-in-out"
                      : "bg-gray-100"
                  } py-1 px-4 rounded-full`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart({ itemId: productData._id, size })}

            className="cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-black/80"
          >
            Add to cart
          </button>
          <hr className="mt-4 sm:w-4/5 border-t-1/2 border-gray-200" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days of purchase.</p>
          </div>
        </div>
      </div>

      {/*Description & Review section */}
      <div className="mt-20 ">
        {/* top */}
        <div className="flex">
          <button
            className={`border px-5 py-3 text-sm border-gray-200 ${
              activeToggle ? "bg-gray-100" : ""
            } cursor-pointer`}
            onClick={() => setActiveToggle(true)}
          >
            Description
          </button>
          <button
            className={`border px-5 py-3 text-sm border-gray-200  cursor-pointer ${
              !activeToggle ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveToggle(false)}
          >
            Review (122)
          </button>
        </div>

        {/* bottom */}
        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilities the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where business and individuals can
            showcase products, interact with customers, and conduct transactions
            without the need for a physical presence. E-commerce websites how
            gained immense popularity due to their convenience, accessibility,
            and the global reach they offer.{" "}
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed description, images, prices, and any available
            variations (eg. sizes, colors). Each product usually has it own
            dedicated page with relavant information.
          </p>
        </div>
      </div>
      {/* --------------- related products ------------- */}
      <div>
        <RelatedProducts
          id={productData._id}
          category={productData.category}
          subcategory={productData.subcategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0">asdfasdfsdaf</div>
  );
};

export default Product;
