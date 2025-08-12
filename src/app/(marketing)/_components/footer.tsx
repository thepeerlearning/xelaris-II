import Container from "@/components/container";
import { JSX } from "react";

const footerData = [
  {
    title: "SITE MAP",
    links: [
      { title: "About Us", link: "/about-us" },
      { title: "Contact Us", link: "/contact-us" },
      { title: "Pricing", link: "/pricing" },
      { title: "Careers", link: "/careers" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      {
        title: "Instagram",
        link: "https://www.instagram.com/xelarisofficial/",
      },
      { title: "Twitter (X)", link: "https://x.com/Xelarisofficial" },
      { title: "Facebook", link: "https://facebook.com" },
      {
        title: "LinkedIn",
        link: "https://www.linkedin.com/company/xelaris/?viewAsMember=true",
      },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { title: "Terms of Service", link: "/terms" },
      { title: "Privacy Policy", link: "/privacy" },
    ],
  },
];

const socialIcons: Record<string, JSX.Element> = {
  Instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  "Twitter (X)": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.519c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47H14.89v8.385C20.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  ),
};

const Footer = () => {
  return (
    <footer className="bg-[#34353A] text-white mt-auto">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {footerData.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium text-gray-300 mb-6 tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.link}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                        target={
                          link.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                      >
                        {link.title}
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600 mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Location and Language */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-300">United States</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">English</span>
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Desktop Only Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Terms of service
                </a>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Privacy policy
                </a>
              </div>
            </div>

            {/* Dynamic Social Icons */}
            <div className="flex items-center space-x-4">
              {footerData
                .find((section) => section.title === "SOCIAL")
                ?.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.link}
                    className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors duration-200"
                    aria-label={link.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialIcons[link.title] ?? (
                      <svg className="w-5 h-5 text-white" fill="none" />
                    )}
                  </a>
                ))}
            </div>
          </div>

          {/* Mobile Bottom Links */}
          <div className="md:hidden mt-6 flex flex-col space-y-2">
            <a
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Terms of service
            </a>
            <a
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
