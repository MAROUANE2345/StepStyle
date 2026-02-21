"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Card from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) {
      setError("Please enter what you're looking for");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);

    try {
      const res = await axios.post("/ai/api", {
        userNeed: input,
      });

      if (Array.isArray(res.data)) {
        setResults(res.data);
        if (res.data.length === 0) {
          setError("No shoes matched your request. Try different keywords!");
        }
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4A3A] mb-4 sm:mb-6">
          🔍 AI Shoe Assistant
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1 w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/60 pointer-events-none">
              <FaSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="e.g. comfortable running shoes for men"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pl-11 pr-4 h-12 sm:h-[52px] border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A]"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="h-12 sm:h-[52px] px-6 bg-[#8B7355] text-white rounded-xl font-medium hover:bg-[#7A6349] disabled:opacity-50 transition shrink-0"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-[#8B7355] py-10 animate-pulse text-sm sm:text-base">
            ⏳ AI is thinking...
          </p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence>
            {results.map((shoe) => (
              <motion.div
                key={shoe.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card product={shoe} />
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && !error && (
          <p className="text-center text-[#8B7355] py-10 text-sm sm:text-base">
            👟 No shoes matched your request. Try different keywords!
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
