import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <section className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-24 text-center text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">
            Fly Into Better Shopping ✈️
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-blue-50 md:text-xl">
            Discover quality products, unbeatable deals and a faster shopping
            experience with FlyCart.
          </p>

          <button onClick={() => navigate('/shop')} className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            Shop Now →
          </button>
        </div>

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Products
          </h2>

          <p className="mt-2 text-slate-500">
            Discover products selected just for you.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center font-medium text-blue-600">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;