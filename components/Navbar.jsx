"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleCart } from "@/lib/reducer/cartSlice";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`w-full bg-white sticky top-0 z-50 border-b border-[#E8DCC8] transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" data-testid="logo">
            <h1 className="font-bold text-xl sm:text-2xl md:text-[26px] text-[#8B7355] cursor-pointer tracking-wide select-none">
              Step<span className="text-[#5C4A3A]">Style</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 justify-center gap-8">

            <Link href="/">
              <button
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group ${
                  pathname === "/"
                    ? "text-[#8B7355]"
                    : "text-[#5C4A3A] hover:text-[#8B7355]"
                }`}
              >
                Home
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300 ${
                    pathname === "/"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </Link>

            <Link href="/catalogue">
              <button
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group ${
                  pathname === "/catalogue"
                    ? "text-[#8B7355]"
                    : "text-[#5C4A3A] hover:text-[#8B7355]"
                }`}
              >
                Catalogue
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300 ${
                    pathname === "/catalogue"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </Link>

            <Link href="/aihelp">
              <button
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group ${
                  pathname === "/aihelp"
                    ? "text-[#8B7355]"
                    : "text-[#5C4A3A] hover:text-[#8B7355]"
                }`}
              >
                AI Help
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300 ${
                    pathname === "/aihelp"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </Link>

            <Link href="/contact">
              <button
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group ${
                  pathname === "/contact"
                    ? "text-[#8B7355]"
                    : "text-[#5C4A3A] hover:text-[#8B7355]"
                }`}
              >
                Contact Us
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300 ${
                    pathname === "/contact"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </Link>

            <Link href="/aboutus">
              <button
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group ${
                  pathname === "/aboutus"
                    ? "text-[#8B7355]"
                    : "text-[#5C4A3A] hover:text-[#8B7355]"
                }`}
              >
                About Us
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300 ${
                    pathname === "/aboutus"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </Link>

          </div>

          {/* Right Side Icons */}
          <div className="flex cursor-pointer items-center gap-3 sm:gap-5">

            <Link href="/wishlist">
              <button
                type="button"
                data-testid="heart-icon"
                className="p-2 cursor-pointer -m-2 rounded-lg hover:bg-[#FAF7F2] transition"
              >
                <FaHeart size={18} className="text-[#5C4A3A] hover:text-[#8B7355]" />
              </button>
            </Link>

            <div className="relative cursor-pointer">
              <button
                type="button"
                data-testid="cart-icon"
                onClick={() => dispatch(handleCart())}
                className="p-2 cursor-pointer rounded-lg hover:bg-[#FAF7F2] transition relative"
              >
                <FaShoppingCart size={18} className="text-[#5C4A3A] hover:text-[#8B7355]" />
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white bg-[#8B7355] animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>

            <Link href="/admin">
              <button
                type="button"
                data-testid="user-icon"
                className="p-2 cursor-pointer -m-2 rounded-lg hover:bg-[#FAF7F2] transition"
              >
                <FaUser size={18} className="text-[#5C4A3A] hover:text-[#8B7355]" />
              </button>
            </Link>

            {/* Burger */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-[#E8DCC8] hover:border-[#8B7355] hover:bg-[#FAF7F2] transition-all duration-200 cursor-pointer gap-1.5 px-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block h-[2px] w-5 bg-[#5C4A3A] transition-all ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-[2px] w-5 bg-[#5C4A3A] transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-[#5C4A3A] transition-all ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl border-l border-[#E8DCC8] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#E8DCC8]">
          <h2 className="text-lg font-bold text-[#5C4A3A]">Menu</h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FAF7F2] transition"
          >
            <FaTimes size={18} className="text-[#5C4A3A] cursor-pointer" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-4 py-4 gap-1">
          {[
            { name: "Home", path: "/" },
            { name: "Catalogue", path: "/catalogue" },
            { name: "AI Help", path: "/aihelp" },
            { name: "Contact Us", path: "/contact" },
            { name: "About Us", path: "/aboutus" },
          ].map((link) => (
            <Link key={link.path} href={link.path}>
              <button
                onClick={() => setMenuOpen(false)}
                className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pathname === link.path
                    ? "bg-[#8B7355] text-white"
                    : "text-[#5C4A3A] hover:bg-[#FAF7F2]"
                }`}
              >
                {link.name}
              </button>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
};

export default Navbar;