"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden text-center px-6">
      {/* Floating Mascots */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        🌸
      </motion.div>
      <motion.div
        className="absolute top-32 right-16 text-6xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        🍿
      </motion.div>

      {/* 404 Animation */}
      <motion.h1
        className="text-8xl font-extrabold text-orange-600 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        className="mt-3 text-gray-600 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Looks like this page got lost while snacking on{" "}
        <b>PopLotus makhanas</b> 🍿.  
        Don’t worry, Poppy & Poppus will guide you home.
      </motion.p>

      {/* Button */}
      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button className="px-6 py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg transition">
            Go Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
