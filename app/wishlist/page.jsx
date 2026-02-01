"use client";

import LikedCard from "@/components/LikedCard";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const wishList = useSelector((state) => state.like?.Liked || []);

  // same state as catalogue
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // same filtering logic
  const filteredWishlist = wishList.filter((product) => {
    let matchesFilter = true;

    if (filter === "Men") matchesFilter = product.sexe?.toLowerCase() === "men";
    if (filter === "Women") matchesFilter = product.sexe?.toLowerCase() === "women";
    if (filter === "Kids") matchesFilter = product.category?.toLowerCase() === "kids";

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 px-60 bg-[#FAF7F2] h-full min-h-screen">
      {/* Header */}
      <h1 className="text-[36px] font-bold text-[#5C4A3A] mb-6">
        Wishlist
      </h1>

      {/* Search + Filters */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search in your wishlist"
            className="w-full pl-12 pr-4 h-[52px] border rounded-md outline-none"
            style={{ borderColor: "#E8DCC8", borderRadius: "8px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {["All", "Men", "Women", "Kids"].map((btn) => (
            <button
              key={btn}
              className="px-4 h-[52px] font-medium rounded-md transition-colors duration-200 cursor-pointer"
              style={{
                backgroundColor: filter === btn ? "#8B7355" : "#EFE6DA",
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

      {/* Wishlist Grid */}
      {filteredWishlist.length === 0 ? (
        <p className="text-[#8B7355]">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredWishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LikedCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Page;
