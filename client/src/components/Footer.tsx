import { Link } from "wouter";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="font-script text-2xl text-primary">Peeku's</span>
              <span className="font-heading ml-1 text-xl font-bold text-white">Bakery</span>
            </div>
            <p className="mb-4">Artisanal baked goods made with love since 2015. Bringing joy through delicious treats.</p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-primary transition-colors p-2">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors p-2">
                <FaPinterest size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu?category=breads" className="hover:text-primary transition-colors">
                  Breads
                </Link>
              </li>
              <li>
                <Link href="/menu?category=pastries" className="hover:text-primary transition-colors">
                  Pastries
                </Link>
              </li>
              <li>
                <Link href="/menu?category=cakes" className="hover:text-primary transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link href="/menu?category=desserts" className="hover:text-primary transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link href="/menu?category=seasonal" className="hover:text-primary transition-colors">
                  Seasonal Specials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Working Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Peeku's Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
