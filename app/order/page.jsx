"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/lib/reducer/emailSendSlice";
import { addOrder } from "@/lib/reducer/orderSlice";
import { clearCart } from "@/lib/reducer/cartSlice";

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

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const products = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));
    setOrderInfo(products);
  }, [cart]);

  const isFormValid =
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    city.trim() &&
    address.trim() &&
    cart.length > 0;

  const handleOrder = async () => {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      dispatch(
        addOrder({ name, email, city, phone, address, totalPrice, orderInfo })
      );

      dispatch(
        sendEmail({ name, email, city, phone, address, totalPrice, orderInfo })
      );

      // CLEAR INPUTS
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setAddress("");

      // SHOW SUCCESS POPUP
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    dispatch(clearCart())
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2]">

      {/* ================= SUCCESS POPUP ================= */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="w-52 h-52 rounded-full bg-green-500 flex flex-col items-center justify-center shadow-2xl ring-4 ring-green-300"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                className="text-white text-6xl font-bold"
              >
                ✓
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white text-lg font-semibold mt-3"
              >
                Order sent successfully!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 max-w-5xl mx-auto">

        <nav className="mb-6 sm:mb-8 text-sm">
          <ol className="flex items-center gap-2 text-[#7A6A58]">
            <li>
              <Link
                href="/catalogue"
                className="hover:text-[#8B7355] transition cursor-pointer"
              >
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#5C4A3A]">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-[#5C4A3A] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT FORM ================= */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8DCC8]">

              <h2 className="text-xl font-bold text-[#5C4A3A] mb-6">
                Customer information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {[ 
                  { label: "Full name", value: name, setter: setName, type: "text", placeholder: "John Doe" },
                  { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "john@email.com" },
                  { label: "Phone", value: phone, setter: setPhone, type: "text", placeholder: "+212 6XX XX XX XX" },
                  { label: "City", value: city, setter: setCity, type: "text", placeholder: "Casablanca" },
                ].map((field, i) => (
                  <div key={i} className={i === 0 ? "sm:col-span-2" : ""}>
                    <label className="block mb-2 text-sm font-medium text-[#5C4A3A]">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none transition focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] hover:border-[#8B7355]"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-[#5C4A3A]">
                    Shipping address
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, building, apartment..."
                    className="w-full px-4 py-3 border border-[#E8DCC8] rounded-xl outline-none resize-none transition focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] hover:border-[#8B7355]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleOrder}
                disabled={!isFormValid || loading}
                className={`mt-8 w-full h-14 rounded-xl font-bold text-lg transition-all duration-200
                ${
                  !isFormValid || loading
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-[#8B7355] hover:bg-[#7A6349] active:scale-[0.98] text-white cursor-pointer"
                }`}
              >
                {loading ? "Processing..." : "Confirm & Place Order"}
              </button>
            </div>
          </div>

          {/* ================= RIGHT SUMMARY ================= */}
          <div className="order-1 w-full lg:w-[450px] lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCC8] lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-[#5C4A3A] mb-4">
                Order summary
              </h2>

              {cart.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-[#7A6A58] mb-4">
                    Your cart is empty.
                  </p>
                  <Link
                    href="/catalogue"
                    className="inline-block bg-[#8B7355] text-white px-5 py-2.5 rounded-xl hover:bg-[#7A6349] transition cursor-pointer"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DCC8]"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-white"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#8B7355]">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <span className="font-bold text-[#8B7355]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E8DCC8] mt-5 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-extrabold text-[#8B7355]">
                        ${totalPrice?.toFixed(2) ?? "0.00"}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FAF7F2] text-xs text-[#8B7355]">
                      🔒 Secure checkout
                    </div>
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