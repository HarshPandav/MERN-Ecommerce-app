import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="border-b border-slate-200 pb-5 text-3xl font-bold text-slate-900">
          Return & Refund Policy
        </h2>

        <div className="mt-6 space-y-6 leading-8 text-slate-600">
          <p>
            At FlyCart, we stand behind the quality of our products. Eligible
            purchases may be returned within 30 days of receiving your order.
          </p>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              1. Eligibility for Returns
            </h4>

            <p>
              Items must be unused, in their original condition and maintained
              within their original packaging.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              2. Refund Processing
            </h4>

            <p>
              Approved refunds will be processed to the original payment
              method within 5-7 business days.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              3. Exempted Goods
            </h4>

            <p>
              Certain categories including perishable, digital, customized or
              damaged products may not qualify for returns.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xl font-semibold text-blue-600">
              4. Shipping Costs
            </h4>

            <p>
              Customers may be responsible for return shipping costs depending
              on the reason for the return.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;