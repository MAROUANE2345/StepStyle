"use client";
import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeletePopUp from "./deletePopUp";
import EditPopUp from "./editProduct";

const AdminTable = ({ products }) => {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState("");

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

  const sizeStr = (product) =>
    Array.isArray(product.size) ? product.size.join(", ") : product.size || "—";

  return (
    <>
      {/* Mobile/Tablet: card list — no horizontal scroll */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#E8DCC8] rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={product.img}
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0 bg-[#FAF7F2]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#5C4A3A] truncate">
                  {product.name}
                </h3>
                <p className="text-[#8B7355] font-medium mt-0.5">
                  ${product.price}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-[#7A6A58]">
                  <span>{product.sexe}</span>
                  <span>·</span>
                  <span>{sizeStr(product)}</span>
                  <span>·</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#E8DCC8]">
              <button
                type="button"
                onClick={() => handleEditOnClick(product)}
                className="flex items-center gap-2 rounded-lg bg-[#8B7355] px-4 py-2.5 text-white text-sm font-medium hover:bg-[#7A6349] transition"
                title="Edit"
              >
                <FaEdit size={14} /> Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteOnclick(product.id)}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-white text-sm font-medium hover:bg-red-600 transition"
                title="Delete"
              >
                <FaTrash size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block rounded-xl border border-[#E8DCC8] overflow-hidden bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F1E8] text-left text-sm text-[#5C4A3A]">
            <tr>
              <th className="p-3 md:p-4">Image</th>
              <th className="p-3 md:p-4">Name</th>
              <th className="p-3 md:p-4">Price</th>
              <th className="p-3 md:p-4">Sexe</th>
              <th className="p-3 md:p-4">Size</th>
              <th className="p-3 md:p-4">Category</th>
              <th className="p-3 md:p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-[#E8DCC8] hover:bg-[#FAF7F2] transition"
              >
                <td className="p-3 md:p-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover bg-[#FAF7F2]"
                  />
                </td>
                <td className="p-3 md:p-4 font-medium text-[#5C4A3A]">
                  {product.name}
                </td>
                <td className="p-3 md:p-4 text-[#8B7355] font-medium">
                  ${product.price}
                </td>
                <td className="p-3 md:p-4 text-[#7A6A58]">{product.sexe}</td>
                <td className="p-3 md:p-4 text-[#7A6A58]">
                  {sizeStr(product)}
                </td>
                <td className="p-3 md:p-4 text-[#7A6A58]">
                  {product.category}
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditOnClick(product)}
                      className="rounded-lg bg-[#8B7355] p-2.5 hover:bg-[#7A6349] transition"
                      title="Edit"
                    >
                      <FaEdit className="text-white" size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteOnclick(product.id)}
                      className="rounded-lg bg-red-500 p-2.5 hover:bg-red-600 transition"
                      title="Delete"
                    >
                      <FaTrash className="text-white" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletePopUp && <DeletePopUp id={id} onClose={stopPopUp} />}
      {editPopUp && (
        <EditPopUp onClose={stopEditPopUp} product={selectedProduct} />
      )}
    </>
  );
};

export default AdminTable;
