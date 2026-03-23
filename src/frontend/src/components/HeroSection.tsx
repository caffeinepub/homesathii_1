import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (keyword: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <section
      className="relative w-full min-h-[540px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-home-services.dim_1400x600.jpg')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-blue/80 via-brand-teal/70 to-brand-navy/80"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 text-center py-16">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <MapPin className="h-4 w-4" />
          Serving 50+ cities across India
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 max-w-3xl mx-auto">
          Find Trusted Home
          <br />
          <span className="text-white/90">Services Near You</span>
        </h1>

        <p className="text-white/85 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Professional, verified experts for all your home needs — booked in
          minutes.
        </p>

        <div className="bg-white rounded-2xl shadow-float p-2 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              placeholder="Search for a service (e.g. Plumbing, Cleaning...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border-0 shadow-none p-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base"
              data-ocid="hero.search_input"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="btn-primary text-white border-0 rounded-xl px-8 py-3 text-base font-semibold shrink-0"
            data-ocid="hero.primary_button"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Plumbing", "Electrical", "Cleaning", "Carpentry"].map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => {
                setQuery(tag);
                onSearch(tag);
              }}
              className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
