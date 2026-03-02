"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
 // Si tu as un bouton UI, sinon juste <button>
import { toast } from "sonner"; // Sonner notifications

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const signIn = () => {
    const newErrors = {};

    // Validation
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }

    // Si erreurs → setErrors et stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Vérification credentials
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // ✅ Set auth cookie
      document.cookie = "adminToken=true; path=/";

      // ✅ Redirect
      router.push("/admin/adminmanage");
    } else {
      // Sonner notification en rouge
      toast.error("Invalid info, please check your credentials!", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0E8] px-4 py-8 sm:py-12 relative">
      
      {/* BUTTON HOME TOP LEFT */}
      <button
        onClick={() => router.push("/")}
        className="absolute cursor-pointer top-4 left-4 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6349] transition"
      >
        Home
      </button>

      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl border border-[#E8DCC8] shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#5C4A3A] mb-6 sm:mb-8">
          Welcome Admin
        </h1>

        {/* Email */}
        <div className="mb-4 sm:mb-6">
          <label className="block mb-2 font-medium text-sm sm:text-base text-[#5C4A3A]">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className={`w-full h-11 sm:h-12 px-4 border rounded-xl outline-none text-[#5C4A3A] focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] ${
              errors.email ? "border-red-500" : "border-[#E8DCC8]"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-6 sm:mb-8">
          <label className="block mb-2 font-medium text-sm sm:text-base text-[#5C4A3A]">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className={`w-full h-11 sm:h-12 px-4 border rounded-xl outline-none text-[#5C4A3A] focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] ${
              errors.password ? "border-red-500" : "border-[#E8DCC8]"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="button"
          onClick={signIn}
          className="w-full h-12 bg-[#8B7355] text-white font-bold rounded-xl cursor-pointer hover:bg-[#7A6349] transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Page;