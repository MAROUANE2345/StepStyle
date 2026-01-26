"use client";

import Card from "@/components/Card";
import { fetchProducts } from "@/lib/reducer/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const { products, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  // State to track the current filter and search term
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on the selected filter AND search term
  const filteredProducts = products.filter((product) => {
    let matchesFilter = true;
    if (filter === "Men") matchesFilter = product.sexe.toLowerCase() === "men";
    if (filter === "Women") matchesFilter = product.sexe.toLowerCase() === "women";
    if (filter === "Kids") matchesFilter = product.category.toLowerCase() === "kids";

    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 px-60">
      {/* Header */}
      <h1 className="text-[36px] font-bold text-[#5C4A3A] mb-6">
        Our Collection
      </h1>

      {/* Search + Filters */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1" style={{ width: "871.39px" }}>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search for your shoes"
            className="w-full pl-12 pr-4 h-[52px] border rounded-md outline-none"
            style={{ borderColor: "#E8DCC8", borderRadius: "8px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4">
          {["All", "Men", "Women", "Kids"].map((btn) => (
            <button
              key={btn}
              className="px-4 h-[52px] font-medium rounded-md transition-colors duration-200 cursor-pointer"
              style={{
                backgroundColor: filter === btn ? "#8B7355" : "#F5F0E8",
                color: filter === btn ? "white" : "#5C4A3A",
                borderRadius: "8px",
              }}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid with animation */}
      <div className="grid grid-cols-4 gap-1">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card product={product} loading={loading} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
