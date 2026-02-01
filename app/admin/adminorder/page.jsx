"use client";

import AdminOrderCard from "@/components/AdminOrderCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get("https://69733ee0b5f46f8b58269eb8.mockapi.io/order")
      .then((res) => setOrder(res.data));
  });

  return (
    <div className="min-h-screen bg-[#ffffff] px-10 py-8">
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[#5C4A3A]">
          Orders Management
        </h1>
        <p className="text-sm text-[#8B7355] mt-1">
          View and manage all customer orders
        </p>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-6">
        {order.map((index) => {
          return (
            <AdminOrderCard
              key={index.id}
              name={index.name}
              email={index.email}
              phone={index.phone}
              city={index.city}
              address={index.address}
              orderInfo={index.orderInfo}
              totalPrice={index.totalPrice}
            />
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {order.length === 0 && (
        <div className="flex items-center justify-center h-[300px] text-[#8B7355]">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default Page;
