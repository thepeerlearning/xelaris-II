"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Animation variants
  const dropdownVariants = {
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
  };

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full h-20  z-50 transition-all duration-300 bg-inherit ${
        isScrolled ? "border-b border-gray-600" : ""
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
            <li
              className="flex gap-2 relative align-middle justify-center items-center"
              onMouseEnter={() => handleMouseEnter("school")}
              onMouseLeave={handleMouseLeave}
            >
              <p className="font-inter font-normal text-[15.88px] leading-[24px] tracking-normal align-middle text-white font-sans cursor-pointer hover:text-gray-300 transition-colors duration-200">
                School
              </p>

              <AnimatePresence>
                {hoveredMenu === "school" && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href="/Software"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Software Development
                    </Link>
                    <Link
                      href="/ProductDesign"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Product Design
                    </Link>
                    <Link
                      href="/ArtificialIntelligence"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Artificial Intelligence
                    </Link>
                    <Link
                      href="/Web3Developer"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Web3 Developer
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li
              className="flex gap-2 relative align-middle justify-center items-center"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              <p className="font-inter font-normal text-[15.88px] leading-[24px] tracking-normal align-middle text-white font-sans cursor-pointer hover:text-gray-300 transition-colors duration-200">
                Company
              </p>

              <AnimatePresence>
                {hoveredMenu === "company" && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href="/About"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      About Xelaris
                    </Link>
                    <Link
                      href="/ContactUs"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                href="/Pricing"
                className="font-inter font-normal text-[15.88px] leading-[24px] tracking-normal align-middle text-white font-sans hover:text-gray-300 transition-colors duration-200"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 max-md:hidden">
          <Button variant="ghost" className="ghost max-sm:hidden ">
            Login <ArrowUpRight />
          </Button>
          <Button>Book A Free Class</Button>
        </div>

        {/* Hamburger button */}
        <div className="flex gap-2 md:hidden">
          <Button>Book A Free Class</Button>
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
              className="fixed top-20 left-0 h-[calc(100vh-80px)] w-full  bg-background z-40 md:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav
                className="flex flex-col p-6 space-y-6 text-white text-lg h-full overflow-y-auto"
                onClick={handleNavClick}
              >
                {[
                  { href: "/About", label: "About Xelaris" },
                  { href: "/ContactUs", label: "Get in Touch" },
                  { href: "/Software", label: "Software Development" },
                  { href: "/ProductDesign", label: "Product Design" },
                  {
                    href: "/ArtificialIntelligence",
                    label: "Artificial Intelligence",
                  },
                  { href: "/Web3Developer", label: "Web3 Developer" },
                  { href: "/Pricing", label: "Pricing" },
                  { href: "/LoginSignUp", label: "Login" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className="block py-2 hover:text-gray-300 transition-colors duration-200"
                    >
                      {item.label}
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
