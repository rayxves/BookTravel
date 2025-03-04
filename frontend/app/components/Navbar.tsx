"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-4">
        <span className="font-poppins self-center text-2xl font-semibold whitespace-nowrap text-white">
          BookTravel
        </span>

        <button
          data-collapse-toggle="navbar-default"
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

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 border  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900">
            {[
              { href: "/", label: "Home" },
              { href: "/favorites", label: "Favorites" },
              { href: "/destinations", label: "Destinations" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 rounded-sm transition-all ${
                    menuOpen
                      ? "hover:bg-[rgba(0,0,0,0.1)] text-[var(--lavender-blush)]"
                      : "hover:text-[var(--sapphire)] text-[var(--lavender-blush)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li
              className={`${
                menuOpen ? "w-full h-full hover:bg-[rgba(0,0,0,0.1)]" : "w-fit"
              }`}
            >
              <Link
                href="/login"
                className="flex items-center space-x-2 w-full py-2 px-3 rounded-sm transition-all"
              >
                <FaUser
                  className={`${
                    menuOpen
                      ? "hidden"
                      : "text-[var(--lavender-blush)] hover:text-[var(--sapphire)]"
                  }`}
                />
                <span
                  className={`${
                    menuOpen ? " text-[var(--lavender-blush)]" : "hidden"
                  }`}
                >
                  Login / Sign Up
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
