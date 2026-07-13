import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-[75vh] max-w-7xl px-5 py-12">
      
      {/* Page Heading */}
      <div className="mb-10">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FlyCart Store
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Explore Our Products
        </h1>

        <p className="mt-3 text-slate-500">
          Discover quality products selected for a better shopping experience.
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="relative max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Product Count */}
      {!loading && (
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>
      )}

      {/* Products */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 font-medium text-slate-500">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            No products found
          </h2>

          <p className="mt-3 text-slate-500">
            We couldn't find any product matching "{search}".
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;