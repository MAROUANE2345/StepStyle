"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#E8DFD6] text-[#5C4A3A] py-12 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">StepStyle</h2>
          <p className="text-sm text-[#7A6A58]">
            Your destination for quality footwear for the whole family.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-sm text-[#7A6A58]">

            <li>
              <Link href="/" className="hover:text-[#5C4A3A] transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/catalogue" className="hover:text-[#5C4A3A] transition">
                Catalogue
              </Link>
            </li>

            <li>
              <Link href="/aihelp" className="hover:text-[#5C4A3A] transition">
                AI Help
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-[#5C4A3A] transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/aboutus" className="hover:text-[#5C4A3A] transition">
                About Us
              </Link>
            </li>

          </ul>
        </div>

        {/* Our Principles (NOT links) */}
        <div>
          <h3 className="font-semibold mb-3">Our Principles</h3>

          <ul className="space-y-2 text-sm text-[#7A6A58]">

            <li>Quality First</li>
            <li>Customer Satisfaction</li>
            <li>Honest Pricing</li>
            <li>Fast & Reliable Delivery</li>
            <li>Secure Shopping</li>
            <li>Respect & Transparency</li>

          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 text-lg text-[#7A6A58]">
            <span className="hover:text-[#5C4A3A] cursor-pointer">f</span>
            <span className="hover:text-[#5C4A3A] cursor-pointer">ig</span>
            <span className="hover:text-[#5C4A3A] cursor-pointer">tw</span>
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-[#D3C5B7] mt-10 pt-4 text-center text-sm text-[#7A6A58]">
        © 2026 StepStyle. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;