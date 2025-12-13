import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Filters = [
  {
    title: "CATEGORIES",
    filters: [
      {
        category: "Men",
      },
      {
        category: "Women",
      },
      {
        category: "Kids",
      },
    ],
  },
  {
    title: "TYPE",
    filters: [
      {
        category: "Top Wear",
      },
      {
        category: "Bottom Wear",
      },
      {
        category: "Winter Wear",
      },
    ],
  },
];

const Collection = () => {
  const { products } = useContext(ShopContext);
  
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER{" "}
          <img
            src={assets.dropdown_icon}
            alt="drop_down"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {Filters.map((f, i) => (
          <div key={i}>
            {/* category filter */}
            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 ${
                showFilter ? "" : "hidden"
              } sm:block`}
            >
              <p className="mb-3 text-sm font-medium">{f.title}</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {f.filters.map((c, i) => (
                  <p key={i} className="flex gap-2 " onChange={toggleCategory}>
                    <input
                      type="checkbox"
                      className="w-3"
                      value={c.category}
                      id={c.category}
                    />
                    <label htmlFor={c.category}>{c.category}</label>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* right */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"} />
          {/* PRODUCT SORT */}
          <select
            name="sort"
            id="sort"
            className="border-2 border-gray-300 text-sm px-4"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((p, i) => (
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
    </div>
  );
};

export default Collection;
