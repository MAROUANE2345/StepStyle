"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC8] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#5C4A3A] mb-4">
            🔍 AI Shoe Assistant
          </h1>
          <p className="text-lg text-[#8B7355]">
            Tell us what you need, we'll find the perfect shoes for you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="e.g., 'comfortable running shoes for men'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-14 px-5 rounded-lg border-2 outline-none text-[#5C4A3A] placeholder-[#A89080]"
            style={{ borderColor: "#D4C5B0" }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="h-14 px-8 bg-[#8B7355] text-white rounded-lg font-semibold hover:bg-[#6B5345] disabled:opacity-50 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-lg text-[#8B7355] animate-pulse">
              ⏳ AI is thinking...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="grid gap-6">
            {results.map((shoe, index) => (
              <div
                key={shoe.id || index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-2"
                style={{ borderColor: "#E8DCC8" }}
              >
                {shoe.image && (
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#5C4A3A] mb-2">
                    {shoe.name}
                  </h3>
                  <p className="text-sm text-[#8B7355] mb-3">
                    {shoe.category} • {shoe.sexe}
                  </p>
                  <p className="text-[#6B5345] mb-4">{shoe.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#8B7355]">
                      ${shoe.price}
                    </span>
                    <div className="text-sm text-[#8B7355]">
                      <p className="font-semibold">Sizes: {shoe.size.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-lg text-[#8B7355]">
              👟 No shoes matched your request. Try different keywords!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;