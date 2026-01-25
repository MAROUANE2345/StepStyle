'use client'
import AdminTable from '@/components/AdminTable';
import { fetchProducts } from '@/lib/reducer/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
 
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-12">
            {/* Heading at the top */}
            <h1 className="text-[35px] font-bold text-[#5C4A3A] mb-12">
                Admin Manage
            </h1>

            {/* Centered loading spinner */}
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#8B7355] border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
                <p className="text-[#5C4A3A] text-lg font-medium">Loading products...</p>
            </div>
        </div>
    );
}


    return (
        <div className='flex flex-col gap-[50px] px-12'>
            <h1 className="text-[35px] font-bold text-[#5C4A3A]">
                Admin Manage
            </h1>

            <AdminTable products={products} />
        </div>
    );
};

export default Page;
