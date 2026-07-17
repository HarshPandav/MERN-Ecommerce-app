import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart, User, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="FlyCart"
            className="h-10 w-10 rounded-xl object-cover shadow-md"
          />

          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Fly<span className="text-blue-600">Cart</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">

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
              className="flex items-center gap-1 font-medium text-slate-600 transition hover:text-blue-600"
            >
              Cart

              {cartItems.length > 0 && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
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
                  className="font-medium text-slate-600 transition hover:text-blue-600"
                >
                  Hi, {user.name}
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? (
            <X className="h-7 w-7 text-slate-700" />
          ) : (
            <Menu className="h-7 w-7 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-125" : "max-h-0"
        }`}
      >
        <div className="space-y-2 border-t border-slate-200 bg-white px-5 py-5">

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            🛍
            <span>Shop</span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={20} />
              Cart
            </div>

            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <User size={20} />
                {user.name}
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <LayoutDashboard size={20} />
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;