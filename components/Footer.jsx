"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DCC8] mt-12 safe-bottom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-10 flex flex-col gap-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="text-[#5C4A3A] font-bold text-xl sm:text-2xl tracking-wide">
            Step<span className="text-[#8B7355]">Style</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base font-medium text-[#5C4A3A]">
            <Link href="/catalogue" className="hover:text-[#8B7355] transition-colors py-1">
              Catalogue
            </Link>
            <Link href="/aboutus" className="hover:text-[#8B7355] transition-colors py-1">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#8B7355] transition-colors py-1">
              Contact
            </Link>
            <Link href="/aihelp" className="hover:text-[#8B7355] transition-colors py-1">
              AI Help
            </Link>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8DCC8] text-xs sm:text-sm text-[#8B7355]">
          <p className="text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} StepStyle. All rights reserved.
          </p>
          <div className="flex gap-3 order-1 sm:order-2">
            <a href="#" className="w-9 h-9 rounded-full border border-[#E8DCC8] flex items-center justify-center text-sm hover:border-[#8B7355] hover:text-[#8B7355] transition" aria-label="Facebook">f</a>
            <a href="#" className="w-9 h-9 rounded-full border border-[#E8DCC8] flex items-center justify-center text-sm hover:border-[#8B7355] hover:text-[#8B7355] transition" aria-label="Twitter">t</a>
            <a href="#" className="w-9 h-9 rounded-full border border-[#E8DCC8] flex items-center justify-center text-sm hover:border-[#8B7355] hover:text-[#8B7355] transition" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

