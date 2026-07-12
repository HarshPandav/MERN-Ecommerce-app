import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage your selected products.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </h2>

          <p className="mt-3 text-slate-500">
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          <div className="flex flex-col gap-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-32"
                />

                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xl font-bold text-blue-600">
                    ₹{item.price.toFixed(2)}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-5">

                    <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty - 1)
                        }
                        className="px-4 py-2 text-lg font-semibold text-slate-600 transition hover:bg-slate-100"
                      >
                        −
                      </button>

                      <span className="border-x border-slate-200 px-4 py-2 font-semibold text-slate-900">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty + 1)
                        }
                        className="px-4 py-2 text-lg font-semibold text-slate-600 transition hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="font-semibold text-red-500 transition hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Subtotal</p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="my-6 border-t border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Products</span>

                <span className="font-semibold text-slate-900">
                  {cartItems.length}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-slate-500">Shipping</span>

                <span className="font-semibold text-emerald-600">
                  Free
                </span>
              </div>

              <div className="my-6 border-t border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  Total
                </span>

                <span className="text-3xl font-bold text-blue-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
              >
                Proceed to Checkout →
              </button>

              <Link
                to="/shop"
                className="mt-4 block text-center font-medium text-blue-600 transition hover:text-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;