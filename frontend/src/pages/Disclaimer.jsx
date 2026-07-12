import React from "react";

const Disclaimer = () => {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="border-b border-slate-200 pb-5 text-3xl font-bold text-slate-900">
          Legal & Site Disclaimer
        </h2>

        <div className="mt-6 space-y-6 leading-8 text-slate-600">
          <p>
            The data, interfaces, and graphical components represented across
            the FlyCart domain strictly act uniquely as an educational
            development platform.
          </p>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              1. Accuracy of Materials
            </h4>

            <p>
              Product information may include dynamic, technical,
              typographical, or dummy photographic elements.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              2. Payment Processing Restrictions
            </h4>

            <p>
              No authentic financial variables are handled natively within
              this environment. Payment endpoints use testing-based networks.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              3. External Binding Links
            </h4>

            <p>
              FlyCart takes no responsibility for content or behaviour
              provided by external third-party services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;