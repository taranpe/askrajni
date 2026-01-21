"use client";

import Link from "next/link";
import { Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0b1f36] to-[#0a2a4f] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ABOUT */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
           About Ask Rajni
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
             Astrologer Rajni Kapoor is a renowned name in the world of astrology, known for her scientific approach deep wisdom, and compassionate guidance. With 21+ years of experience and over 21000 unique horoscopes analyzed, she stands as one of the most trusted astrologers in Ludhiana and across India.
            </p>
          </div>

          {/* POPULAR PRODUCTS */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Popular Products
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Gemstones", href: "/collections/gemstones" },
                { name: "Rudraksha", href: "/collections/rudraksha" },
                { name: "Lucky Bracelet", href: "/collections/bracelet" },
                { name: "Vastu Remedies", href: "/collections/vastu" },
                { name: "Services", href: "/services" },
                { name: "Horoscope", href: "/horoscope" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">✦</span>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SITE LINKS */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Site Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Help", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service Policy", href: "/terms" },
                { name: "Blogs", href: "/blogs" },
                { name: "Quick Payments Link", href: "/payments" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">✦</span>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Customer Support
            </h4>

            

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <span>+91-6239790901</span>
              </li>
              
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5" />
                <span>
                  Mon – Fri : 9AM – 6PM <br />
                  Sat : 9AM – 5PM
                </span>
              </li>
            </ul>

            {/* SOCIAL ICONS */}
            
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Ask Rajni. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
