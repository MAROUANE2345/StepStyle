'use client';

import { addToCart } from '@/lib/reducer/cartSlice';
import { addToWishList } from '@/lib/reducer/wishListSlice';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.like.Liked);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const isLiked = wishList.find((item) => item.id === product.id);
    setLiked(!!isLiked);
  }, [wishList, product.id]);

  const handleLike = () => {
    setLiked(!liked);
    dispatch(addToWishList(product));
  };

  return (
    <div
      className="relative flex flex-col gap-3 bg-white border p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        width: '300px',
        height: '425px',
        borderColor: '#E8DCC8',
        borderRadius: '12px',
      }}
    >
      {/* Like button */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
      >
        <FaHeart
          className={`text-lg transition-colors ${liked ? 'text-red-500' : 'text-gray-400'
            }`}
        />
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
      <h3 className="text-[23px] font-bold text-[#5C4A3A]">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-snug text-[#8B7355]">
        {product.description}
      </p>



      {/* Price + Basket */}
      {/* Price + View Details + Basket */}
      <div className="flex items-center justify-between mt-auto gap-3">
        <span className="text-xl font-extrabold text-[#8B7355]">
          ${product.price}
        </span>

        <Link
          href={`/products/${product.id}`}
          className="flex-1 text-center text-[#8B7355] text-sm font-medium py-2 rounded-md border transition-colors hover:bg-[#8B7355] hover:text-white"
          style={{
            borderColor: '#8B7355',
             
          }}
        >
          View Details
        </Link>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: '#8B7355' }}
          onClick={() => dispatch(addToCart(product))}
        >
          <FaShoppingCart className="text-white cursor-pointer" />
        </button>
      </div>

    </div>
  );
};

export default Card;
