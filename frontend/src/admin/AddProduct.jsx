import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please upload image");
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product listing created successfully");
        navigate("/shop");
      } else {
        alert(responseData.message || "Error while adding product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="mx-auto min-h-[75vh] max-w-6xl px-5 py-12">

    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          FlyCart Admin
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Add New Product
        </h1>

        <p className="mt-3 max-w-xl text-slate-500">
          Add product details, upload an image and publish it to your FlyCart
          store.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/admin/products")}
        className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
      >
        ← Manage Products
      </button>
    </div>

    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
    >

      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-sky-50 px-6 py-7 md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg shadow-blue-200">
            🛍️
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Product Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the details of your new product.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_320px]">

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short product description..."
              rows="5"
              required
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-blue-600">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Available stock"
                min="0"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Electronics, Fashion, Footwear..."
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Product Image
          </label>

          <label className="group relative flex min-h-[310px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Product Preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md">
                  📷
                </div>

                <p className="mt-5 font-bold text-slate-900">
                  Upload product image
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Click here to choose an image for your product.
                </p>

                <span className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  Choose Image
                </span>
              </>
            )}

            {image && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/50 group-hover:opacity-100">
                <span className="rounded-xl bg-white px-5 py-2 font-semibold text-slate-900">
                  Change Image
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>

          {image && (
            <p className="mt-3 truncate text-sm font-medium text-blue-600">
              ✓ {image.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-end md:px-10">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="rounded-xl px-6 py-3 font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Product..." : "Publish Product"}
        </button>
      </div>
    </form>
  </div>
);
};

export default AddProduct;