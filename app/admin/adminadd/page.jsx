'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../lib/reducer/productSlice';
import { toast } from 'sonner';

const Page = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.data.loading);

    const [data, setData] = useState({
        name: '',
        category: '',
        sexe: '',
        price: '',
        size: '',
        description: '',
        img: '',
    });

    const [errors, setErrors] = useState({});

    const UploadToCloudinary = async (file) => {
        if (!file) { toast.error("No file selected"); return null; }
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "file_rouge");
            formData.append("folder", "shoes");
            const response = await fetch("https://api.cloudinary.com/v1_1/dtpjdj7m4/image/upload", { method: "POST", body: formData });
            if (!response.ok) { toast.error("Cloudinary upload failed"); return null; }
            const data = await response.json();
            return data.secure_url || null;
        } catch { toast.error("Unexpected error during upload"); return null; }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await UploadToCloudinary(file);
        if (!url) return toast.error("Image upload failed");
        setData({ ...data, img: url });
        toast.success("Image uploaded successfully");
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = () => {
        let canSend = true;
        const newErrors = {};

        if (!data.name.trim()) { newErrors.name = "You have to enter a product name"; canSend = false; }
        if (!data.category) { newErrors.category = "You have to select a category"; canSend = false; }
        const sizeArray = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
        if (sizeArray.length === 0) { newErrors.size = "You have to enter at least one size"; canSend = false; }
        else if (!sizeArray.every(s => !isNaN(s))) { newErrors.size = "Sizes must be numbers separated by commas"; canSend = false; }
        if (!data.sexe) { newErrors.sexe = "You have to select a gender"; canSend = false; }
        if (!data.price || parseFloat(data.price) <= 0) { newErrors.price = "Price must be greater than 0"; canSend = false; }
        if (!data.description.trim()) { newErrors.description = "You have to enter a description"; canSend = false; }
        if (!data.img) { newErrors.img = "You have to upload an image"; canSend = false; }

        setErrors(newErrors);
        if (!canSend) return;

        const productData = { ...data, size: sizeArray, price: parseFloat(data.price) };
        dispatch(addProduct(productData))
            .unwrap()
            .then(() => {
                toast.success("Product added successfully");
                setData({ name: '', category: '', sexe: '', price: '', size: '', description: '', img: '', stock: '' });
                setErrors({});
            })
            .catch((err) => toast.error("Failed to add product: " + err));
    };

    const renderError = (field) => errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6">
            <div className="w-full max-w-4xl bg-white rounded-xl p-6 sm:p-8 shadow-md">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#5C4A3A]">Add New Product</h1>

                <div className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Classic Leather Sneakers"
                            className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800 placeholder-gray-400"
                            style={{ borderColor: '#E8DCC8' }}
                        />
                        {renderError('name')}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Comfortable everyday sneakers..."
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800 placeholder-gray-400 resize-none"
                            style={{ borderColor: '#E8DCC8' }}
                        />
                        {renderError('description')}
                    </div>

                    {/* Price & Size */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800 placeholder-gray-400"
                                style={{ borderColor: '#E8DCC8' }}
                            />
                            {renderError('price')}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Size (comma-separated)</label>
                            <input
                                type="text"
                                name="size"
                                value={data.size}
                                onChange={handleChange}
                                placeholder="38, 39, 40"
                                className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800 placeholder-gray-400"
                                style={{ borderColor: '#E8DCC8' }}
                            />
                            {renderError('size')}
                        </div>
                    </div>

                    {/* Category & Gender */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={data.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800"
                                style={{ borderColor: '#E8DCC8' }}
                            >
                                <option value="">Select category</option>
                                <option value="sneakers">Sneakers</option>
                                <option value="boots">Boots</option>
                                <option value="sandals">Sandals</option>
                                <option value="kids">Kids</option>
                            </select>
                            {renderError('category')}
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="sexe"
                                value={data.sexe}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border outline-none text-gray-800"
                                style={{ borderColor: '#E8DCC8' }}
                            >
                                <option value="">Select Sexe</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                            </select>
                            {renderError('sexe')}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <input
                                type="text"
                                value={data.img}
                                readOnly
                                placeholder="https://images.unsplash.com/..."
                                className="flex-1 px-4 py-3 rounded-lg border text-gray-600 placeholder-gray-400"
                                style={{ borderColor: '#E8DCC8' }}
                            />
                            <input
                                type="file"
                                id="image-upload"
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <label
                                htmlFor="image-upload"
                                className="px-6 py-3 bg-[#8B7355] text-white font-medium rounded-lg cursor-pointer text-center w-full sm:w-auto"
                            >
                                Upload Image
                            </label>
                        </div>
                        {renderError('img')}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full md:w-auto px-10 py-4 text-white font-semibold rounded-lg"
                            style={{ backgroundColor: loading ? '#BFA78A' : '#8B7355' }}
                        >
                            {loading ? 'Adding...' : 'Add Product'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;
