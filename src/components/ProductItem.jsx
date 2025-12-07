import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
//   console.log("id", id);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="product"
          className="hover:scale-110 transiton ease-in-out "
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
