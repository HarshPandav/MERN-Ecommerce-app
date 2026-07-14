import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-4 md:flex-row md:justify-between">

        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="FlyCart"
            className="h-10 w-10 rounded-xl object-cover shadow-md"
          />

          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Fly<span className="text-blue-600">Cart</span>
          </span>
        </Link>

        <ul className="flex w-full items-center justify-center gap-4 md:w-auto md:gap-7">
          <li>
            <Link
              to="/shop"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="flex items-center font-medium text-slate-600 transition hover:text-blue-600"
            >
              Cart

              {cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="whitespace-nowrap font-medium text-slate-600 transition hover:text-blue-600"
                >
                  Hi, {user.name}
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="font-semibold text-blue-600"
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-500  transition hover:bg-red-600 hover:text-white md:px-5"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;