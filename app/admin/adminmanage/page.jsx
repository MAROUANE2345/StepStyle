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
 
    // if (loading) {
    //     return (
    //         <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12">
    //             {/* Heading */}
    //             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4A3A] mb-8 sm:mb-12 text-center">
    //                 Waiting for the products
    //             </h1>

    //             {/* Spinner */}
    //             <div className="flex flex-col items-center justify-center">
    //                 <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#8B7355] border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
    //                 <p className="text-[#5C4A3A] text-base sm:text-lg font-medium text-center">
    //                     Loading products...
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }

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
