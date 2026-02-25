"use client";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeletePopUp from "./deletePopUp";
import EditPopUp from "./editProduct";

const AdminTable = ({ products }) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState("");

  // ✅ LOCAL STATE COPY (THIS FIXES YOUR PROBLEM)
  const [localProducts, setLocalProducts] = useState(products);

  // sync if parent updates
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const stopEditPopUp = () => setEditPopUp(false);
  const stopPopUp = () => setDeletePopUp(false);

  const handleDeleteOnclick = (id) => {
    setDeletePopUp(true);
    setId(id);
  };

  const handleEditOnClick = (product) => {
    setEditPopUp(true);
    setSelectedProduct(product);
  };

  // ✅ REMOVE PRODUCT INSTANTLY FROM UI
  const handleDeleteSuccess = (deletedId) => {
    setLocalProducts(prev =>
      prev.filter(product => product.id !== deletedId)
    );
    setDeletePopUp(false);
  };

  // ✅ UPDATE PRODUCT INSTANTLY IN UI
  const handleEditSuccess = (updatedProduct) => {
    setLocalProducts(prev =>
      prev.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditPopUp(false);
  };

  const sizeStr = (product) =>
    Array.isArray(product.size)
      ? product.size.join(", ")
      : product.size || "—";

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {localProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#E8DCC8] rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={product.img}
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover bg-[#FAF7F2]"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-[#5C4A3A]">
                  {product.name}
                </h3>

                <p className="text-[#8B7355] font-medium">
                  ${product.price}
                </p>

                <div className="text-xs text-[#7A6A58] mt-2">
                  {product.sexe} · {sizeStr(product)} · {product.category}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <button
                onClick={() => handleEditOnClick(product)}
                className="bg-[#8B7355] text-white px-4 py-2 rounded-lg hover:bg-[#7A6349]"
              >
                <FaEdit size={14} /> 
              </button>

              <button
                onClick={() => handleDeleteOnclick(product.id)}
                className="bg-red-500 text-white px-4 py-2 h-[50px] rounded-lg hover:bg-red-600"
              >
                <FaTrash size={14} /> 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block border rounded-xl overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-[#F7F1E8]">
            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Sexe</th>
              <th>Size</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {localProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-[#FAF7F2]">
                <td className="p-4">
                  <img
                    src={product.img}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                <td>{product.name}</td>

                <td>${product.price}</td>

                <td>{product.sexe}</td>

                <td>{sizeStr(product)}</td>

                <td>{product.category}</td>

                <td>
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => handleEditOnClick(product)}
                      className="bg-[#8B7355] p-2 rounded-lg hover:bg-[#7A6349]"
                    >
                      <FaEdit className="text-white" /> 
                    </button>

                    <button
                      onClick={() => handleDeleteOnclick(product.id)}
                      className="bg-red-500 p-2 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="text-white" /> 
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* POPUPS */}
      {deletePopUp && (
        <DeletePopUp
          id={id}
          onClose={stopPopUp}
          onDeleteSuccess={handleDeleteSuccess} // ✅ IMPORTANT
        />
      )}

      {editPopUp && (
        <EditPopUp
          product={selectedProduct}
          onClose={stopEditPopUp}
          onEditSuccess={handleEditSuccess} // ✅ IMPORTANT
        />
      )}
    </>
  );
};

export default AdminTable;