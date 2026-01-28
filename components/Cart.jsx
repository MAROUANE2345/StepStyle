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
            className="fixed top-0 right-0 h-full w-[420px] bg-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-bold text-[#5C4A3A]">
                Shopping Cart
              </h2>
              <FaTimes
                className="cursor-pointer text-[#5C4A3A]"
                onClick={() => dispatch(handleCart())}
              />
            </div>

            {/* Divider */}
            <div
              className="border-b"
              style={{ borderColor: "#E8DCC8" }}
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#5C4A3A] mt-10">
                  Your cart is empty
                </p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 rounded-md relative"
                    style={{ backgroundColor: "#E8DCC8" }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#5C4A3A]">
                        {product.name}
                      </p>

                      <p className="text-base font-extrabold text-[#8B7355] mt-1">
                        ${product.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={()=>dispatch(dec(product))} className="w-7 h-7 rounded-md bg-white font-bold cursor-pointer ">
                          −
                        </button>
                        <span className="font-medium">
                          {product.quantity}
                        </span>
                        <button onClick={()=>dispatch(inc(product))} className="w-7 h-7 rounded-md bg-white font-bold">
                          +
                        </button>
                      </div>
                    </div>

                    <FaTrash className="absolute bottom-3 right-3 text-red-600 cursor-pointer" onClick={()=>dispatch(deleteFromCart(product))} />
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="p-4"
              style={{ backgroundColor: "#E8DCC8" }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#5C4A3A]">
                  Total :
                </span>
                <span className="font-extrabold text-[#8B7355]">
                  {total} $
                </span>
              </div>

              <button onClick={goToOrder} className="cursor-pointer w-full h-12 rounded-md bg-[#947045] hover:bg-[#8B7355]  text-white font-bold">
                Order this
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
