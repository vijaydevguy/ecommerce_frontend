import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  console.log(productId);

  const { products } = useContext(ShopContext);

  const [productData, setProductData] = useState();
  const [img, setImg] = useState();

  const fetchData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImg(item.image[0]);

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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
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
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0">asdfasdfsdaf</div>
  );
};

export default Product;
