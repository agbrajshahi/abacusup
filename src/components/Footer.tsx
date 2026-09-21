import Link from "next/link";
import {
  Facebook,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">
        {/* Brand + Social */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Abacus<span className="text-emerald-400">Up</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Bangladesh's best online Abacus learning platform for kids and
            adults.
          </p>

          {/* Social icons */}
          <div className="flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-4 h-4" strokeWidth={2.2} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
            >
              <Youtube className="w-4 h-4" strokeWidth={2.2} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-4 h-4" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/courses", label: "Courses" },
              { href: "/practice", label: "Practice" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "FAQ" },
              { href: "/gallery", label: "Gallery" },
              { href: "/leaderboard", label: "Leaderboard" },
              { href: "/admission", label: "Admission" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <a
                href="mailto:hello@abacusup.com"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                hello@abacusup.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <a
                href="tel:+8801735123463"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                +880 1735 123463
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-gray-400">Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AbacusUp. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span className="text-gray-500">Developed with</span>
            <Heart
              className="w-3.5 h-3.5 text-rose-500 fill-rose-500"
              strokeWidth={2}
            />
            <span className="text-gray-500">by</span>
            <span className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              MD Rakib Ali
            </span>
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-emerald-400 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-emerald-400 transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}