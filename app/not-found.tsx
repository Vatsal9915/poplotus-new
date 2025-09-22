"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 text-center px-6 relative overflow-hidden">
      {/* Floating Golden Circles */}
      <motion.div
        className="absolute top-20 left-12 w-16 h-16 bg-yellow-300 rounded-full opacity-70 blur-lg"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-28 right-16 w-20 h-20 bg-yellow-400 rounded-full opacity-50 blur-lg"
        animate={{ y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* 404 Text */}
      <motion.h1
        className="text-8xl font-extrabold text-yellow-600 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        className="mt-3 text-gray-600 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The golden path you are looking for doesn’t exist ✨.  
        Let’s get you back home.
      </motion.p>

      {/* Button */}
      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">
          <button className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-2xl shadow-lg transition">
            Go Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
