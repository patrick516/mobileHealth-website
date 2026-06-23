"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { newsletterApi } from "@/lib/api";
import toast from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const quickLinks = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const resources = [
  { href: "/download", label: "Download App" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const response = await newsletterApi.subscribe(email);
      if (response.success) {
        toast.success(response.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(response.message || "Subscription failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                <Image
                  src="/images/logo.png"
                  alt="MobileHealth Malawi logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold">MobileHealth</span>
              <span className="text-secondary text-sm font-semibold">
                Malawi
              </span>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-xs mx-auto md:mx-0">
              Empowering Community Health Workers in Malawi with digital tools
              for better healthcare delivery.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 inline-block text-left">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 inline-block text-left">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-3">
              Subscribe to our newsletter for updates.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-text bg-white/90 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-1 text-sm"
              >
                {loading ? "..." : <Send size={16} />}
                Subscribe
              </button>
            </form>
            <div className="mt-4">
              <p className="text-white/50 text-xs">We respect your privacy.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin size={14} />
                  <span>Blantyre, Malawi</span>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone size={14} />
                  <span>+265 999 000 001</span>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={14} />
                  <span>info@mobilehealth.mw</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/50 text-sm">
            © {currentYear} MobileHealth Malawi. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Built with ❤️ for Community Health Workers
          </p>
        </div>
      </div>
    </footer>
  );
}
