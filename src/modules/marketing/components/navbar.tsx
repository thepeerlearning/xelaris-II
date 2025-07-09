/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Navigation data structure
const navigationData = {
  school: {
    label: "School",
    items: [
      { href: "/school/software-development", label: "Software Development" },
      { href: "/school/product-design", label: "Product Design" },
      {
        href: "/school/artificial-intelligence",
        label: "Artificial Intelligence",
      },
      { href: "/school/blockchain-technology", label: "BlockChain Technology" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { href: "/about-us", label: "About Xelaris" },
      { href: "/contact-us", label: "Get in Touch" },
    ],
  },
  pricing: {
    label: "Pricing",
    href: "/pricing",
  },
};

// Mobile menu items
const mobileMenuItems = [
  { href: "/about-us", label: "About Xelaris" },
  { href: "/contact-us", label: "Get in Touch" },
  { href: "/Software", label: "Software Development" },
  { href: "/ProductDesign", label: "Product Design" },
  { href: "/ArtificialIntelligence", label: "Artificial Intelligence" },
  { href: "/Web3Developer", label: "Web3 Developer" },
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Login" },
];

// Reusable Components
const NavLink = ({
  href,
  children,
  isActive,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}) => (
  <Link
    href={href}
    className={`font-inter font-normal text-[15.88px] leading-[24px] tracking-normal text-white font-sans hover:text-gray-300 transition-all duration-200 relative group ${className}`}
  >
    {children}
    <motion.div
      className="absolute -bottom-2 left-0 h-0.5 bg-white origin-left"
      initial={{ scaleX: isActive ? 1 : 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{ width: "100%" }}
    />
  </Link>
);

const DropdownMenu = ({
  menu,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: string;
  items: { href: string; label: string }[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const pathname = usePathname();
  const hasActiveChild = items.some((item) => pathname === item.href);

  return (
    <li
      className="flex gap-2 relative align-middle justify-center items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="font-inter font-normal text-[15.88px] leading-[24px] tracking-normal text-white font-sans cursor-pointer hover:text-gray-300 transition-all duration-200 relative group flex items-center gap-1">
        {navigationData[menu as keyof typeof navigationData].label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown
            size={16}
            className="text-white group-hover:text-gray-300 transition-colors duration-200"
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 left-0 h-0.5 bg-white origin-left"
          initial={{ scaleX: hasActiveChild ? 1 : 0 }}
          animate={{ scaleX: hasActiveChild ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {
                opacity: 0,
                y: -10,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              },
              exit: {
                opacity: 0,
                y: -10,
                scale: 0.95,
                transition: {
                  duration: 0.15,
                  ease: "easeIn",
                },
              },
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm ${
                    pathname === item.href
                      ? "bg-gray-50 border-l-2 border-primary"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const mobileMenuVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  // Handles mouse entering a menu link or its dropdown
  const handleMouseEnter = (menu: string) => {
    setHoveredMenu(menu);
  };

  // Handles mouse leaving both link and dropdown area
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest("a");

    if (target) {
      // If a Link or <a> was clicked, then close the navigation
      setOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full h-20 z-50 bg-inherit transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#34353A] backdrop-blur-md"
          : "border-none"
      }`}
    >
      <Container className="flex w-full justify-between items-center mx-auto px-4 h-full">
        <Link href="/" className="text-xl flex items-center z-50">
          <Image
            src="/assets/images/logo.png"
            height={37}
            width={40.98}
            alt="logo-icon"
            sizes="100vw"
            className="w-auto h-[37px]"
          />
        </Link>

        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            <DropdownMenu
              menu="school"
              items={navigationData.school.items}
              isOpen={hoveredMenu === "school"}
              onMouseEnter={() => handleMouseEnter("school")}
              onMouseLeave={handleMouseLeave}
            />

            <DropdownMenu
              menu="company"
              items={navigationData.company.items}
              isOpen={hoveredMenu === "company"}
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            />

            <li>
              <NavLink
                href={navigationData.pricing.href!}
                isActive={pathname === navigationData.pricing.href}
              >
                {navigationData.pricing.label}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 max-md:hidden">
          <Button variant="ghost" className="ghost max-sm:hidden !px-4" asChild>
            <Link href="/login">
              Login <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Book A Free Class</Link>
          </Button>
        </div>

        {/* Hamburger button */}
        <div className="flex gap-2 md:hidden">
          <Button asChild>
            <Link href="/signup">Book A Free Class</Link>
          </Button>
          <motion.button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="p-2 focus:outline-none z-50"
            whileTap={{ scale: 0.9 }}
          >
            <div className="space-y-1">
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{
                  opacity: open ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed top-20 left-0 h-[calc(100vh-80px)] w-full bg-background z-40 md:hidden"
              variants={mobileMenuVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav
                className="flex flex-col p-6 space-y-6 text-white text-lg h-full overflow-y-auto"
                onClick={handleNavClick}
              >
                {mobileMenuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={mobileMenuItemVariants as any}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className={`block py-2 hover:text-gray-300 transition-colors duration-200 relative ${
                        pathname === item.href ? "text-yellow-400" : ""
                      }`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Navbar;
