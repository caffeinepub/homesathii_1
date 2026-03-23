import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  const waLink =
    "https://wa.me/919876543210?text=Hi%20HomeSathii%2C%20I%20need%20help%20with%20a%20home%20service";

  return (
    <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue/5 via-white to-brand-green/5 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Reach out via phone, WhatsApp, email, or fill the form below — our
            team typically responds within 2 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Phone
                      </p>
                      <a
                        href="tel:+919876543210"
                        className="text-brand-blue hover:underline"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Email
                      </p>
                      <a
                        href="mailto:support@homesathii.com"
                        className="text-brand-blue hover:underline"
                      >
                        support@homesathii.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm">
                        123 Service Street, Bengaluru,
                        <br />
                        Karnataka 560001, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Working Hours
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Monday – Saturday: 8 AM – 8 PM
                        <br />
                        Sunday: 9 AM – 5 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-brand-whatsapp text-white px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md w-full"
                  data-ocid="contact.secondary_button"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Google Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border shadow-card"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Bengaluru,Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HomeSathii Location - Bengaluru"
                />
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border shadow-card p-8"
            >
              {submitted ? (
                <div className="flex flex-col items-center text-center py-12 gap-4">
                  <CheckCircle2 className="h-16 w-16 text-brand-green" />
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Message Received!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you, <strong>{name}</strong>. Our team will reply to{" "}
                    <strong>{email}</strong> within 24 hours.
                  </p>
                  <Button
                    className="mt-2 btn-primary text-white border-0 px-8"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    data-ocid="contact.secondary_button"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input
                        id="contact-name"
                        placeholder="Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="ramesh@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Describe how we can help you..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full btn-primary text-white border-0 py-3"
                      disabled={sending}
                      data-ocid="contact.submit_button"
                    >
                      {sending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" /> Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
