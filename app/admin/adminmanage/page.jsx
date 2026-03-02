'use client'
import AdminTable from '@/components/AdminTable';
import { fetchProducts } from '@/lib/reducer/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    const products = useSelector(state => state.data.products);





    return (
        <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#5C4A3A] text-center sm:text-left px-2">
                Admin Manage
            </h1>
            <div className="w-full">
                <AdminTable products={products} />
            </div>
        </div>
    );
};

export default Page;
