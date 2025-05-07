import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 pb-10 border-b border-gray-800/50">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/zenflow-transparent.png"
                alt="ZenFlow Logo"
                width={140}
                height={40}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 max-w-sm">
              Modern task management for teams and individuals that brings
              clarity and peace to your workflow.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h3 className="text-white font-semibold mb-4">Subscribe to our newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d] text-white w-full sm:w-64"
              />
              <button className="px-5 py-3 bg-[#15803d] hover:bg-[#15803d]/90 text-white font-medium rounded-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3">Get the latest updates on product features and releases</p>
          </div>
        </div>
        
        {/* Middle section with links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-bold text-white text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-1 after:bg-[#15803d] after:left-0 after:bottom-[-8px] after:rounded-full">
              Product
            </h3>
            <ul className="space-y-4">
              {[
                "Features",
                "Pricing",
                "Integrations",
                "Changelog",
                "Roadmap",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2 text-[#15803d]">→</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-1 after:bg-[#15803d] after:left-0 after:bottom-[-8px] after:rounded-full">
              Resources
            </h3>
            <ul className="space-y-4">
              {[
                "Documentation",
                "Guides",
                "Help Center",
                "API Reference",
                "Community",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2 text-[#15803d]">→</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-1 after:bg-[#15803d] after:left-0 after:bottom-[-8px] after:rounded-full">
              Company
            </h3>
            <ul className="space-y-4">
              {["About", "Blog", "Careers", "Press", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-[#15803d]">→</span> {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-1 after:bg-[#15803d] after:left-0 after:bottom-[-8px] after:rounded-full">
              Connect
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400">Follow us on social media</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
              <div className="pt-4">
                <p className="text-gray-400 mb-2">Contact us</p>
                <a href="mailto:ahnaffarhanhossain@gmail.com" className="text-[#15803d] hover:underline">ahnaffarhanhossain@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and terms */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="bg-[#15803d]/20 p-2 rounded-full mr-3">
              <div className="bg-[#15803d] w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Z</span>
              </div>
            </div>
            <p className="text-gray-400">
              © {currentYear} ZenFlow. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cookies
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}