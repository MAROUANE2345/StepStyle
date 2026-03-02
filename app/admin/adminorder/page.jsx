"use client";

import AdminOrderCard from "@/components/AdminOrderCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "@/lib/reducer/orderSlice";
const Page = () => {
  useEffect(() => {
    dispatch(fetchOrders())
  }, []);
  const orders = useSelector((state) => state.order.orders)
  const dispatch = useDispatch();


  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#5C4A3A]">
          Orders Management
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7355] mt-1">
          View and manage all customer orders
        </p>
      </div>
      {orders.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <AdminOrderCard
              key={order.id}
              name={order.name}
              email={order.email}
              phone={order.phone}
              city={order.city}
              img={order.img}
              address={order.address}
              orderInfo={order.orderInfo}
              totalPrice={order.totalPrice}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[200px] sm:h-[300px] text-[#8B7355] text-center">
          Loading Orders...
        </div>
      )}
    </div>
  );
};

export default Page;
