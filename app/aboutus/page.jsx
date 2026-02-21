import React from "react";
import { Footprints, Handshake, Award } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center px-2 sm:px-0 mb-12 sm:mb-16">
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#5C4A3A]">
            About Us
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-[#7A6A58]">
            Shoes are part of your everyday life. You walk, work, travel, and make memories in them. We create footwear that feels right from the first step — and keeps up with you every day.
          </p>
        </section>

        {/* STORY */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center mb-12 sm:mb-16">
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#5C4A3A]">
              Our Story
            </h2>
            <p className="text-[#7A6A58] leading-relaxed text-base sm:text-lg">
              We started with a simple idea: shoes should be stylish and comfortable at the same time. No compromises. No unnecessary extras.
            </p>
            <p className="text-[#7A6A58] leading-relaxed text-base sm:text-lg">
              Our goal is to create footwear that you actually want to wear every day — reliable, high-quality, and designed to last.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F6EFE6] p-8 sm:p-12 shadow-md flex items-center justify-center">
            <p className="text-lg sm:text-xl font-medium text-[#5C4A3A] text-center italic">
              “If we wouldn’t wear them ourselves, we wouldn’t sell them.”
            </p>
          </div>
        </section>

        {/* NUMBERS / HIGHLIGHTS */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-[#5C4A3A] mb-1">10K+</p>
              <p className="text-xs uppercase tracking-wide text-[#8B7355]">
                Pairs sold
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-[#5C4A3A] mb-1">4.8</p>
              <p className="text-xs uppercase tracking-wide text-[#8B7355]">
                Average rating
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-[#5C4A3A] mb-1">30+</p>
              <p className="text-xs uppercase tracking-wide text-[#8B7355]">
                Cities delivered
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="px-2 sm:px-0 mb-12 sm:mb-16">
          <h2 className="mb-10 sm:mb-12 text-center text-3xl sm:text-4xl font-bold text-[#5C4A3A]">
            What We Stand For
          </h2>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <Footprints className="mb-4 sm:mb-5 text-[#8B7355]" size={32} />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-[#5C4A3A]">
                Comfort First
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#7A6A58]">
                Shoes designed for long days, busy streets, and hours on your feet. Comfort isn’t optional.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <Award className="mb-4 sm:mb-5 text-[#8B7355]" size={32} />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-[#5C4A3A]">
                Quality You Can Feel
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#7A6A58]">
                We focus on durable materials, solid construction, and details that last — because good shoes should hold up, not wear out.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <Handshake className="mb-4 sm:mb-5 text-[#8B7355]" size={32} />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-[#5C4A3A]">
                Honest Pricing
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#7A6A58]">
                Simple and transparent pricing. You pay for quality and comfort — not branding or unnecessary extras.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="rounded-2xl bg-[#EFE4D2] p-8 sm:p-12 md:p-16 text-center mb-10 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-[#5C4A3A]">
            Made for Everyday Life
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-[#7A6A58] leading-relaxed">
            Whether you’re heading to work, going out with friends, or walking all day, our goal is simple: shoes that fit your life — and feel good doing it.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Page;
