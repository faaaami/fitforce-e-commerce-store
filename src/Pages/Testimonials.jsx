import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-white">
            Trusted by People Who  
            <span className="text-yellow-400"> Train Hard</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Real feedback from customers who rely on FITFORCE
            for their daily nutrition and performance.
          </p>
        </div>

        {/* Testimonials Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Testimonial 1 */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              “I’ve tried multiple supplement stores before, but FITFORCE
              stands out. The products are authentic, delivery is quick,
              and the quality is always consistent.”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                R
              </div>
              <div>
                <p className="text-white font-semibold">Rahul Sharma</p>
                <p className="text-sm text-gray-400">Gym Enthusiast</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="md:mt-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              “What I like about FITFORCE is the trust factor.
              No fake products, no confusion — just clean supplements
              that actually support my training.”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                A
              </div>
              <div>
                <p className="text-white font-semibold">Amaan Khan</p>
                <p className="text-sm text-gray-400">Strength Training</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              “FITFORCE has become my regular store for protein and creatine.
              Everything feels premium — from packaging to service.”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                V
              </div>
              <div>
                <p className="text-white font-semibold">Vishal Mehta</p>
                <p className="text-sm text-gray-400">Amateur Athlete</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="md:mt-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              “Simple, reliable, and authentic. That’s why I recommend
              FITFORCE to anyone serious about fitness.”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                S
              </div>
              <div>
                <p className="text-white font-semibold">Sandeep R.</p>
                <p className="text-sm text-gray-400">Personal Trainer</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
