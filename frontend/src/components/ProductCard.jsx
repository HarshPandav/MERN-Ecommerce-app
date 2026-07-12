import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      <Link
        to={`/product/${product._id}`}
        className="overflow-hidden bg-slate-100"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate text-lg font-semibold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 text-2xl font-bold text-blue-600">
          ₹{product.price.toFixed(2)}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          View Details
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;