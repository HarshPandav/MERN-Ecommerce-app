import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        
        <div>
          <Link to="/" className="text-2xl font-bold text-slate-900">
            Fly<span className="text-blue-600">Cart</span>
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            Shop smarter. Shop faster.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link
            to="/about"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            About Us
          </Link>

          <Link
            to="/return"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            Disclaimer
          </Link>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FlyCart. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;