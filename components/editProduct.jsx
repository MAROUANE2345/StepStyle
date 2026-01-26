'use client';
import { editProduct } from "@/lib/reducer/productSlice";
import React, { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

const EditPopUp = ({ onClose, product }) => {
    const [shoes,setShoes] = useState({
        id : product.id,
        name: product.name,
        price: product.price,
        sexe: product.sexe,
        size: product.size,
        category: product.category,
        img: product.img,
    })
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(editProduct(shoes))
        onClose();
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-[#faf7f2] p-6 shadow-xl">
        
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#6b4f3b]">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-[#e6dccf]"
          >
            <FaTimes className="text-[#6b4f3b]" />
          </button>
        </div>

        {/* CONTENT - Inputs with labels */}
        <div className="mb-6 flex flex-col gap-4 text-[#6b4f3b]">
          
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={shoes.name}
              onChange={(e) => setShoes({...shoes, name: e.target.value})}
              placeholder="Enter product name"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Price</label>
            <input
              type="text"
              value={shoes.price}
              onChange={(e) => setShoes({...shoes, price: e.target.value})}
              placeholder="Enter price"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Gender</label>
            <input
              type="text"
              value={shoes.sexe}
              onChange={(e) => setShoes({...shoes, sexe: e.target.value})}
              placeholder="Enter gender"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>

          {/* Sizes */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Sizes</label>
            <input
              type="text"
              value={Array.isArray(shoes.size) ? shoes.size.join(", ") : shoes.size}
                onChange={(e) => setShoes({...shoes, size: e.target.value.split(",").map(size => size.trim())})}
              placeholder="Enter sizes (comma-separated)"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Category</label>
            <input
              type="text"
              value={shoes.category}
                onChange={(e) => setShoes({...shoes, category: e.target.value})}
              placeholder="Enter category"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Image URL</label>
            <input
              type="text"
              value={shoes.img}
              onChange={(e) => setShoes({...shoes, img: e.target.value})}
              placeholder="Enter image URL"
              className="w-full px-4 py-3.5 border rounded-lg outline-none text-gray-800 placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              style={{ borderColor: '#E8DCC8' }}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-[#e6dccf] px-4 py-2 text-sm font-medium text-[#6b4f3b] hover:bg-[#d6c8b6]"
          >
            Cancel
          </button>

          <button
          onClick={()=>handleEdit()}
            className="flex items-center gap-2 rounded-md bg-[#8b7355] px-4 py-2 text-sm font-medium text-white hover:bg-[#75573c]"
          >
            <FaEdit />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp;
