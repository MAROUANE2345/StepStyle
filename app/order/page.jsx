"use client";

import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const cart = useSelector((state) => state.cart.cart || []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="px-60 py-12 bg-[#F5F0E8] min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#5C4A3A] mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-3 gap-10">
        {/* LEFT – Customer Info */}
        <div
          className="col-span-2 bg-white p-8 rounded-xl shadow-sm border"
          style={{ borderColor: "#E8DCC8" }}
        >
          <h2 className="text-2xl font-bold text-[#5C4A3A] mb-6">
            Customer Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-[#5C4A3A]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-12 px-4 border rounded-md outline-none"
                style={{ borderColor: "#E8DCC8" }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#5C4A3A]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@email.com"
                className="w-full h-12 px-4 border rounded-md outline-none"
                style={{ borderColor: "#E8DCC8" }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#5C4A3A]">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+212 6XX XX XX XX"
                className="w-full h-12 px-4 border rounded-md outline-none"
                style={{ borderColor: "#E8DCC8" }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#5C4A3A]">
                City
              </label>
              <input
                type="text"
                placeholder="Casablanca"
                className="w-full h-12 px-4 border rounded-md outline-none"
                style={{ borderColor: "#E8DCC8" }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium text-[#5C4A3A]">
              Shipping Address
            </label>
            <textarea
              rows={4}
              placeholder="Street, building, apartment..."
              className="w-full px-4 py-3 border rounded-md outline-none resize-none"
              style={{ borderColor: "#E8DCC8" }}
            />
          </div>
        </div>

        {/* RIGHT – Order Summary */}
        <div
          className="bg-white p-8 rounded-xl shadow-sm border h-fit"
          style={{ borderColor: "#E8DCC8" }}
        >
          <h2 className="text-2xl font-bold text-[#5C4A3A] mb-6">
            Order Summary
          </h2>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="text-[#8B7355]">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-md"
                  style={{ backgroundColor: "#F5F0E8" }}
                >
                  {/* Product Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-white"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-bold text-[#5C4A3A]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#8B7355]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="font-bold text-[#8B7355]">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div
            className="border-t my-6"
            style={{ borderColor: "#E8DCC8" }}
          />

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-[#5C4A3A]">
              Total
            </span>
            <span className="text-2xl font-extrabold text-[#8B7355]">
              ${totalPrice}
            </span>
          </div>

          {/* Button */}
          <button
            disabled={cart.length === 0}
            className="w-full h-14 rounded-md bg-[#8B7355] text-white font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
