"use client";
import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleCart } from "@/lib/reducer/cartSlice";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "AI Help", path: "/aihelp" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/aboutus" },
  ];

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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`w-full bg-white sticky top-0 z-50 border-b border-[#E8DCC8] transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"
          }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">

          {/* Logo */}
          <h1
            data-testid="logo"
            className="font-bold text-xl sm:text-2xl md:text-[26px] text-[#8B7355] cursor-pointer tracking-wide select-none"
            onClick={() => navigate("/")}
          >
            Step<span className="text-[#5C4A3A]">Style</span>
          </h1>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer pb-1 group
                  ${pathname === link.path ? "text-[#8B7355]" : "text-[#5C4A3A] hover:text-[#8B7355]"}`}
              >
                {link.name}
                {/* Underline animation */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#8B7355] rounded-full transition-all duration-300
                    ${pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" data-testid="heart-icon" onClick={() => navigate("/wishlist")} className="p-2 -m-2 rounded-lg hover:bg-[#FAF7F2] transition">
              <FaHeart
                size={18}
                className="text-[#5C4A3A] hover:text-[#8B7355] transition-all duration-200"
              />
            </button>

            <div className="relative">
              <button type="button" data-testid="cart-icon" onClick={() => dispatch(handleCart())} className="p-2  rounded-lg hover:bg-[#FAF7F2] transition relative">
                <FaShoppingCart
                  size={18}
                  className="text-[#5C4A3A] hover:text-[#8B7355] transition-all duration-200"
                />
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white bg-[#8B7355] animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>

            <button type="button" data-testid="user-icon" onClick={() => navigate("/admin")} className="p-2 -m-2 rounded-lg hover:bg-[#FAF7F2] transition">
              <FaUser
                size={18}
                className="text-[#5C4A3A] hover:text-[#8B7355] transition-all duration-200"
              />
            </button>

            {/* Burger Button – only on small/tablet */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-[#E8DCC8] hover:border-[#8B7355] hover:bg-[#FAF7F2] transition-all duration-200 cursor-pointer gap-1.5 px-2 min-w-[40px] min-h-[40px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[2px] w-5 bg-[#5C4A3A] rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-5 bg-[#5C4A3A] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-5 bg-[#5C4A3A] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-[#E8DCC8]">
          <span className="font-bold text-[20px] text-[#8B7355] tracking-wide select-none">
            Step<span className="text-[#5C4A3A]">Style</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FAF7F2] border border-transparent hover:border-[#E8DCC8] transition-all duration-200 cursor-pointer"
          >
            <FaTimes size={16} className="text-[#5C4A3A]" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col px-4 py-6 gap-1 flex-1">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              style={{ animationDelay: `${index * 60}ms` }}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border-none text-left group
                ${pathname === link.path
                  ? "bg-[#FAF7F2] text-[#8B7355] border border-[#E8DCC8]"
                  : "text-[#5C4A3A] hover:bg-[#FAF7F2] hover:text-[#8B7355]"
                }`}
            >
              {link.name}
              <span
                className={`text-[#8B7355] transition-transform duration-200 group-hover:translate-x-1 ${pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
              >
                →
              </span>
            </button>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-5 border-t border-[#E8DCC8]">
          <p className="text-xs text-[#A89880] text-center tracking-wide">
            © 2025 StepStyle. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;