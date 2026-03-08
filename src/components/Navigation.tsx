'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { MENU_LABELS } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/', label: MENU_LABELS.WEBCAMS },
  { href: '/map', label: MENU_LABELS.MAP },
  { href: '/report', label: MENU_LABELS.REPORTS },
] as const;

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cyan-500 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 font-semibold text-lg hover:text-cyan-100 transition-colors"
            >
              Alpine Control Room
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-cyan-100 transition-colors py-2"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-cyan-600 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden sticky top-16 z-50 bg-cyan-600 text-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
