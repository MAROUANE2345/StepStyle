"use client";
import React, { useState } from "react";

const AdminOrderCard = ({ name, email, phone, city, address, orderInfo, totalPrice }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="bg-white border border-[#E8DCC8] rounded-2xl px-6 md:px-8 py-4 md:py-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        {/* LEFT */}
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#5C4A3A] truncate">{name}</p>
          <p className="text-sm text-[#8B7355] truncate">{email}</p>
          <p className="text-sm text-[#8B7355]">{phone}</p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="h-11 w-full md:w-auto px-6 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          View Order
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-h-[95vh] sm:max-h-[90vh] max-w-3xl bg-[#F5F0E8] rounded-t-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 md:gap-8 overflow-y-auto">

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#5C4A3A] text-xl font-bold hover:text-red-500 transition shadow"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="flex flex-col gap-1 md:gap-2 border-b border-[#E8DCC8] pb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#5C4A3A]">
                Order Summary
              </h2>
              <p className="text-sm md:text-base text-[#8B7355]">
                Customer purchase details
              </p>
            </div>

            {/* CUSTOMER INFO */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DCC8]">
              <h3 className="text-lg md:text-xl font-bold text-[#5C4A3A] mb-4">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>City:</strong> {city}</p>
                <p className="sm:col-span-2"><strong>Address:</strong> {address}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#E8DCC8] max-h-[280px] sm:max-h-[360px] overflow-y-auto">
              <h3 className="text-lg md:text-xl font-bold text-[#5C4A3A] mb-4">Ordered Products</h3>
              <div className="flex flex-col gap-4">
                {orderInfo.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#FFF7F0] rounded-xl p-3 hover:bg-[#F0E5D8] transition"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product image placeholder */}
                      <div className="w-14 h-14 bg-[#E8DCC8] rounded-lg flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-[#5C4A3A]">{item.name}</p>
                        <p className="text-xs text-[#8B7355]">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-[#8B7355] mt-2 sm:mt-0">${item.total}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition">
                Mark as Shipped
              </button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition">
                Cancel Order
              </button>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center bg-[#8B7355] text-white rounded-2xl px-6 py-4 mt-2 md:mt-4">
              <span className="text-lg md:text-xl font-semibold">Total Price</span>
              <span className="text-2xl md:text-3xl font-extrabold">${totalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderCard;
