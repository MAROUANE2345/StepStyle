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
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4 px-4">
        <div className="w-10 h-10 border-2 border-[#8B7355] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#7A6A58] text-sm sm:text-base">Loading...</p>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-2 px-4 text-center">
        <p className="text-red-500 text-base sm:text-lg font-medium">Shoe not found</p>
        <a href="/catalogue" className="text-[#8B7355] underline hover:no-underline text-sm">Back to catalogue</a>
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
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-[#EFE6D8] px-4 sm:px-6 py-6 sm:py-10 md:py-16 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden transition-shadow duration-300">
        {/* IMAGE */}
        <div className="md:flex-1 relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none aspect-square md:aspect-auto md:min-h-[400px]">
          <img
            src={shoe.img || "https://via.placeholder.com/400"}
            alt={shoe.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <button
            type="button"
            onClick={handleLike}
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 flex justify-center items-center rounded-full border shadow-md transition hover:scale-110 ${
              liked ? "bg-red-500 text-white border-red-500" : "bg-white text-[#7A6A58] border-[#E6D9C8] hover:bg-[#F6EFE6]"
            }`}
          >
            <FaHeart size={18} />
          </button>
        </div>

        {/* DETAILS */}
        <div className="md:flex-1 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#5C4A3A]">
            {shoe.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#F6EFE6] rounded-full text-xs text-[#7A6A58] font-medium">
              {shoe.category}
            </span>
            <span className="px-3 py-1 bg-[#F6EFE6] rounded-full text-xs text-[#7A6A58] font-medium">
              {shoe.sexe}
            </span>
          </div>
          <p className="text-[#7A6A58] text-sm md:text-base leading-relaxed flex-1">
            {shoe.description}
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5C4A3A]">
            ${shoe.price}
          </p>
          <button
            type="button"
            onClick={() => dispatch(addToCart(shoe))}
            className="w-full md:w-auto px-6 py-3.5 bg-[#8B7355] hover:bg-[#7A6349] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition hover:opacity-95 active:scale-[0.98]"
          >
            <FaShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
