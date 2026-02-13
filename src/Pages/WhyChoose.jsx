import React from "react";

const WhyChoose = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Built for <span className="text-yellow-400">Real Strength</span>,  
            Trusted by <span className="text-yellow-400">Real Athletes</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            FITFORCE isn’t just another supplement store.  
            We focus on quality, authenticity, and performance — the things that actually matter.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          <div className="border-l-4 border-yellow-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Authentic Supplements Only
            </h3>
            <p className="text-gray-400">
              Every product we sell is 100% genuine, sourced directly from trusted brands.
              No fakes. No compromises.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Fast & Reliable Delivery
            </h3>
            <p className="text-gray-400">
              We know consistency matters. That’s why we deliver quickly and securely,
              right to your doorstep.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Trusted by Athletes
            </h3>
            <p className="text-gray-400">
              From beginners to serious lifters, athletes trust FITFORCE
              for supplements that actually perform.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Quality You Can Feel
            </h3>
            <p className="text-gray-400">
              Strict quality checks ensure safety, purity, and results —
              because your body deserves better.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
