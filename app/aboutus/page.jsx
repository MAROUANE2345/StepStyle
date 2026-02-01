import React from "react";
import { Footprints, Handshake, Award } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-24">
        {/* HERO */}
        <section className="text-center">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-[#5C4A3A]">
            About Us
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#7A6A58]">
            Shoes are something you live in. You walk, work, travel, and make
            memories in them. That’s why we focus on creating footwear that
            feels right from the first step — and keeps up with you every day.
          </p>
        </section>

        {/* STORY */}
        <section className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5C4A3A]">
              How It Started
            </h2>
            <p className="text-[#7A6A58] leading-relaxed">
              This store started with a simple frustration: shoes that look
              good often aren’t comfortable, and comfortable shoes often don’t
              look good. We knew there had to be a better balance.
            </p>
            <p className="text-[#7A6A58] leading-relaxed">
              So we built a place where style, comfort, and quality come
              together. No shortcuts. No unnecessary markups. Just shoes you
              actually want to wear every day.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F6EFE6] p-10 shadow-sm">
            <p className="text-lg font-medium text-[#5C4A3A]">
              “If we wouldn’t wear them ourselves, we wouldn’t sell them.”
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section>
          <h2 className="mb-12 text-center text-3xl font-bold text-[#5C4A3A]">
            What Matters to Us
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Footprints className="mb-4 text-[#8B7355]" size={28} />
              <h3 className="mb-3 text-xl font-semibold text-[#5C4A3A]">
                Comfort First
              </h3>
              <p className="text-sm leading-relaxed text-[#7A6A58]">
                Every pair is chosen with real-life wear in mind — long days,
                busy streets, and hours on your feet. Comfort isn’t optional.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Award className="mb-4 text-[#8B7355]" size={28} />
              <h3 className="mb-3 text-xl font-semibold text-[#5C4A3A]">
                Quality You Can Feel
              </h3>
              <p className="text-sm leading-relaxed text-[#7A6A58]">
                We focus on durable materials, solid construction, and details
                that last — because good shoes should hold up, not wear out
                after a few weeks.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Handshake className="mb-4 text-[#8B7355]" size={28} />
              <h3 className="mb-3 text-xl font-semibold text-[#5C4A3A]">
                Honest Pricing
              </h3>
              <p className="text-sm leading-relaxed text-[#7A6A58]">
                We keep things simple and transparent. You pay for quality and
                comfort — not inflated branding or unnecessary extras.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="rounded-2xl bg-[#EFE4D2] p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#5C4A3A]">
            Made for Everyday Life
          </h2>
          <p className="mx-auto max-w-2xl text-[#7A6A58] leading-relaxed">
            Whether you’re heading to work, going out with friends, or walking
            all day, our goal is simple: shoes that fit your life — and feel
            good doing it.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Page;
