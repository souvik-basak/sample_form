"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint =
      "/api/submit";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', phone: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Failed to submit");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-200 to-indigo-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <FloatingInput
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          <FloatingInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <FloatingTextarea
            label="Message"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />
          <FloatingInput
            label="Phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer"
            type="submit"
          >
            Submit
          </motion.button>
        </form>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-600 font-medium text-center"
            >
              ✅ Submitted successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FloatingInput({ label, name, value, onChange,placeholder }) {
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="peer w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="peer w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows="4"
        required
      />
    </div>
  );
}
