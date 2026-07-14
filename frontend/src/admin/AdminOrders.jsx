import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    }
  };

  const getStatusStyle = (status) => {
    if (status === "delivered") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "shipped") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FlyCart Admin
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Manage Orders
        </h1>

        <p className="mt-3 text-slate-500">
          View customer orders and update their delivery status.
        </p>
      </div>

      {/* Order Count */}
      <div className="mb-6">
        <span className="inline-flex rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Order ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition hover:bg-blue-50/50"
                >

                  <td className="whitespace-nowrap px-6 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 font-mono text-sm text-slate-600">
                      {order._id.substring(0, 8)}...
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold uppercase text-blue-600">
                        {order.userId?.name?.charAt(0) || "?"}
                      </div>

                      <span className="font-semibold text-slate-900">
                        {order.userId?.name || "Deleted User"}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <span className="font-bold text-blue-600">
                      ₹{Number(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold outline-none transition focus:ring-4 focus:ring-blue-100 ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="text-4xl">📦</div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No orders found
            </h3>

            <p className="mt-2 text-slate-500">
              Customer orders will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;