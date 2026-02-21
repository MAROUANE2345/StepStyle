"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
  if (
    email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    // ✅ SET AUTH COOKIE (this is what middleware reads)
    document.cookie = "adminToken=true; path=/";

    // ✅ Redirect to protected page
    router.push("/admin/adminmanage");
  } else {
    alert("Invalid credentials");
  }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-4 py-8 sm:py-12">
            <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl border border-[#E8DCC8] shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#5C4A3A] mb-6 sm:mb-8">
                    Welcome Admin
                </h1>
                <div className="mb-4 sm:mb-6">
                    <label className="block mb-2 font-medium text-sm sm:text-base text-[#5C4A3A]">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none text-[#5C4A3A] focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                    />
                </div>
                <div className="mb-6 sm:mb-8">
                    <label className="block mb-2 font-medium text-sm sm:text-base text-[#5C4A3A]">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full h-11 sm:h-12 px-4 border border-[#E8DCC8] rounded-xl outline-none text-[#5C4A3A] focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
                    />
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
