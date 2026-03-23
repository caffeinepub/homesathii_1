import {
  Hammer,
  Leaf,
  Loader2,
  type LucideIcon,
  Settings,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import type { ServiceCategory } from "../backend.d";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Zap,
  Sparkles,
  Hammer,
  Settings,
  Leaf,
};

const iconColors = [
  "bg-blue-50 text-brand-blue",
  "bg-yellow-50 text-yellow-600",
  "bg-green-50 text-brand-green",
  "bg-orange-50 text-orange-600",
  "bg-purple-50 text-purple-600",
  "bg-emerald-50 text-emerald-600",
];

const fallbackCategories: ServiceCategory[] = [
  {
    id: BigInt(1),
    name: "Plumbing",
    description: "Pipe repairs, leaks, installations & more",
    iconName: "Wrench",
  },
  {
    id: BigInt(2),
    name: "Electrical",
    description: "Wiring, fixtures, panel upgrades & safety",
    iconName: "Zap",
  },
  {
    id: BigInt(3),
    name: "Cleaning",
    description: "Deep cleaning, sanitisation & maintenance",
    iconName: "Sparkles",
  },
  {
    id: BigInt(4),
    name: "Carpentry",
    description: "Custom furniture, repairs & installations",
    iconName: "Hammer",
  },
  {
    id: BigInt(5),
    name: "Appliance Repair",
    description: "AC, fridge, washing machine servicing",
    iconName: "Settings",
  },
  {
    id: BigInt(6),
    name: "Gardening",
    description: "Lawn care, pruning, landscaping & more",
    iconName: "Leaf",
  },
];

interface ServiceCategoriesProps {
  categories?: ServiceCategory[];
  isLoading?: boolean;
}

export default function ServiceCategories({
  categories,
  isLoading,
}: ServiceCategoriesProps) {
  const items =
    categories && categories.length > 0 ? categories : fallbackCategories;

  return (
    <section
      id="services"
      className="py-16 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-brand-blue bg-accent px-3 py-1 rounded-full mb-3">
            Our Services
          </span>
          <h2
            id="services-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Explore Top Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Expert professionals for every home need, available at your
            doorstep.
          </p>
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-12"
            data-ocid="services.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            data-ocid="services.list"
          >
            {items.map((cat, i) => {
              const Icon = iconMap[cat.iconName] ?? Wrench;
              const colorClass = iconColors[i % iconColors.length];
              return (
                <div
                  key={String(cat.id)}
                  className="group bg-white rounded-2xl p-5 md:p-6 shadow-card card-hover cursor-pointer border border-border"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5 text-base">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
