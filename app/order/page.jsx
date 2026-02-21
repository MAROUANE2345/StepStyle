"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { sendEmail } from "@/lib/reducer/emailSendSlice";

const Page = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.Price);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [orderInfo, setOrderInfo] = useState([]);

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
      name,
      email,
      phone,
      city,
      address,
      totalPrice,
      orderInfo,
    });
    dispatch(
      sendEmail({ name, email, city, phone, address, totalPrice, orderInfo })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 max-w-5xl mx-auto">
        {/* Breadcrumb / step */}
        <nav className="mb-6 sm:mb-8 text-sm">
          <ol className="flex items-center gap-2 text-[#7A6A58]">
            <li>
              <Link href="/catalogue" className="hover:text-[#8B7355] transition">
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-semibold text-[#5C4A3A]">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4A3A] mb-6 sm:mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-[#E8DCC8]">
              <h2 className="text-lg sm:text-xl font-bold text-[#5C4A3A] mb-4 sm:mb-6">
                Customer information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label className="block mb-1.5 text-sm font-medium text-[#5C4A3A]">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A] placeholder:text-[#8B7355]/50"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-[#5C4A3A]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@email.com"
                    className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A] placeholder:text-[#8B7355]/50"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-[#5C4A3A]">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6XX XX XX XX"
                    className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A] placeholder:text-[#8B7355]/50"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-[#5C4A3A]">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Casablanca"
                    className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A] placeholder:text-[#8B7355]/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1.5 text-sm font-medium text-[#5C4A3A]">
                    Shipping address
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, building, apartment..."
                    className="w-full px-4 py-3 border border-[#E8DCC8] rounded-xl outline-none resize-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] text-[#5C4A3A] placeholder:text-[#8B7355]/50"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleOrder}
                disabled={cart.length === 0}
                className="mt-8 w-full h-13 sm:h-14 bg-[#8B7355] text-white font-bold text-base sm:text-lg rounded-xl hover:bg-[#7A6349] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8B7355]"
              >
                Confirm & place order
              </button>
            </div>
          </div>

          {/* Right: order summary — show first on mobile so user sees cart */}
          <div className="order-1 lg:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-[#E8DCC8] lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-[#5C4A3A] mb-4">
                Order summary
              </h2>

              {cart.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-[#7A6A58] text-sm sm:text-base mb-4">
                    Your cart is empty.
                  </p>
                  <Link
                    href="/catalogue"
                    className="inline-block bg-[#8B7355] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#7A6349] transition"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCC8]"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#5C4A3A] text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#8B7355]">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <span className="font-bold text-[#8B7355] text-sm sm:text-base shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E8DCC8] mt-4 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-[#5C4A3A]">Total</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#8B7355]">
                        ${totalPrice?.toFixed(2) ?? "0.00"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FAF7F2] text-xs text-[#8B7355]">
                      <span aria-hidden>🔒</span>
                      <span>Secure checkout</span>
                    </div>
                    <p className="text-xs text-[#7A6A58] text-center mt-3">
                      By placing your order you agree to our terms.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
