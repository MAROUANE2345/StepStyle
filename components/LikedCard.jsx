"use client";

import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/reducer/cartSlice";
import { deleteFromLiked } from "@/lib/reducer/wishListSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LikedCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="relative flex flex-col bg-white border border-[#E8DCC8] rounded-xl p-3 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full h-full min-h-[320px] sm:min-h-[380px] flex">
      {/* Trash button */}
      <button
        type="button"
        onClick={() => dispatch(deleteFromLiked(product))}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/95 shadow-md hover:scale-110 transition cursor-pointer text-red-600 hover:bg-red-50"
      >
        <FaTrash className="text-base sm:text-lg" />
      </button>

      {/* Image */}
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-[#FAF7F2] mb-3">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Name */}
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#5C4A3A] line-clamp-2 mb-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm leading-snug text-[#8B7355] line-clamp-2 flex-1 min-h-0">
        {product.description}
      </p>

      {/* Price + Actions */}
      <div className="flex items-center gap-2 sm:gap-3 mt-3 pt-3 border-t border-[#E8DCC8]">
        <span className="text-lg sm:text-xl font-extrabold text-[#8B7355] shrink-0">
          ${product.price}
        </span>
        <button
          type="button"
          onClick={() => router.push(`/detail/${product.id}`)}
          className="flex-1 min-w-0 text-center text-[#8B7355] text-xs sm:text-sm font-medium py-2 rounded-lg border border-[#8B7355] transition-colors hover:bg-[#8B7355] hover:text-white"
        >
          View
        </button>
        <button
          type="button"
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#8B7355] hover:bg-[#7A6349] transition shrink-0"
          onClick={() => dispatch(addToCart(product))}
        >
          <FaShoppingCart className="text-white text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
};

export default LikedCard;
