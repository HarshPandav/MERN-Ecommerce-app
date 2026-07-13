import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }

          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Shipped") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-amber-100 text-amber-700";
  };

  if (!user) return null;

  return (
    <div className="mx-auto min-h-[75vh] max-w-6xl px-5 py-12">
      
      {/* Profile Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        
        {/* Profile Header */}
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              My Account
            </span>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              My Profile
            </h1>

            <div className="mt-6 space-y-3">
              <p className="text-lg text-slate-500">
                <span className="font-semibold text-slate-900">
                  Name:
                </span>{" "}
                {user.name}
              </p>

              <p className="text-lg text-slate-500">
                <span className="font-semibold text-slate-900">
                  Email:
                </span>{" "}
                {user.email}
              </p>
            </div>

            <span className="mt-5 inline-block rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Account Type: {user.role.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        {/* Order History */}
        <div className="mt-10">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Order History
            </h2>

            <p className="mt-2 text-slate-500">
              View and track your previous FlyCart orders.
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 font-medium text-slate-500">
                Fetching your orders...
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-16 text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                No orders yet
              </h3>

              <p className="mt-3 text-slate-500">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
              >
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between md:p-6"
                >
                  <div>
                    <p className="text-sm text-slate-500">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-900">
                      {order._id}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                      <div>
                        <p className="text-sm text-slate-500">
                          Placed On
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Total
                        </p>

                        <p className="mt-1 text-lg font-bold text-blue-600">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;