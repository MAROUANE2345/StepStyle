'use client';

import { addToCart } from '@/lib/reducer/cartSlice';
import { addToWishList, deleteFromLiked } from '@/lib/reducer/wishListSlice';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishList = useSelector((state) => state.like.Liked);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const isLiked = wishList.find((item) => item.id === product.id);
    setLiked(!!isLiked);
  }, [wishList, product.id]);

  const handleLike = () => {
    setLiked(!liked);
    if(liked == true){
        dispatch(deleteFromLiked(product));
    }else if(liked == false){
        dispatch(addToWishList(product));
    }
    
  };

  return (
    <div className="relative flex flex-col bg-white border border-[#E8DCC8] rounded-xl p-3 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full h-full min-h-[320px] sm:min-h-[380px] flex">
      {/* Like button */}
      <button
        type="button"
        onClick={handleLike}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/95 shadow-md hover:scale-110 transition cursor-pointer"
      >
        <FaHeart className={`text-base sm:text-lg transition-colors ${liked ? "text-red-500" : "text-gray-400"}`} />
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

export default Card;
