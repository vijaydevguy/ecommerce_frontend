import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const relateducts = ({ category, subcategory,id }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  // another way
  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((p) => p.category == category);
      productCopy = productCopy.filter((p) => p.subcategory == subcategory);

      productCopy = productCopy.filter((p) => p._id != id);
      //   console.log("related", productCopy.slice(0, 5));
      setRelated(productCopy.slice(0, 5));
    }
  }, [category, subcategory, id]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2 ">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((p, i) => (
          <ProductItem
            key={i}
            id={p._id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
};

export default relateducts;
