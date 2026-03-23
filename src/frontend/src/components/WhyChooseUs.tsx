import { Clock, ShieldCheck, Star, Tag } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    description:
      "All our service providers are background-verified, licensed, and trained to deliver quality work.",
    iconBg: "bg-blue-50 text-brand-blue",
  },
  {
    icon: Tag,
    title: "Affordable Pricing",
    description:
      "Transparent, competitive pricing with no hidden charges. Get the best value for your money.",
    iconBg: "bg-green-50 text-brand-green",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description:
      "Same-day and next-day appointments available. We respect your time and deliver on schedule.",
    iconBg: "bg-orange-50 text-orange-600",
  },
  {
    icon: Star,
    title: "Top Rated",
    description:
      "4.8★ average rating from 50,000+ happy customers across India. Quality you can count on.",
    iconBg: "bg-yellow-50 text-yellow-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 bg-card" aria-labelledby="why-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-3">
            Why HomeSathii
          </span>
          <h2
            id="why-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We are committed to making home maintenance stress-free and
            reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="bg-white rounded-2xl p-6 shadow-card card-hover text-center border border-border"
              data-ocid={`why.item.${i + 1}`}
            >
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${feat.iconBg}`}
              >
                <feat.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2 text-lg">
                {feat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
