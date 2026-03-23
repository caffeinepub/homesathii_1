import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import FeaturedServices from "./components/FeaturedServices";
import FloatingContact from "./components/FloatingContact";
import HeroSection from "./components/HeroSection";
import ServiceCategories from "./components/ServiceCategories";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhyChooseUs from "./components/WhyChooseUs";
import { AuthProvider } from "./context/AuthContext";
import { useFeaturedServices, useServiceCategories } from "./hooks/useQueries";
import AboutUs from "./pages/AboutUs";
import AdminPanel from "./pages/AdminPanel";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";

export type Page = "home" | "dashboard" | "admin" | "about" | "contact";

function HomeContent() {
  const [_searchQuery, setSearchQuery] = useState("");
  const { data: categories, isLoading: categoriesLoading } =
    useServiceCategories();
  const { data: featuredServices, isLoading: servicesLoading } =
    useFeaturedServices();

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex-1">
      <HeroSection onSearch={handleSearch} />
      <ServiceCategories
        categories={categories}
        isLoading={categoriesLoading}
      />
      <WhyChooseUs />
      <FeaturedServices
        services={featuredServices}
        isLoading={servicesLoading}
      />
    </main>
  );
}

function AppContent() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => setPage(p);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader onNavigate={navigate} />
      {page === "home" && <HomeContent />}
      {page === "dashboard" && <Dashboard />}
      {page === "admin" && <AdminPanel />}
      {page === "about" && <AboutUs />}
      {page === "contact" && <ContactUs />}
      <SiteFooter />
      <FloatingContact />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
