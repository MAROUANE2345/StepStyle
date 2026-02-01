"use client";
import React, { useState } from "react";

const AdminOrderCard = ({
  name,
  email,
  phone,
  city,
  address,
  orderInfo,
  totalPrice,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="bg-white border border-[#E8DCC8] rounded-2xl px-8 py-6 shadow-sm flex items-center justify-between">
        {/* LEFT */}
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#5C4A3A]">{name}</p>
          <p className="text-sm text-[#8B7355]">{email}</p>
          <p className="text-sm text-[#8B7355]">{phone}</p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="h-11 px-6 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          View Order
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#F5F0E8] w-[760px] rounded-2xl p-10 relative">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-[#5C4A3A] text-xl font-bold"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-[#5C4A3A]">
                Order Summary
              </h2>
              <p className="text-sm text-[#8B7355] mt-1">
                Customer purchase details
              </p>
            </div>

            {/* CUSTOMER INFO */}
            <div className="bg-white rounded-xl p-6 border border-[#E8DCC8] mb-8">
              <h3 className="font-bold text-[#5C4A3A] mb-4">
                Customer Information
              </h3>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>City:</strong> {city}</p>
                <p className="col-span-2">
                  <strong>Address:</strong> {address}
                </p>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-xl p-6 border border-[#E8DCC8] mb-8">
              <h3 className="font-bold text-[#5C4A3A] mb-4">
                Ordered Products
              </h3>

              <div className="space-y-4">
                {orderInfo.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-[#E8DCC8] pb-3 last:border-none"
                  >
                    <div>
                      <p className="font-semibold text-[#5C4A3A]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#8B7355]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-[#8B7355]">
                      ${item.total}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center bg-[#8B7355] text-white rounded-xl px-6 py-4">
              <span className="text-lg font-semibold">
                Total Price
              </span>
              <span className="text-2xl font-extrabold">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderCard;
