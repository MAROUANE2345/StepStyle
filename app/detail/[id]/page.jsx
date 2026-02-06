'use client';

import { addToCart } from '@/lib/reducer/cartSlice';
import { addToWishList, deleteFromLiked } from '@/lib/reducer/wishListSlice';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.like.Liked);

  useEffect(() => {
    axios
      .get('https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes/' + id)
      .then((res) => {
        setShoe(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
  if (shoe && wishList) {
    const isLiked = wishList.find((item) => item.id === shoe.id);
    setLiked(!!isLiked);
  }
}, [wishList, shoe?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#7A6A58] text-lg">
        Loading...
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Shoe not found!
      </div>
    );
  }

    const handleLike = () => {
        setLiked(!liked);
        if(liked == true){
            dispatch(deleteFromLiked(shoe));
        }else if(liked == false){
            dispatch(addToWishList(shoe));
        }
        
      };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-[#EFE6D8] px-6 py-16 flex justify-center items-start">
      {/* Main Card */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden hover:shadow-3xl transition-shadow duration-300">
        {/* IMAGE SECTION */}
        <div className="md:flex-1 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl">
          <img
            src={shoe.img || 'https://via.placeholder.com/400'}
            alt={shoe.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          {/* Like Button */}
          <button
           onClick={handleLike}
            className={`absolute top-4 right-4 w-12 h-12 flex justify-center items-center rounded-full border shadow-md transition hover:scale-110 ${
              liked
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white text-[#7A6A58] border-[#E6D9C8] hover:bg-[#F6EFE6]'
            }`}
          >
            <FaHeart size={18} />
          </button>
        </div>

        {/* DETAILS SECTION */}
        <div className="md:flex-1 p-10 flex flex-col justify-between">
          {/* Shoe Name */}
          <h1 className="text-2xl md:text-3xl font-semibold text-[#5C4A3A] mb-4">
            {shoe.name}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-[#F6EFE6] rounded-full text-xs text-[#7A6A58] font-medium">
              {shoe.category}
            </span>
            <span className="px-3 py-1 bg-[#F6EFE6] rounded-full text-xs text-[#7A6A58] font-medium">
              {shoe.sexe}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#7A6A58] text-sm md:text-base mb-6 leading-relaxed">
            {shoe.description}
          </p>

          {/* Price */}
          <p className="text-2xl md:text-3xl font-bold text-[#5C4A3A] mb-6">
            ${shoe.price}
          </p>

          {/* Add to Cart Button */}
          <button onClick={()=>dispatch(addToCart(shoe))} className="w-full md:w-auto px-6 py-3 bg-[#8B7355] hover:bg-[#7A6349] text-white rounded-lg font-medium flex items-center justify-center gap-3 transition transform hover:scale-[1.02] active:scale-[0.98]">
            <FaShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
