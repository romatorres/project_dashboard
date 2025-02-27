"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    const offset = 80; // Adjust this value based on your header height

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            className="text-2xl font-bold"
          >
            Logo
          </a>

          <div className="hidden md:flex space-x-8">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, "services")}
              className="hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="hover:text-blue-600"
            >
              Projects
            </a>
            <a
              href="#contacts"
              onClick={(e) => scrollToSection(e, "contacts")}
              className="hover:text-blue-600"
            >
              Contact
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden fixed top-[72px] right-0 w-full bg-white/90 backdrop-blur-sm p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-4 flex flex-col items-center">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="block hover:text-blue-600 transition-colors duration-300 text-center text-lg"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, "services")}
              className="block hover:text-blue-600 transition-colors duration-300 text-center text-lg"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="block hover:text-blue-600 transition-colors duration-300 text-center text-lg"
            >
              Projects
            </a>
            <a
              href="#contacts"
              onClick={(e) => scrollToSection(e, "contacts")}
              className="block hover:text-blue-600 transition-colors duration-300 text-center text-lg"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
