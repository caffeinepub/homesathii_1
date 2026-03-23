import { Award, Heart, Shield, Star, ThumbsUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const team = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "15 years in home services. Passionate about connecting families with trusted professionals.",
    avatar: "AS",
  },
  {
    name: "Priya Nair",
    role: "Head of Operations",
    bio: "Expert in provider quality control and customer experience management.",
    avatar: "PN",
  },
  {
    name: "Rohan Gupta",
    role: "Technology Lead",
    bio: "Building seamless booking experiences for thousands of households across India.",
    avatar: "RG",
  },
  {
    name: "Sneha Verma",
    role: "Customer Success",
    bio: "Dedicated to ensuring every service experience is smooth and satisfying.",
    avatar: "SV",
  },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Every provider is background-checked, trained, and verified before joining our platform.",
    color: "text-brand-blue bg-blue-50",
  },
  {
    icon: Star,
    title: "Quality First",
    desc: "We maintain a 4.8+ rating standard. Providers who fall short are re-trained or removed.",
    color: "text-brand-star bg-yellow-50",
  },
  {
    icon: Zap,
    title: "Fast Response",
    desc: "Same-day and next-day bookings available for all major service categories.",
    color: "text-brand-green bg-green-50",
  },
  {
    icon: Heart,
    title: "Customer Care",
    desc: "Our support team is available 7 days a week to resolve any issue immediately.",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: Award,
    title: "Certified Pros",
    desc: "Over 2,000 verified professionals across 20+ service categories in Bengaluru.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guarantee",
    desc: "Not happy? We'll send another technician at no extra charge — that's our promise.",
    color: "text-brand-blue bg-blue-50",
  },
];

const stats = [
  { label: "Happy Customers", value: "50,000+" },
  { label: "Service Providers", value: "2,000+" },
  { label: "Cities Served", value: "12" },
  { label: "Average Rating", value: "4.8 ★" },
];

export default function AboutUs() {
  return (
    <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue/5 via-white to-brand-green/5 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Trusted Home Services,{" "}
            <span className="text-brand-blue">Across India</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            HomeSathii was founded in 2020 with a simple mission: make home
            maintenance stress-free by connecting families with skilled,
            background-checked professionals they can truly trust.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-brand-blue">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold text-brand-green bg-green-50 px-3 py-1 rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Making Every Home a Better Place to Live
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe everyone deserves reliable home services without the
                hassle of searching, negotiating, or worrying about quality.
                HomeSathii removes all the friction — you describe the problem,
                we send the right expert.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From emergency plumbing at midnight to a weekend deep-clean
                before guests arrive, HomeSathii is the one number you need to
                call for any home service need.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-brand-blue/5 rounded-2xl p-5 border border-brand-blue/10">
                <Users className="h-7 w-7 text-brand-blue mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Community First
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Empowering local technicians with steady work and fair pay.
                </p>
              </div>
              <div className="bg-brand-green/5 rounded-2xl p-5 border border-brand-green/10">
                <Shield className="h-7 w-7 text-brand-green mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Verified Always
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  100% of providers go through our rigorous vetting process.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
                <Star className="h-7 w-7 text-brand-star mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Top Rated
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Maintaining 4.8+ average rating across all services.
                </p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <Award className="h-7 w-7 text-purple-600 mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Award Winning
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Best Home Services Startup — India Tech Awards 2023.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-blue/5 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-3">
              What We Stand For
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-card"
              >
                <div
                  className={`h-11 w-11 rounded-xl ${v.color} flex items-center justify-center mb-4`}
                >
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-brand-green bg-green-50 px-3 py-1 rounded-full mb-3">
              The People Behind HomeSathii
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Meet Our Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center bg-gradient-to-b from-accent/40 to-white rounded-2xl p-6 border border-border"
              >
                <div className="h-16 w-16 rounded-full btn-primary flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs font-medium text-brand-blue mt-0.5 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
