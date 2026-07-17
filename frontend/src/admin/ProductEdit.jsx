import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      });
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-[75vh] max-w-5xl px-5 py-12">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FlyCart Admin
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Edit Product
        </h1>

        <p className="mt-2 text-slate-500">
          Update product information and inventory details.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Product Details */}
          <div className="space-y-5">
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Change Product Image
            </label>

            <label className="flex h-80 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <p className="text-4xl">📷</p>

                  <p className="mt-4 font-semibold text-slate-900">
                    Change Product Image
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Optional
                  </p>
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
                Selected: {image.name}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;