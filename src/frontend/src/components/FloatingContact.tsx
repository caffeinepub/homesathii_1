import { MessageCircle, Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div
      className="fixed bottom-6 right-5 z-50 flex flex-col gap-3"
      aria-label="Quick contact"
    >
      {/* Call Us */}
      <a
        href="tel:+919876543210"
        className="flex items-center gap-2.5 bg-brand-blue text-white px-4 py-2.5 rounded-full shadow-float hover:opacity-90 transition-all hover:-translate-y-0.5 font-semibold text-sm"
        aria-label="Call us"
        data-ocid="contact.primary_button"
      >
        <Phone className="h-4 w-4" />
        <span>Call Us</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919876543210?text=Hi%20HomeSathii%2C%20I%20need%20help%20with%20a%20home%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-brand-whatsapp text-white px-4 py-2.5 rounded-full shadow-float hover:opacity-90 transition-all hover:-translate-y-0.5 font-semibold text-sm"
        aria-label="Chat on WhatsApp"
        data-ocid="contact.secondary_button"
      >
        <MessageCircle className="h-4 w-4" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
