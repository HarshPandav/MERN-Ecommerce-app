import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_TBN1kwDu30WRt0',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'FlyCart',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
  <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
        Checkout
      </h1>

      <p className="mt-2 text-slate-500">
        Complete your shipping details and place your order.
      </p>
    </div>

    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
      >
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Shipping Details
          </span>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Shipping Address
          </h2>

          <p className="mt-2 text-slate-500">
            Enter the address where you want your order delivered.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={address.fullName}
              onChange={(e) =>
                setAddress({
                  ...address,
                  fullName: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-slate-700">
              Street Address
            </label>

            <input
              type="text"
              placeholder="House number and street"
              required
              value={address.street}
              onChange={(e) =>
                setAddress({
                  ...address,
                  street: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              City
            </label>

            <input
              type="text"
              placeholder="City"
              required
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Postal Code
            </label>

            <input
              type="text"
              placeholder="Postal code"
              required
              value={address.postalCode}
              onChange={(e) =>
                setAddress({
                  ...address,
                  postalCode: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-slate-700">
              Country
            </label>

            <input
              type="text"
              placeholder="Country"
              required
              value={address.country}
              onChange={(e) =>
                setAddress({
                  ...address,
                  country: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-10 rounded-2xl bg-blue-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total to Pay
              </p>

              <h3 className="mt-1 text-3xl font-bold text-blue-600">
                ₹{totalPrice.toFixed(2)}
              </h3>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
            >
              Pay Now →
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}
export default Checkout;