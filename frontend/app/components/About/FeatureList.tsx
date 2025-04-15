"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "Search",
    content:
      "Search for your favorite destinations directly in our search bar to get detailed information about each location.",
  },
  {
    title: "Filters",
    content:
      "Filter destinations by type, price, and rating to find exactly what you're looking for.",
  },
  {
    title: "Nearby",
    content:
      "Use our 'next to me' feature to discover places close to your current location and filter results.",
  },
  {
    title: "Account",
    content:
      "Log in to personalize your experience! Save the places you like most and access your favorite spots quickly.",
  },
  {
    title: "Favorites",
    content:
      "When you find a place you'd like to visit, click 'add to favorites'. This way, you can easily return to it whenever you want.",
  },
];

export default function FeatureList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {sections.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="relative bg-gray-200 rounded-xl shadow-md overflow-visible"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full text-left px-6 py-4 font-semibold text-gray-800 text-md flex justify-between items-center cursor-pointer"
            >
              <span>{item.title}</span>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 top-full left-0 mt-1 w-full bg-gray-100 text-gray-700 text-sm rounded-b-xl shadow-lg px-6 py-4"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
