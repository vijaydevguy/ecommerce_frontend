import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Zoom } from "react-toastify";

const Filters = [
  {
    title: "CATEGORIES",
    type: "category",
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
    type: "subcategory",
    filters: [
      {
        category: "Topwear",
      },
      {
        category: "Bottomwear",
      },
      {
        category: "Winterwear",
      },
    ],
  },
];

const Sorting = [
  {
    label: "Relavent",
    val: "relavent",
  },
  {
    label: "Low to High",
    val: "low-high",
  },
  {
    label: "High to Low",
    val: "high-low",
  },
];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  //these below two functions will set category and subcategory
  //values accordingly when we click
  const toggleCategory = (e) => {
    let val = e.target.value;
    console.log("categry val", val);
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  // testing purpose only

  // useEffect(() => {
  //   console.log(" category", category);
  // }, [category]);

  const toggleSubCategory = (e) => {
    let val = e.target.value;
    console.log("subcategry val", val);
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // testing purpose only

  // useEffect(() => {
  //   console.log("sub category", subCategory);
  // }, [subCategory]);

  // this function will filter and sort products
  const applyFilter = () => {
    if (!products || products.length === 0) {
      setFilterProducts([]);
      return;
    }

    // Create a copy of products
    let productsCopy = [...products];

    // Filter by category if any selected
    if (category.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => item.category && category.includes(item.category)
      );
    }

    // Filter by subcategory if any selected
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => item.subCategory && subCategory.includes(item.subCategory)
      );
    }

    // Sort products based on sortType
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }
    // If "relavent", no sorting is applied (default order)

    // search filter code
    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // console.log("productscopy after filtering and sorting", productsCopy);
    setFilterProducts(productsCopy);
  };

  // this use effect will apply filter and sort when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, products, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200 overflow-x-clip">
      {/*left filter options */}
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
                  <p key={i} className="flex gap-2 ">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={c.category}
                      id={c.category}
                      onChange={
                        f.type == "category"
                          ? toggleCategory
                          : toggleSubCategory
                      }
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
            value={sortType}
            onChange={(e) => {
              // console.log(e.target.value);
              setSortType(e.target.value);
            }}
          >
            {Sorting.map((s, i) => (
              <option key={i} value={s.val}>
                Sort by: {s.label}
              </option>
            ))}

            {/* <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option> */}
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
        {filterProducts.length <= 0 && (
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <img
              src={assets.no_results}
              alt="search_result"
              className="pointer-events-none w-[150px]"
            />
            <p className="text-gray-400 w-fit">Search result not found</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
