import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

interface SiteHeaderProps {
  onNavigate?: (page: Page) => void;
}

export default function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate("home");
    setMobileOpen(false);
  };

  const navItems: {
    label: string;
    page?: Page;
    href?: string;
    hasDropdown?: boolean;
  }[] = [
    { label: "Home", page: "home" },
    { label: "Services", href: "#services", hasDropdown: true },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-xs">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl btn-primary">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Home<span className="text-brand-blue">Sathii</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) =>
              item.page ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate?.(item.page!)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors rounded-lg hover:bg-accent"
                  data-ocid="nav.link"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors rounded-lg hover:bg-accent"
                  data-ocid="nav.link"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
              ),
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium text-foreground flex items-center gap-1">
                  <UserCircle className="h-4 w-4 text-brand-blue" />
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-blue hover:bg-accent"
                  onClick={() => onNavigate?.("dashboard")}
                  data-ocid="nav.link"
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-green hover:bg-accent"
                    onClick={() => onNavigate?.("admin")}
                    data-ocid="nav.link"
                  >
                    <ShieldCheck className="h-4 w-4 mr-1" /> Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={handleLogout}
                  data-ocid="nav.secondary_button"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-brand-blue text-brand-blue hover:bg-accent"
                  onClick={() => setAuthOpen(true)}
                  data-ocid="nav.secondary_button"
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className="btn-primary text-white border-0 px-5"
                  onClick={() => setAuthOpen(true)}
                  data-ocid="nav.primary_button"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-border py-4 space-y-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) =>
              item.page ? (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-brand-blue hover:bg-accent rounded-lg transition-colors"
                  onClick={() => {
                    onNavigate?.(item.page!);
                    setMobileOpen(false);
                  }}
                  data-ocid="nav.link"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-brand-blue hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {item.label}
                </a>
              ),
            )}
            <div className="pt-3 flex flex-col gap-2 px-3">
              {isLoggedIn ? (
                <>
                  <p className="text-sm font-medium text-center text-foreground py-1">
                    {user?.name}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-brand-blue text-brand-blue"
                    onClick={() => {
                      onNavigate?.("dashboard");
                      setMobileOpen(false);
                    }}
                    data-ocid="nav.link"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      className="w-full border-brand-green text-brand-green"
                      onClick={() => {
                        onNavigate?.("admin");
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.link"
                    >
                      <ShieldCheck className="h-4 w-4 mr-1" /> Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full text-destructive border-destructive/30"
                    onClick={handleLogout}
                    data-ocid="nav.secondary_button"
                  >
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full border-brand-blue text-brand-blue"
                    onClick={() => {
                      setAuthOpen(true);
                      setMobileOpen(false);
                    }}
                    data-ocid="nav.secondary_button"
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full btn-primary text-white border-0"
                    onClick={() => {
                      setAuthOpen(true);
                      setMobileOpen(false);
                    }}
                    data-ocid="nav.primary_button"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
