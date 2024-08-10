import { Facebook, Linkedin, LinkedinIcon, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-8 border-t-gray-100">
      <div className=" container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-2xl font-bold">
              Job <span className="text-main-001">Search</span>
            </p>
            <p className="text-sm text-gray-500">
              @{new Date().getFullYear()} JobSearch
            </p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="http://facebook.com"
              className="hover:text-gray-400"
              aria-label="Facebook">
              <Facebook />
            </a>
            <a
              href="http://twitter.com"
              className="hover:text-gray-400"
              aria-label="Twitter">
              <Twitter />
            </a>
            <a
              href="http://linkedin.com"
              className="hover:text-gray-400"
              aria-label="LinkdIn">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
