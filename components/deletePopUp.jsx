"use client";
import { deleteProducts } from "@/lib/reducer/productSlice";
import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

const DeletePopUp = ({ onClose,id}) => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteProducts(id));
        onClose();
        
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-[#faf7f2] p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#6b4f3b]">
            Delete Product
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-[#e6dccf]"
          >
            <FaTimes className="text-[#6b4f3b]" />
          </button>
        </div>

        {/* CONTENT */}
        <p className="mb-6 text-sm text-[#6b4f3b]">
          Are you sure you want to delete this product?  
          <br />
          <span className="font-medium text-red-600">
            This action cannot be undone.
          </span>
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-[#e6dccf] px-4 py-2 text-sm font-medium text-[#6b4f3b] hover:bg-[#d6c8b6]"
          >
            Cancel
          </button>

          <button
            onClick={()=>handleDelete(id)}
            className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
