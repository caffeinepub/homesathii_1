import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface BookingModalProps {
  serviceName: string;
  serviceId: bigint;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  serviceName,
  serviceId,
  isOpen,
  onClose,
}: BookingModalProps) {
  const { actor } = useActor();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [problemNotes, setProblemNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setIsSubmitting(true);
    try {
      await actor.createBooking(
        serviceId,
        serviceName,
        date,
        time,
        address,
        problemNotes,
      );
      setSuccess(true);
      toast.success("Booking confirmed! We'll notify the provider.");
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDate("");
    setTime("");
    setAddress("");
    setProblemNotes("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg" data-ocid="booking.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Book: {serviceName}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="h-14 w-14 text-brand-green" />
            <h3 className="font-semibold text-lg text-foreground">
              Booking Confirmed!
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your booking for <strong>{serviceName}</strong> has been
              submitted. A provider will be in touch shortly.
            </p>
            <Button
              className="mt-2 btn-primary text-white border-0"
              onClick={handleClose}
              data-ocid="booking.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="booking-date"
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-3.5 w-3.5" /> Date
                </Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  data-ocid="booking.input"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="booking-time"
                  className="flex items-center gap-1"
                >
                  <Clock className="h-3.5 w-3.5" /> Time
                </Label>
                <Input
                  id="booking-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  data-ocid="booking.input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="booking-address"
                className="flex items-center gap-1"
              >
                <MapPin className="h-3.5 w-3.5" /> Address
              </Label>
              <Textarea
                id="booking-address"
                placeholder="Your full address including city and landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                required
                data-ocid="booking.textarea"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="booking-notes"
                className="flex items-center gap-1"
              >
                <FileText className="h-3.5 w-3.5" /> Problem Description
              </Label>
              <Textarea
                id="booking-notes"
                placeholder="Describe the issue or what service you need..."
                value={problemNotes}
                onChange={(e) => setProblemNotes(e.target.value)}
                rows={3}
                required
                data-ocid="booking.textarea"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-ocid="booking.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary text-white border-0"
                disabled={isSubmitting}
                data-ocid="booking.submit_button"
              >
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
