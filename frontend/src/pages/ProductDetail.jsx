import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert("Successfully added to your cart!");
  };

  if (loading) {
    return (
      <div className="py-32 text-center font-semibold text-blue-600">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center font-semibold text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-6 text-sm text-slate-500">
        <Link to="/" className="font-medium text-blue-600">
          Home
        </Link>

        <span> / </span>

        <Link to="/shop" className="font-medium text-blue-600">
          Shop
        </Link>

        <span> / {product.category} / </span>

        <span className="text-slate-900">{product.name}</span>
      </div>

      <div className="grid gap-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full max-h-[550px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            {product.name}
          </h1>

          <p className="my-6 text-4xl font-bold text-blue-600">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              Product Description
            </h3>

            <p className="leading-8 text-slate-500">
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add to Shopping Cart
          </button>

          <p
            className={`mt-5 font-semibold ${
              product.stock > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : "● Temporarily Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;