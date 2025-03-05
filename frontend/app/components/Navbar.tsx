"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-4">
        <span className="font-poppins self-center text-2xl font-semibold whitespace-nowrap text-white">
          BookTravel
        </span>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden md:flex md:items-center md:space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/favorites", label: "Favorites" },
            { href: "/destinations", label: "Destinations" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-gray-400 transition-all"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/register"
            className="flex items-center space-x-2 text-white hover:text-gray-400 transition-all"
          >
            <FaUser />
            <span>Login / Register</span>
          </Link>
        </div>
      </div>

      <div
        className={`absolute top-full right-0 w-2/6 bg-gray-900 shadow-lg z-50 transition-transform md:hidden rounded-b-md ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="font-medium flex flex-col p-2 border rounded-lg">
          {[
            { href: "/", label: "Home" },
            { href: "/favorites", label: "Favorites" },
            { href: "/destinations", label: "Destinations" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 px-3 text-white hover:bg-gray-700 transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/register"
              className="flex items-center space-x-2 py-2 px-3 text-white hover:bg-gray-700 transition-all"
            >
              <FaUser className="hidden sm:block" />
              <span>Login / Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
