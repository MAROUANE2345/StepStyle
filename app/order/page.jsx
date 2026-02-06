"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { sendEmail } from "@/lib/reducer/emailSendSlice";
const Page = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.Price);
  const dispatch = useDispatch();
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [city,setCity] = useState("")
  const [address,setAddress] = useState("")
  const [orderInfo,setOrderInfo] = useState([
   
  ])


   useEffect(() => {
    const products = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    
    setOrderInfo(products);
  }, [cart]);
  

  const handleOrder = () => {
      axios.post("https://69733ee0b5f46f8b58269eb8.mockapi.io/order", {
        name : name,
        email : email,
        phone : phone,
        city : city,
        address : address,
        totalPrice : totalPrice,
        orderInfo : orderInfo
      });
      dispatch(sendEmail({ name, email, city, phone, address, totalPrice, orderInfo }));
  }
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
                onChange={(e)=>setName(e.target.value)}
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
                onChange={(e)=>setEmail(e.target.value)}
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
                onChange={(e)=>setPhone(e.target.value)}
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
                onChange={(e)=>setCity(e.target.value)}
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
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="Street, building, apartment..."
              className="w-full px-4 py-3 border rounded-md outline-none resize-none"
              style={{ borderColor: "#E8DCC8" }}
            />
          </div>

          {/* ✅ BUTTON MOVED HERE */}
          <div className="mt-10">
            <button
              onClick={handleOrder}
              disabled={cart.length === 0}
              className="
                w-full h-14
                bg-[#8B7355]
                text-white
                font-bold
                text-lg
                rounded-md
                hover:opacity-90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Confirm & Place Order
            </button>
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

          {cart.length === 0 ? (
            <p className="text-[#8B7355]">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-md"
                  style={{ backgroundColor: "#F5F0E8" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-white"
                  />

                  <div className="flex-1">
                    <p className="font-bold text-[#5C4A3A]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#8B7355]">
                      Qty: {item.quantity}
                    </p>
                  </div>

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

          {/* ✅ TEXTS STAY HERE */}
          <div className="space-y-3">
            <p className="text-sm text-[#8B7355] text-center">
              By confirming your order, you agree to our terms and conditions.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-[#8B7355]">
              <span>🔒</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
