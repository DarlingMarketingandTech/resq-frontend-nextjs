"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

type MenuItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string; description?: string }[];
};

const navigation: MenuItem[] = [
  {
    label: "Shop Humans",
    href: "/shop/humans",
    subItems: [
      {
        label: "Skincare",
        href: "/shop/humans/skincare",
        description: "Nourish your skin naturally",
      },
      {
        label: "Therapeutic Balms",
        href: "/shop/humans/balms",
        description: "Targeted relief and healing",
      },
      {
        label: "Lip Care",
        href: "/shop/humans/lip-care",
        description: "Everyday moisture and protection",
      },
    ],
  },
  {
    label: "Shop Pets",
    href: "/shop/pets",
    subItems: [
      {
        label: "Skin & Coat",
        href: "/shop/pets/skin-coat",
        description: "For a healthy, shiny coat",
      },
      {
        label: "Joint Care",
        href: "/shop/pets/joint-care",
        description: "Mobility support for active pets",
      },
      {
        label: "Bundles",
        href: "/shop/pets/bundles",
        description: "Complete care packages",
      },
    ],
  },
  {
    label: "The Science",
    href: "/science",
    subItems: [
      {
        label: "Our Ingredients",
        href: "/science/ingredients",
        description: "Nature's most powerful elements",
      },
      {
        label: "Manuka Honey vs. The Rest",
        href: "/science/manuka",
        description: "Discover the ResQ difference",
      },
    ],
  },
  {
    label: "Wellness Journal",
    href: "/journal",
    // Adding subItems for consistency in the mobile menu and dropdown
    subItems: [
      {
        label: "Educational Hub",
        href: "/journal",
        description: "Insights and thought-leadership on natural healing",
      }
    ]
  },
];

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState<string[]>([]);
  const cartCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdowns((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full font-sans transition-all duration-300">
      {/* Announcement Banner */}
      <div className="bg-stone-900 text-stone-100 px-4 py-2 text-center text-xs tracking-wider uppercase font-medium">
        Free shipping on orders over $75
      </div>

      {/* Main Header */}
      <div
        className={`bg-[#FAFAFA]/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? "border-stone-200 shadow-sm py-3" : "border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Desktop Navigation (Left) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.slice(0, 2).map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors py-2"
                >
                  {item.label}
                  {item.subItems && (
                    <ChevronDownIcon
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div
                    className={`absolute top-full left-0 w-72 bg-white border border-stone-100 shadow-xl rounded-md pt-2 pb-4 px-6 opacity-0 translate-y-2 pointer-events-none transition-all duration-200 ease-out ${
                      activeDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col space-y-4 mt-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="group/sub flex flex-col"
                        >
                          <span className="text-sm font-medium text-stone-800 group-hover/sub:text-stone-500 transition-colors">
                            {subItem.label}
                          </span>
                          {subItem.description && (
                            <span className="text-xs text-stone-500 mt-1">
                              {subItem.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link
              href="/"
              className="inline-block font-serif text-2xl tracking-widest uppercase text-stone-900 font-bold"
            >
              RESQ
            </Link>
          </div>

          {/* Desktop Navigation (Right) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.slice(2, 4).map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors py-2"
                >
                  {item.label}
                  {item.subItems && (
                    <ChevronDownIcon
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div
                    className={`absolute top-full right-0 w-72 bg-white border border-stone-100 shadow-xl rounded-md pt-2 pb-4 px-6 opacity-0 translate-y-2 pointer-events-none transition-all duration-200 ease-out ${
                      activeDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col space-y-4 mt-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="group/sub flex flex-col"
                        >
                          <span className="text-sm font-medium text-stone-800 group-hover/sub:text-stone-500 transition-colors">
                            {subItem.label}
                          </span>
                          {subItem.description && (
                            <span className="text-xs text-stone-500 mt-1">
                              {subItem.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Utility Icons */}
            <div className="flex items-center space-x-5 pl-4 border-l border-stone-200">
              <button aria-label="Search" className="text-stone-600 hover:text-stone-900 transition-colors">
                <SearchIcon className="w-5 h-5" />
              </button>
              <button
                onClick={openCart}
                aria-label="Cart"
                className="relative text-stone-600 hover:text-stone-900 transition-colors"
              >
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-forest rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Utility Icons */}
          <div className="flex items-center lg:hidden space-x-4">
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative text-stone-600 hover:text-stone-900"
            >
              <CartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-forest rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#FAFAFA] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-[#FAFAFA]">
          <span className="font-serif text-xl tracking-widest uppercase text-stone-900 font-bold">
            RESQ
          </span>
          <button
            className="p-2 -mr-2 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6">
          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-stone-100 last:border-0 pb-2 mb-2">
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => item.subItems && toggleMobileDropdown(item.label)}
                >
                  <Link
                    href={item.href}
                    className="text-lg font-medium text-stone-800 tracking-wide"
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleMobileDropdown(item.label);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button className="p-2 -mr-2 text-stone-400">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openMobileDropdowns.includes(item.label) ? "rotate-180 text-stone-800" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                
                {item.subItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openMobileDropdowns.includes(item.label) ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col space-y-4 pl-4 pt-2 border-l-2 border-stone-100">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex flex-col"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-base font-medium text-stone-600">
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="p-6 border-t border-stone-200 bg-stone-50 mt-auto">
          <div className="flex items-center space-x-6 text-sm font-medium text-stone-600">
            <button className="flex items-center space-x-2 hover:text-stone-900 transition-colors">
              <SearchIcon className="w-5 h-5" />
              <span>Search</span>
            </button>
            <button className="hover:text-stone-900 transition-colors">
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
