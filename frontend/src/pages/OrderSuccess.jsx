import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <span className="text-4xl text-emerald-600">✓</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
          Payment Successful!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-slate-500">
          Thank you for your order. We have securely received your payment and
          will process your shipment shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-blue-50 p-5">
          <p className="font-medium text-slate-600">
            Your FlyCart order has been placed successfully.
          </p>
        </div>

        <Link
          to="/shop"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
        >
          Continue Shopping →
        </Link>

      </div>
    </div>
  );
};

export default OrderSuccess;