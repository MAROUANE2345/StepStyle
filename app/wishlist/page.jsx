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
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4A3A] mb-4 sm:mb-6">
          Wishlist
        </h1>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1 w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/60 pointer-events-none">
              <FaSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search in your wishlist"
              className="w-full pl-11 pr-4 h-12 sm:h-[52px] border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {["All", "Men", "Women", "Kids"].map((btn) => (
              <button
                key={btn}
                type="button"
                className={`px-4 sm:px-5 h-11 sm:h-[52px] font-medium rounded-xl transition-colors duration-200 cursor-pointer text-sm sm:text-base ${
                  filter === btn ? "bg-[#8B7355] text-white shadow-md" : "bg-[#EFE6DA] text-[#5C4A3A] hover:bg-[#E8DCC8]"
                }`}
                onClick={() => setFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {filteredWishlist.length === 0 ? (
          <p className="text-[#8B7355] text-center py-12 text-sm sm:text-base">Your wishlist is empty. Start adding favorites from the catalogue!</p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
    </div>
  );
};

export default Page;
