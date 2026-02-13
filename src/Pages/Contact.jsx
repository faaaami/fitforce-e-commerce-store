import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Navbar from "../Components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black flex flex-col items-center px-6 py-16">
      <h1 className="text-4xl font-bold mb-9 mt-7 text-center text-white">Contact <span className="text-yellow-400">Us</span></h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black flex items-center justify-center gap-2 font-bold py-3 rounded-lg hover:bg-black hover:text-yellow-400 transition"
          >
            <AiOutlineSend /> Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-600">
            We'd love to hear from you! Reach out for support, inquiries, or
            just to say hi.
          </p>

          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-yellow-400" />
            <span>calicut,kerala</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhoneAlt className="text-yellow-400" />
            <span>9539159429</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-yellow-400" />
            <span>fitforcecompany.com</span>
          </div>

          <div className="flex gap-4 mt-4">
            {/* Optional social links */}
            <a
              href="#"
              className="text-gray-600 hover:text-yellow-400 transition"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-yellow-400 transition"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
