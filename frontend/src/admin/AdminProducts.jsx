import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [product, setProduct] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProduct(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("You want to delete product?")) {
      return;
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setProduct(
        product.filter((elem) => elem._id !== id)
      );
    }
  };

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">

      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            FlyCart Admin
          </span>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Manage Products
          </h1>

          <p className="mt-3 text-slate-500">
            View and manage all products available on FlyCart.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-6">
        <span className="inline-flex rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          Total Products: {product.length}
        </span>
      </div>

      {product.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center shadow-sm">
          <div className="text-5xl">🛍️</div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            No products found
          </h2>

          <p className="mt-2 text-slate-500">
            Add your first product to FlyCart.
          </p>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {product.map((item) => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>


              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {item.category}
                </span>

                <h2 className="mt-2 truncate text-lg font-bold text-slate-900">
                  {item.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{Number(item.price || 0).toFixed(2)}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.stock > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.stock > 0
                      ? `${item.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${item._id}`)
                    }
                    className="rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-600 transition hover:text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;