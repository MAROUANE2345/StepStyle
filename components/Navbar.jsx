"use client";

import React from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleCart } from "@/lib/reducer/cartSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get cart from redux
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total quantity
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className="px-60 bg-white border-b"
      style={{ borderColor: "#E8DCC8" }}
    >
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <h1
          className="font-bold text-[24px] cursor-pointer"
          style={{ color: "#8B7355" }}
          onClick={() => router.push("/")}
        >
          StepStyle
        </h1>

        {/* Links */}
        <div className="flex gap-6">
          <p
            className="cursor-pointer font-medium"
            style={{ color: "#5C4A3A" }}
            onClick={() => router.push("/")}
          >
            Home
          </p>

          <p
            className="cursor-pointer font-medium"
            style={{ color: "#5C4A3A" }}
            onClick={() => router.push("/catalogue")}
          >
            Catalogue
          </p>

          <p
            className="cursor-pointer font-medium"
            style={{ color: "#5C4A3A" }}
            onClick={() => router.push("/aihelp")}
          >
            AI Help
          </p>

          <p
            className="cursor-pointer font-medium"
            style={{ color: "#5C4A3A" }}
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </p>

          <p
            className="cursor-pointer font-medium"
            style={{ color: "#5C4A3A" }}
            onClick={() => router.push("/about")}
          >
            About Us
          </p>
        </div>

        {/* Icons */}
        <div className="flex gap-5 items-center">
          {/* Wishlist */}
          <FaHeart
            size={18}
            style={{ color: "#5C4A3A" }}
            className="cursor-pointer"
            onClick={() => router.push("/wishlist")}
          />

          {/* Cart with badge */}
          <div className="relative">
            <FaShoppingCart
              size={18}
              style={{ color: "#5C4A3A" }}
              className="cursor-pointer"
              onClick={() => dispatch(handleCart())}
            />

            {totalQuantity > 0 && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: "#8B7355" }}
              >
                {totalQuantity}
              </span>
            )}
          </div>

          {/* User */}
          <FaUser
            size={18}
            style={{ color: "#5C4A3A" }}
            className="cursor-pointer"
            onClick={() => router.push("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
