import { Button } from "@/components/ui/button";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import type { FeaturedService } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useReviewsForService } from "../hooks/useQueries";
import AuthModal from "./AuthModal";
import BookingModal from "./BookingModal";

const serviceImages: Record<string, string> = {
  Plumbing: "/assets/generated/service-plumbing.dim_400x260.jpg",
  Electrical: "/assets/generated/service-electrical.dim_400x260.jpg",
  Cleaning: "/assets/generated/service-cleaning.dim_400x260.jpg",
  Carpentry: "/assets/generated/service-carpentry.dim_400x260.jpg",
};

const fallbackServices: FeaturedService[] = [
  {
    id: BigInt(1),
    name: "Pipe Leak Repair",
    categoryId: BigInt(1),
    rating: 4.9,
    reviewCount: BigInt(1240),
    priceMin: BigInt(299),
    priceMax: BigInt(899),
    currency: "₹",
  },
  {
    id: BigInt(2),
    name: "Full Home Wiring",
    categoryId: BigInt(2),
    rating: 4.8,
    reviewCount: BigInt(986),
    priceMin: BigInt(1499),
    priceMax: BigInt(4999),
    currency: "₹",
  },
  {
    id: BigInt(3),
    name: "Deep Home Cleaning",
    categoryId: BigInt(3),
    rating: 4.9,
    reviewCount: BigInt(2105),
    priceMin: BigInt(799),
    priceMax: BigInt(2499),
    currency: "₹",
  },
  {
    id: BigInt(4),
    name: "Custom Wardrobe Build",
    categoryId: BigInt(4),
    rating: 4.7,
    reviewCount: BigInt(612),
    priceMin: BigInt(3999),
    priceMax: BigInt(14999),
    currency: "₹",
  },
];

const categoryNames: Record<string, string> = {
  "1": "Plumbing",
  "2": "Electrical",
  "3": "Cleaning",
  "4": "Carpentry",
  "5": "Appliance Repair",
  "6": "Gardening",
};

const DEFAULT_IMG = serviceImages.Cleaning;

interface FeaturedServicesProps {
  services?: FeaturedService[];
  isLoading?: boolean;
}

function StarRating({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "xs" }) {
  const starCls = size === "xs" ? "h-3 w-3" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${starCls} ${
            n <= Math.round(rating)
              ? "fill-brand-star text-brand-star"
              : "text-muted-foreground"
          }`}
        />
      ))}
      <span
        className={`font-semibold text-foreground ml-1 ${size === "xs" ? "text-xs" : "text-xs"}`}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ServiceReviews({ serviceId }: { serviceId: bigint }) {
  const { data: reviews } = useReviewsForService(serviceId);
  if (!reviews || reviews.length === 0) return null;

  const avg =
    reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
  const shown = reviews.slice(0, 3);

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex items-center gap-2 mb-2">
        <StarRating rating={avg} size="xs" />
        <span className="text-xs text-muted-foreground">
          ({reviews.length} reviews)
        </span>
      </div>
      <div className="space-y-1.5">
        {shown.map((r) => (
          <div
            key={String(r.id)}
            className="text-xs text-muted-foreground bg-accent/60 rounded-lg px-2.5 py-1.5"
          >
            <div className="flex gap-0.5 mb-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-2.5 w-2.5 ${
                    n <= Number(r.rating)
                      ? "fill-brand-star text-brand-star"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="line-clamp-2 leading-snug">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedServices({
  services,
  isLoading,
}: FeaturedServicesProps) {
  const { isLoggedIn } = useAuth();
  const items = services && services.length > 0 ? services : fallbackServices;
  const [authHint, setAuthHint] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [bookingService, setBookingService] = useState<FeaturedService | null>(
    null,
  );

  const handleBookNow = (svc: FeaturedService) => {
    if (!isLoggedIn) {
      setAuthHint("Please log in to book a service.");
      setAuthOpen(true);
    } else {
      setBookingService(svc);
    }
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="featured-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-3">
            Popular Picks
          </span>
          <h2
            id="featured-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Featured Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Handpicked top-rated services loved by thousands of customers.
          </p>
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-12"
            data-ocid="featured.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="featured.list"
          >
            {items.map((svc, i) => {
              const catName =
                categoryNames[String(svc.categoryId)] ?? "Service";
              const imgSrc = serviceImages[catName] ?? DEFAULT_IMG;
              return (
                <div
                  key={String(svc.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-card card-hover border border-border flex flex-col"
                  data-ocid={`featured.item.${i + 1}`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={svc.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-semibold px-2.5 py-1 rounded-full">
                      {catName}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-base leading-snug">
                      {svc.name}
                    </h3>
                    <StarRating rating={svc.rating} />
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                      {Number(svc.reviewCount).toLocaleString()} reviews
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Starting at
                        </span>
                        <p className="font-bold text-foreground text-base">
                          {svc.currency}
                          {Number(svc.priceMin).toLocaleString()}
                          <span className="text-muted-foreground font-normal text-xs ml-1">
                            – {svc.currency}
                            {Number(svc.priceMax).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="btn-primary text-white border-0 rounded-xl text-xs px-4"
                        onClick={() => handleBookNow(svc)}
                        data-ocid={`featured.primary_button.${i + 1}`}
                      >
                        Book Now
                      </Button>
                    </div>
                    <ServiceReviews serviceId={svc.id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authOpen}
        onClose={() => {
          setAuthOpen(false);
          setAuthHint(null);
        }}
        hint={authHint ?? undefined}
      />

      {bookingService && (
        <BookingModal
          serviceName={bookingService.name}
          serviceId={bookingService.id}
          isOpen={true}
          onClose={() => setBookingService(null)}
        />
      )}
    </section>
  );
}
