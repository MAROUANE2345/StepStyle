"use client";
import React, { useState } from "react";

const AdminOrderCard = ({
  name,
  email,
  phone,
  city,
  address,
  img,
  orderInfo = [],
  totalPrice,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="bg-white border border-[#E8DCC8] rounded-2xl px-6 md:px-8 py-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        {/* LEFT */}
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#5C4A3A]">{name}</p>
          <p className="text-sm text-[#8B7355]">{email}</p>
          <p className="text-sm text-[#8B7355]">{phone}</p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="h-11 w-full md:w-auto px-6 bg-[#8B7355] text-white rounded-lg font-semibold hover:bg-[#7A6349] active:scale-95 transition"
        >
          View Order
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto">

          <div className="relative w-full max-w-4xl max-h-[95vh] bg-[#F5F0E8] rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col gap-6 overflow-y-auto">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-red-50 text-[#5C4A3A] hover:text-red-500 text-xl font-bold transition shadow"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="border-b border-[#E8DCC8] pb-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5C4A3A]">
                Order Summary
              </h2>
              <p className="text-sm text-[#8B7355] mt-1">
                Complete customer purchase details
              </p>
            </div>

            {/* CUSTOMER INFO */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DCC8]">
              <h3 className="text-lg font-bold text-[#5C4A3A] mb-4">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#8B7355] text-xs">Name</p>
                  <p className="font-semibold">{name}</p>
                </div>

                <div>
                  <p className="text-[#8B7355] text-xs">Email</p>
                  <p className="font-semibold">{email}</p>
                </div>

                <div>
                  <p className="text-[#8B7355] text-xs">Phone</p>
                  <p className="font-semibold">{phone}</p>
                </div>

                <div>
                  <p className="text-[#8B7355] text-xs">City</p>
                  <p className="font-semibold">{city}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[#8B7355] text-xs">Address</p>
                  <p className="font-semibold">{address}</p>
                </div>
              </div>
            </div>

            {/* ORDERED PRODUCTS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DCC8] max-h-[380px] overflow-y-auto">
              <h3 className="text-lg font-bold text-[#5C4A3A] mb-5">
                Ordered Products
              </h3>

              <div className="flex flex-col gap-4">
                {orderInfo.length === 0 ? (
                  <p className="text-sm text-[#8B7355]">
                    No products found.
                  </p>
                ) : (
                  orderInfo.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-[#FFF7F0] rounded-xl p-4 hover:bg-[#F0E5D8] transition"
                    >
                      <div className="flex items-center gap-4">

                        {/* PRODUCT IMAGE */}
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-[#E8DCC8]"
                        />

                        <div>
                          <p className="font-semibold text-[#5C4A3A]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#8B7355]">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-xs text-[#8B7355]">
                            Unit: ${item.price}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold text-[#8B7355] text-lg">
                        ${item.total}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center bg-[#8B7355] text-white rounded-2xl px-8 py-5 shadow-lg">
              <span className="text-lg font-semibold">
                Total Price
              </span>
              <span className="text-3xl font-extrabold">
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