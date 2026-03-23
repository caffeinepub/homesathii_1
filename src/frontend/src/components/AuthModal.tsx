import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint?: string;
}

export default function AuthModal({ isOpen, onClose, hint }: AuthModalProps) {
  const { login, loginWithPhone, register } = useAuth();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let ok: boolean;
      if (loginMethod === "email") {
        ok = await login(loginEmail, loginPassword);
      } else {
        ok = await loginWithPhone(loginPhone, loginPassword);
      }
      if (ok) {
        toast.success("Logged in successfully!");
        onClose();
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(signupName, signupPhone, signupEmail, signupPassword);
      toast.success("Account created successfully!");
      onClose();
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="auth.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-center">
            Welcome to HomeSathii
          </DialogTitle>
          {hint && (
            <p className="text-sm text-center text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mt-2">
              {hint}
            </p>
          )}
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" data-ocid="auth.tab">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" data-ocid="auth.tab">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login" className="mt-4">
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                size="sm"
                variant={loginMethod === "email" ? "default" : "outline"}
                className={
                  loginMethod === "email"
                    ? "btn-primary text-white border-0 flex-1"
                    : "flex-1"
                }
                onClick={() => setLoginMethod("email")}
                data-ocid="auth.toggle"
              >
                <Mail className="h-4 w-4 mr-1" /> Email
              </Button>
              <Button
                type="button"
                size="sm"
                variant={loginMethod === "phone" ? "default" : "outline"}
                className={
                  loginMethod === "phone"
                    ? "btn-primary text-white border-0 flex-1"
                    : "flex-1"
                }
                onClick={() => setLoginMethod("phone")}
                data-ocid="auth.toggle"
              >
                <Phone className="h-4 w-4 mr-1" /> Phone
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                    data-ocid="auth.input"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="login-phone">Phone Number</Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                    autoComplete="tel"
                    data-ocid="auth.input"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  data-ocid="auth.input"
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-primary text-white border-0"
                disabled={isSubmitting}
                data-ocid="auth.submit_button"
              >
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Rahul Sharma"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  autoComplete="name"
                  data-ocid="auth.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  data-ocid="auth.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  autoComplete="email"
                  data-ocid="auth.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Create Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  data-ocid="auth.input"
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-primary text-white border-0"
                disabled={isSubmitting}
                data-ocid="auth.submit_button"
              >
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
