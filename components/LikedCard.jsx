"use client";

import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/reducer/cartSlice";
import { deleteFromLiked } from "@/lib/reducer/wishListSlice";

const LikedCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="relative flex flex-col gap-3 bg-white border p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        width: "300px",
        height: "425px",
        borderColor: "#E8DCC8",
        borderRadius: "12px",
      }}
    >
      {/* Trash button */}
      <button
        onClick={() => dispatch(deleteFromLiked(product))}
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
      >
        <FaTrash className="text-red-600 text-lg"  />
      </button>

      {/* Image */}
      <div className="w-full h-70 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h3
        className="text-[23px] font-bold"
        style={{ color: "#5C4A3A" }}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-snug"
        style={{ color: "#8B7355" }}
      >
        {product.description}
      </p>

      {/* Price + Basket */}
      <div className="flex items-center justify-between mt-2">
        <span
          className="text-xl font-extrabold"
          style={{ color: "#8B7355" }}
        >
          ${product.price}
        </span>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#8B7355" }}
          onClick={() => dispatch(addToCart(product))}
        >
          <FaShoppingCart className="text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default LikedCard;
