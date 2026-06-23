"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // Removed: const [scrolled, setScrolled] = useState(false);
  // Removed: useEffect for scroll detection

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden relative">
              <Image
                src="/images/logo.png"
                alt="MobileHealth Malawi logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-primary">MobileHealth</span>
            <span className="text-sm text-secondary font-semibold hidden md:inline">
              Malawi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/download" className="btn-primary text-sm py-2">
              Download App
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-text hover:bg-primary-lighter hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/download"
              className="block mt-2 mx-4 btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              Download App
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
