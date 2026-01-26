"use client";
import React, { useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import DeletePopUp from "./deletePopUp";
import EditPopUp from "./editProduct";

const AdminTable = ({ products }) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const stopEditPopUp = () => {
    setEditPopUp(false);
  };
  const [id, setId] = useState("");

  const handleDeleteOnclick = (id) => {
    setDeletePopUp(true);
    setId(id);
  };
  const handleEditOnClick = (product) => {
    setEditPopUp(true);
    setSelectedProduct(product);
  }
  const stopPopUp = () => {
    setDeletePopUp(false);
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[#f0e6d8]">
      <table className="w-full border-collapse">
        <thead className="bg-[#f7f1e8] text-left text-sm text-[#6b4f3b]">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Sexe</th>
            <th className="p-4">Size</th>
            <th className="p-4">Category</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-[#f0e6d8] hover:bg-[#faf7f2]"
            >
              <td className="p-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
              </td>

              <td className="p-4 font-medium">{product.name}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">{product.sexe}</td>

              <td className="p-4">
                {Array.isArray(product.size)
                  ? product.size.join(", ")
                  : product.size}
              </td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    className="rounded-md bg-[#e6dccf] p-2 hover:bg-[#d6c8b6]"
                    title="Details"
                  >
                    <FaEye className="text-[#6b4f3b]" />
                  </button>

                  <button
                  onClick={()=>handleEditOnClick(product)}
                    className="rounded-md bg-[#8b6b4a] p-2 hover:bg-[#75573c]"
                    title="Edit"
                  >
                    <FaEdit className="text-white" />
                  </button>

                  <button
                    onClick={() => handleDeleteOnclick(product.id)}
                    className="rounded-md bg-red-500 p-2 hover:bg-red-600"
                    title="Delete"
                  >
                    <FaTrash className="text-white" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletePopUp && (
        <DeletePopUp id={id} onClose={stopPopUp} />
      )}

      {editPopUp && (
        <EditPopUp onClose={stopEditPopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default AdminTable;
