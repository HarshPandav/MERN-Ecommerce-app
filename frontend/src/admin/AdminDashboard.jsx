import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">

      <div className="mb-10 flex items-center gap-4">

        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            FlyCart Admin
          </span>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back,{" "}
            <span className="font-semibold text-slate-900">
              {user?.name}
            </span>
          </p>
        </div>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-500">
                Total Orders
              </h4>

              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📦
              </span>
            </div>

            <p className="mt-6 text-4xl font-bold text-blue-600">
              {stats.totalOrders}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-500">
                Total Products
              </h4>

              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-xl">
                🛍️
              </span>
            </div>

            <p className="mt-6 text-4xl font-bold text-blue-600">
              {stats.totalProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-500">
                Total Users
              </h4>

              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                👥
              </span>
            </div>

            <p className="mt-6 text-4xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-500">
                Total Revenue
              </h4>

              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                💰
              </span>
            </div>

            <p className="mt-6 text-4xl font-bold text-emerald-600">
              ₹{Number(stats.totalRevenue || 0).toFixed(2)}
            </p>
          </div>

        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 font-medium text-slate-500">
            Loading Informations...
          </p>
        </div>
      )}

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Administrative Controls
        </h2>

        <p className="mt-2 text-slate-500">
          Manage your FlyCart store and customer orders.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          
          <button
            onClick={() => navigate("/admin/add-product")}
            className="rounded-2xl bg-blue-600 p-6 text-left text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            <span className="text-3xl">＋</span>

            <h3 className="mt-5 text-lg font-semibold">
              Add Product
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              Add a new product to FlyCart.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-2xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
          >
            <span className="text-3xl">📦</span>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Manage Products
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Update or remove store products.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="rounded-2xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
          >
            <span className="text-3xl">🚚</span>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Manage Orders
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View and manage customer orders.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="rounded-2xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
          >
            <span className="text-3xl">👥</span>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Users Directory
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View registered FlyCart users.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;