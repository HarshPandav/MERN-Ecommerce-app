import React from "react";

const About = () => {
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 to-sky-400 px-5 py-24 text-center text-white">
        <h1 className="mb-5 text-4xl font-bold md:text-6xl">
          About FlyCart
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-blue-50">
          Shop smarter. Shop faster. Experience quality products with{" "}
          <span className="font-bold text-white">FlyCart</span>.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Who We Are
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
          FlyCart is a modern eCommerce platform designed to make online
          shopping simple, fast, and reliable. We bring quality products,
          affordable prices, and a smooth shopping experience directly to
          our customers.
        </p>
      </section>

      <section className="bg-blue-50 px-5 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-600">
          Our Mission
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Our mission is to build a trusted online shopping platform where
          customers can discover quality products, enjoy affordable prices,
          and shop with confidence.
        </p>
      </section>
    </div>
  );
};

export default About;