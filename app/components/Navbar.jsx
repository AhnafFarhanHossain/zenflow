"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Features", "Testimonials", "About", "Contact"];

  return (
    <nav
      className={`fixed w-full z-50 ${
        isScrolled
          ? "py-3 bg-white border-b border-gray-100 shadow-sm"
          : "py-4 bg-white border-b border-gray-200"
      } transition-all duration-300`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Image
              src="/zenflow-transparent.png"
              alt="ZenFlow Logo"
              width={140}
              height={100}
            />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg border border-gray-100 hover:border-[#15803d]/30 hover:bg-[#15803d]/5 transition-all duration-200 lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-gray-700 transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-700 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-700 transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative px-4 py-2 group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span
                className={`text-sm font-medium text-gray-700 transition-all duration-300 ${
                  hoveredItem === index ? "text-gray-900" : ""
                }`}
              >
                {item}
              </span>
              <span
                className={`absolute inset-0 border border-transparent rounded-lg transition-all duration-300 ${
                  hoveredItem === index
                    ? "border-[#15803d]/20 bg-[#15803d]/5"
                    : ""
                }`}
              />
            </Link>
          ))}
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Button href="/login" variant="secondary" size="sm">
            Sign in
          </Button>
          <Button href="/get-started" variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-md transform transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 border border-transparent hover:text-gray-900 hover:border-[#15803d]/20 hover:bg-[#15803d]/5 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Button
              href="/login"
              variant="secondary"
              size="sm"
              className="w-full justify-start my-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Button>
            <Button
              href="/get-started"
              variant="primary"
              size="sm"
              className="w-full justify-start my-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
