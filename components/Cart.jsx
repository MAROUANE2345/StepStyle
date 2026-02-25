"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash } from "react-icons/fa";
import { dec, deleteFromCart, handleCart, inc } from "@/lib/reducer/cartSlice";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const showCart = useSelector((state) => state.cart.showCart);
  const total = useSelector((state) => state.cart.Price);
  const dispatch = useDispatch();
  const router = useRouter();
  const goToOrder = ()=> {
    router.push("/order");
    dispatch(handleCart());
  }
  return (
    <AnimatePresence>
      {showCart && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => dispatch(handleCart())}
          />

          {/* CART PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full xs:w-[92vw] sm:max-w-[400px] md:max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#E8DCC8]">
              <h2 className="text-base sm:text-lg font-bold text-[#5C4A3A]">
                Shopping Cart
              </h2>
              <button type="button" onClick={() => dispatch(handleCart())} className="p-2 -m-2 rounded-lg hover:bg-[#FAF7F2] text-[#5C4A3A]">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {cart.length === 0 ? (
                <p className="text-center text-[#5C4A3A] mt-10 text-sm sm:text-base">
                  Your cart is empty
                </p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl relative bg-[#F5F0E8] border border-[#E8DCC8]"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#5C4A3A] truncate">
                        {product.name}
                      </p>
                      <p className="text-sm sm:text-base font-extrabold text-[#8B7355] mt-0.5">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button type="button" onClick={() => dispatch(dec(product))} className="w-8 h-8 rounded-lg bg-white border border-[#E8DCC8] font-bold text-[#5C4A3A] hover:bg-[#FAF7F2] transition">
                          −
                        </button>
                        <span className="font-medium text-sm w-6 text-center">{product.quantity}</span>
                        <button type="button" onClick={() => dispatch(inc(product))} className="w-8 h-8 rounded-lg bg-white border border-[#E8DCC8] font-bold text-[#5C4A3A] hover:bg-[#FAF7F2] transition">
                          +
                        </button>
                      </div>
                    </div>
                    <button type="button" onClick={() => dispatch(deleteFromCart(product.id))} className="absolute bottom-3 right-3 p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition">
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-[#F5F0E8] border-t border-[#E8DCC8] safe-bottom">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="font-bold text-[#5C4A3A] text-sm sm:text-base">Total</span>
                <span className="font-extrabold text-[#8B7355] text-lg sm:text-xl">{total} $</span>
              </div>
              <button type="button" onClick={goToOrder} className="w-full h-12 rounded-xl bg-[#8B7355] hover:bg-[#7A6349] text-white font-bold text-sm sm:text-base transition">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
