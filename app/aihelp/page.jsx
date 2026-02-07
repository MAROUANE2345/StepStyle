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
    <div className="p-6 px-60 bg-[#FAF7F2] min-h-screen">
      {/* Header */}
      <h1 className="text-[36px] font-bold text-[#5C4A3A] mb-6">
        🔍 AI Shoe Assistant
      </h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="e.g. comfortable running shoes for men"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 h-[52px] border rounded-md outline-none"
            style={{ borderColor: "#E8DCC8", borderRadius: "8px" }}
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="h-[52px] px-6 bg-[#8B7355] text-white rounded-md font-medium hover:bg-[#6B5345] disabled:opacity-50 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-[#8B7355] py-10 animate-pulse">
          ⏳ AI is thinking...
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Results Grid — SAME AS COLLECTION PAGE */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-4 gap-1">
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

      {/* No Results */}
      {!loading && hasSearched && results.length === 0 && !error && (
        <p className="text-center text-[#8B7355] py-10">
          👟 No shoes matched your request. Try different keywords!
        </p>
      )}
    </div>
  );
};

export default Page;
