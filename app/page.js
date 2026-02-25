"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/reducer/productSlice";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const Page = () => {
  const dispatch = useDispatch();
  const { products: bestSells, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#6B5B4A]">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Step Into Confidence.
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-[#6B5B4A]/90">
              Discover premium footwear crafted for comfort, style, and everyday movement.
              Elevate your walk. Define your presence.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <Link
                href="/catalogue"
                className="bg-[#8B7355] text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-medium hover:opacity-90 transition text-center text-sm sm:text-base"
              >
                Shop Now
              </Link>
              <Link
                href="/aihelp"
                className="border-2 border-[#8B7355] text-[#8B7355] px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-medium hover:bg-[#8B7355] hover:text-white transition text-center text-sm sm:text-base"
              >
                Search with AI
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end order-first md:order-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <Image
              src="/home2.jpg"
              alt="Featured Shoe"
              width={400}
              height={400}
              className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto object-contain rounded-2xl shadow-lg"
              priority
            />
          </motion.div>

        </div>
      </motion.section>


      {/* ================= FEATURE SECTION ================= */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-white/50"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        custom={0.1}
      >
        <motion.div
          className="max-w-6xl mx-auto text-center mb-12 md:mb-16"
          variants={fadeUp}
          custom={0.1}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Designed for Every Step
          </h2>
          <p className="text-sm sm:text-base">
            Where comfort meets craftsmanship and modern style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">

          {/* Card 1 */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, boxShadow: "0 18px 45px rgba(0,0,0,0.08)" }}
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl text-center transition-shadow duration-200"
          >
            <Image
              src="/new.jpg"
              alt="Premium Materials"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Premium Materials
            </h3>
            <p className="text-sm sm:text-base">
              Carefully selected fabrics and durable soles built to last.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, boxShadow: "0 18px 45px rgba(0,0,0,0.08)" }}
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl text-center transition-shadow duration-200"
          >
            <Image
              src="/home4.jpg"
              alt="All Day Comfort"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              All-Day Comfort
            </h3>
            <p className="text-sm sm:text-base">
              Lightweight support designed for long walks and busy days.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, boxShadow: "0 18px 45px rgba(0,0,0,0.08)" }}
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl text-center transition-shadow duration-200"
          >
            <Image
              src="/shoes.jpg"
              alt="Modern Style"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Modern Style
            </h3>
            <p className="text-sm sm:text-base">
              Timeless designs that match every outfit and occasion.
            </p>
          </motion.div>

        </div>
      </motion.section>


      {/* ================= BEST SELLS SECTION ================= */}
      {/* ================= BEST SELLS SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-white/50">
        <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#5C4A3A]">
            Best Sellers
          </h2>
          <p className="text-sm sm:text-base text-[#6B5B4A]">
            Our most popular shoes loved by customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">

          {/* LOADING STATE */}
          {loading && (
            <p className="col-span-full text-center text-[#6B5B4A]">
              Loading best sellers...
            </p>
          )}

          {/* PRODUCTS */}
          {!loading && bestSells.length > 0 &&
            bestSells.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center group"
              >
                <Image
                  src={product.img || "/shoes.jpg"}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl group-hover:scale-105 transition"
                />

                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[#5C4A3A]">
                  {product.name}
                </h3>

                <p className="text-sm sm:text-base mb-2 text-[#7A6A58]">
                  {product.category}
                </p>

                <p className="text-base sm:text-lg font-bold text-[#8B7355] mb-4">
                  ${product.price}
                </p>

                <Link
                  href={`/detail/${product.id}`}
                  className="inline-block border-2 border-[#8B7355] text-[#8B7355] px-5 py-2.5 rounded-xl font-medium hover:bg-[#8B7355] hover:text-white transition text-sm"
                >
                  View Product
                </Link>
              </div>
            ))
          }

          {/* EMPTY STATE */}
          {!loading && bestSells.length === 0 && (
            <p className="col-span-full text-center text-[#6B5B4A]">
              No products available.
            </p>
          )}

        </div>
      </section>



      {/* ================= CATEGORY PREVIEW SECTION ================= */}
      {/* ================= CATEGORY PREVIEW SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-white/50">
        <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Explore Our Collection
          </h2>
          <p className="text-sm sm:text-base">
            Find the perfect pair that matches your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">

          {/* Men's Collection */}
          <Link
            href="/catalogue?filter=Men"
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center cursor-pointer block"
          >
            <Image
              src="/maleSection2.jpg"
              alt="Men's Collection"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Men's Collection
            </h3>
            <p className="text-sm sm:text-base">
              Stylish shoes designed for comfort and daily life.
            </p>
          </Link>

          {/* Women's Collection */}
          <Link
            href="/catalogue?filter=Women"
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center cursor-pointer block"
          >
            <Image
              src="/femaleSection2.jpg"
              alt="Women's Collection"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Women's Collection
            </h3>
            <p className="text-sm sm:text-base">
              Elegant shoes for style and all-day comfort.
            </p>
          </Link>

          {/* Kids Collection */}
          <Link
            href="/catalogue?filter=Kids"
            className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center cursor-pointer block"
          >
            <Image
              src="/kidSection.jpg"
              alt="Kids Collection"
              width={250}
              height={200}
              className="mx-auto mb-4 sm:mb-6 object-contain rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Kids Collection
            </h3>
            <p className="text-sm sm:text-base">
              Fun, comfortable shoes for kids of all ages.
            </p>
          </Link>

        </div>
      </section>



      {/* ================= FINAL CTA ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto bg-[#8B7355] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6">
            Find Your Perfect Pair
          </h2>

          <p className="mb-6 sm:mb-8 text-sm sm:text-base">
            Explore our latest arrivals and step into something extraordinary.
          </p>

          <Link
            href="/catalogue"
            className="bg-white text-[#6B5B4A] px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Browse Shoes
          </Link>
        </div>
      </section>


      {/* ================= ABOUT & CONTACT SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Image */}
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <Image
              src="/home3.jpg"
              alt="About Our Brand"
              width={450}
              height={450}
              className="object-cover rounded-3xl shadow-lg"
              priority
            />
          </div>

          {/* Right: Text + Buttons */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
              More Than Just Shoes
            </h2>

            <p className="mb-10 text-sm sm:text-base text-center md:text-left">
              Learn about our story, mission, and how we’re redefining comfort and style.
              Have questions? We’re always here to guide you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
              <Link
                href="/aboutus"
                className="bg-[#8B7355] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:opacity-90 transition text-center"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="border border-[#8B7355] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-[#8B7355] hover:text-white transition text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Page;
