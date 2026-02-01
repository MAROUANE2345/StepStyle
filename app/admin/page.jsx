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
        <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
            {/* Login Card */}
            <div
                className="w-[420px] bg-white p-8 rounded-[16px] border -translate-y-13"
                style={{ borderColor: "#E8DCC8" }}
            >
                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-[#5C4A3A] mb-8">
                    Welcome Admin
                </h1>

                {/* Email */}
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-[#5C4A3A]">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-12 px-4 border rounded-md outline-none text-[#5C4A3A]"
                        style={{ borderColor: "#E8DCC8", borderRadius: "8px" }}
                    />
                </div>

                {/* Password */}
                <div className="mb-8">
                    <label className="block mb-2 font-medium text-[#5C4A3A]">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full h-12 px-4 border rounded-md outline-none text-[#5C4A3A]"
                        style={{ borderColor: "#E8DCC8", borderRadius: "8px" }}
                    />
                </div>

                {/* Button */}
                <button
                    onClick={signIn}
                    className="w-full h-12 bg-[#8B7355] text-white font-bold rounded-md 
             cursor-pointer hover:opacity-90  
             transition-all duration-200"
                >
                    Sign In   
                </button>

            </div>
        </div>
    );
};

export default Page;
