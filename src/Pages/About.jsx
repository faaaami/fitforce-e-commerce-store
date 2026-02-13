import React from "react";
import Navbar from "../Components/Navbar";

const About = () => {






  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-gray-900 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* hero */}
        <h1 className="text-white text-4xl font-extrabold mb-6">
          About <span className="text-yellow-500">FITFORCE</span>
        </h1>

        <p className="text-lg text-white max-w-3xl mb-12">
          FITFORCE was created with one simple belief — fitness should be honest,
          accessible, and built for real people, not just professional athletes.
        </p>

        {/* brand story */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
            <p className="text-white leading-relaxed mb-4">
              We started FITFORCE after struggling to find supplements we could
              actually trust. Too many brands promised miracles, hid ingredients,
              or charged premium prices without real value.
            </p>
            <p className="text-white leading-relaxed">
              So we decided to build something different — a brand focused on
              transparency, quality, and results that speak for themselves.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What We Stand For</h2>
            <ul className="space-y-3 text-white">
              <li>✔ Clean & authentic products</li>
              <li>✔ No fake claims or hidden blends</li>
              <li>✔ Fair pricing for real value</li>
              <li>✔ Built for beginners & athletes alike</li>
            </ul>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-gray-100 rounded-2xl p-10 mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Why People Choose <span className="text-yellow-500">FITFORCE</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Real Quality</h3>
              <p className="text-gray-600 text-sm">
                Every product is carefully sourced and tested to ensure it meets
                real fitness needs — not marketing hype.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Trusted by Users</h3>
              <p className="text-gray-600 text-sm">
                We grow through word of mouth, not fake reviews. Our community is
                our biggest strength.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">
                From browsing to delivery, we focus on smooth, reliable, and
                honest service every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* CLOSING */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            More Than a Brand
          </h2>
          <p className="text-gray-600">
            FITFORCE isn’t just about supplements — it’s about discipline,
            consistency, and becoming a stronger version of yourself every day.
            We’re proud to be part of your journey.
          </p>
        </div>

      </div>
    </div>
    </>
  );
};

export default About;
