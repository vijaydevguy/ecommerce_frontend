import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import ProductItemSkeleton from "../components/ProductItemSkeleton";
import useDebounce from "../hooks/useDebounce";
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
  const { products, search, showSearch, loading, backendUrl } =
    useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [fetching, setFetching] = useState(false);

  // Debounce search input (400ms delay)
  const debouncedSearch = useDebounce(search, 400);

  // Reset to page 1 whenever filters, debouncedSearch, limit, or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subCategory, sortType, debouncedSearch, showSearch, limit]);

  // Categories & Subcategories toggle handlers
  const toggleCategory = (e) => {
    let val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    let val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  // Offline / fallback filtering logic
  const fallbackClientFilter = () => {
    if (!products || products.length === 0) {
      setFilterProducts([]);
      setTotalPages(1);
      setTotalProducts(0);
      return;
    }

    let productsCopy = [...products];

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => item.category && category.includes(item.category),
      );
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => item.subCategory && subCategory.includes(item.subCategory),
      );
    }

    // Sort products
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    // Search filter
    if (debouncedSearch && showSearch && debouncedSearch.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    setTotalProducts(productsCopy.length);
    const pages = Math.ceil(productsCopy.length / limit) || 1;
    setTotalPages(pages);

    const startIndex = (currentPage - 1) * limit;
    setFilterProducts(productsCopy.slice(startIndex, startIndex + limit));
  };

  // Fetch products from backend API with pagination, filter, and search
  const fetchCollectionProducts = async () => {
    setFetching(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", limit);

      if (category.length > 0) params.append("category", category.join(","));
      if (subCategory.length > 0)
        params.append("subCategory", subCategory.join(","));
      if (sortType) params.append("sort", sortType);
      if (debouncedSearch && showSearch && debouncedSearch.trim() !== "") {
        params.append("search", debouncedSearch.trim());
      }

      const res = await axios.get(
        `${backendUrl}/api/product/list?${params.toString()}`,
      );

      if (res.data.success && res.data.products) {
        setFilterProducts(res.data.products);
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages || 1);
          setTotalProducts(
            res.data.pagination.totalProducts || res.data.products.length,
          );
        }
      } else {
        fallbackClientFilter();
      }
    } catch (error) {
      fallbackClientFilter();
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCollectionProducts();
  }, [
    category,
    subCategory,
    sortType,
    debouncedSearch,
    showSearch,
    currentPage,
    limit,
    products,
  ]);

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
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-base sm:text-2xl mb-4">
          <div className="flex items-center gap-3">
            <Title text1={"All"} text2={"COLLECTIONS"} />
            {totalProducts > 0 && (
              <span className="text-xs sm:text-sm text-gray-500 font-normal">
                ({totalProducts} {totalProducts === 1 ? "item" : "items"})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Limit Selector */}
            <select
              className="border-2 border-gray-300 text-sm px-2 py-1 rounded outline-none cursor-pointer"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>

            {/* PRODUCT SORT */}
            <select
              name="sort"
              id="sort"
              className="border-2 border-gray-300 text-sm px-4 py-1 rounded outline-none cursor-pointer"
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value);
              }}
            >
              {Sorting.map((s, i) => (
                <option key={i} value={s.val}>
                  Sort by: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {loading || fetching
            ? Array.from({ length: limit }).map((_, i) => (
                <ProductItemSkeleton key={i} />
              ))
            : filterProducts.map((p, i) => (
                <ProductItem
                  key={p._id || i}
                  id={p._id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                />
              ))}
        </div>

        {/* Empty State */}
        {!loading && !fetching && filterProducts.length <= 0 && (
          <div className="flex flex-col gap-4 justify-center items-center py-16">
            <img
              src={assets.no_results}
              alt="search_result"
              className="pointer-events-none w-[150px]"
            />
            <p className="text-gray-400 w-fit">Search result not found</p>
          </div>
        )}

        {/* Pagination Toolbar */}
        {!loading && !fetching && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 mb-6 flex-wrap">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border border-gray-300 rounded text-sm transition ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed bg-gray-50"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCurrentPage(num);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-9 h-9 rounded text-sm border transition ${
                  currentPage === num
                    ? "bg-black text-white border-black font-medium"
                    : "border-gray-300 hover:bg-gray-100 cursor-pointer text-gray-700"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border border-gray-300 rounded text-sm transition ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-gray-50"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
