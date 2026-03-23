import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Facebook,
  Home,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];
const services = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "Appliance Repair",
  "Gardening",
];
const support = [
  { label: "Help Center", href: "/help" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white" id="contact">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">HomeSathii</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              India's most trusted home services platform. Book verified
              professionals for any home need.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  data-ocid="nav.link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/65 hover:text-white text-sm transition-colors"
                    data-ocid="nav.link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/65 hover:text-white text-sm transition-colors"
                    data-ocid="nav.link"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-white/65 text-sm mb-4">
              Get exclusive deals and service tips in your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 text-sm"
                data-ocid="footer.input"
              />
              <Button
                size="icon"
                className="btn-primary border-0 shrink-0"
                aria-label="Subscribe"
                data-ocid="footer.submit_button"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-white/45 text-xs mt-3">
              Unsubscribe anytime. We respect your privacy.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-white text-sm mb-3">Support</h4>
              <ul className="space-y-2">
                {support.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/65 hover:text-white text-sm transition-colors"
                      data-ocid="nav.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>
            © {year}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
