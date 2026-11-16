import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block">
      <div className="relative overflow-hidden aspect-square sm:aspect-[4/5] bg-gray-100 rounded-sm">
        {/* Image skeleton shimmer while downloading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={name || "product"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <p className="pt-3 pb-1 text-sm truncate">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
