"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendEmailContact } from "@/lib/reducer/emailSendSlice";

const Page = () => {
  const dispatch = useDispatch();
  const [contactObject, setContactObject] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <h1 className="mb-12 sm:mb-16 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#5C4A3A] text-center sm:text-left">
          Contact Us
        </h1>

        {/* Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT – FORM */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg w-full">
            <h2 className="mb-6 sm:mb-8 text-lg sm:text-xl font-semibold text-[#5C4A3A] text-center sm:text-left">
              Send us a Message
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm sm:text-base font-medium text-[#6B5B4A]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-[#E6D9C8] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none transition focus:border-[#8B7355] focus:ring-2 focus:ring-[#E6D9C8]"
                  onChange={(e) =>
                    setContactObject({ ...contactObject, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm sm:text-base font-medium text-[#6B5B4A]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setContactObject({ ...contactObject, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6D9C8] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none transition focus:border-[#8B7355] focus:ring-2 focus:ring-[#E6D9C8]"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1 block text-sm sm:text-base font-medium text-[#6B5B4A]">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  onChange={(e) =>
                    setContactObject({ ...contactObject, subject: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6D9C8] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none transition focus:border-[#8B7355] focus:ring-2 focus:ring-[#E6D9C8]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm sm:text-base font-medium text-[#6B5B4A]">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  onChange={(e) =>
                    setContactObject({ ...contactObject, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-[#E6D9C8] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none transition focus:border-[#8B7355] focus:ring-2 focus:ring-[#E6D9C8]"
                />
              </div>

              <button
                onClick={() => dispatch(sendEmailContact(contactObject))}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B7355] py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-[#7A6349] active:scale-[0.98]"
              >
                <Send size={16} />
                Send Message
              </button>
            </div>
          </div>

          {/* RIGHT – INFO */}
          <div className="space-y-4 sm:space-y-5">
            {[
              {
                icon: <Mail size={18} />,
                title: "Email",
                lines: ["support@stepstyle.com", "We’ll respond within 24 hours"],
              },
              {
                icon: <Phone size={18} />,
                title: "Phone",
                lines: ["+1 (555) 123-4567", "Mon–Fri, 8am–6pm EST"],
              },
              {
                icon: <MapPin size={18} />,
                title: "Address",
                lines: ["123 Fashion Street", "New York, NY 10001"],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-xl bg-[#F6EFE6] p-4 sm:p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="text-[#8B7355]">{card.icon}</div>
                <div>
                  <p className="font-semibold text-[#5C4A3A]">{card.title}</p>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-sm sm:text-base text-[#7A6A58]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-xl bg-[#EFE4D2] p-4 sm:p-6 shadow-sm">
              <Clock size={18} className="text-[#8B7355]" />
              <div>
                <p className="font-semibold text-[#5C4A3A]">Business Hours</p>
                <p className="text-sm sm:text-base text-[#7A6A58]">
                  Mon–Fri: 9:00 AM – 8:00 PM
                </p>
                <p className="text-sm sm:text-base text-[#7A6A58]">
                  Saturday: 10:00 AM – 6:00 PM
                </p>
                <p className="text-sm sm:text-base text-[#7A6A58]">
                  Sunday: 11:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
