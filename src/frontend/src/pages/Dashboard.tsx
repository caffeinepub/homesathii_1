import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarClock,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  PenLine,
  Phone,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Booking } from "../backend.d";
import { BookingStatus } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

function statusBadge(status: BookingStatus) {
  const map: Record<BookingStatus, { label: string; className: string }> = {
    [BookingStatus.pending]: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    [BookingStatus.confirmed]: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    [BookingStatus.completed]: {
      label: "Completed",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    [BookingStatus.cancelled]: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };
  const cfg = map[status];
  return (
    <Badge variant="outline" className={`${cfg.className} text-xs font-medium`}>
      {cfg.label}
    </Badge>
  );
}

function RescheduleModal({
  booking,
  isOpen,
  onClose,
  onReschedule,
}: {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (newDate: string, newTime: string) => Promise<void>;
}) {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onReschedule(date, time);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm" data-ocid="reschedule.dialog">
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="reschedule-date">New Date</Label>
            <Input
              id="reschedule-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              data-ocid="reschedule.input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reschedule-time">New Time</Label>
            <Input
              id="reschedule-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              data-ocid="reschedule.input"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="reschedule.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary text-white border-0"
              disabled={saving}
              data-ocid="reschedule.submit_button"
            >
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ReviewModal({
  booking,
  isOpen,
  onClose,
  onSubmit,
}: {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}) {
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(rating, comment);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm" data-ocid="review.dialog">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Service: <strong>{booking.serviceName}</strong>
            </p>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1" data-ocid="review.toggle">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  className="focus:outline-none"
                  aria-label={`${n} star`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      n <= (hovered || rating)
                        ? "fill-brand-star text-brand-star"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="review-comment">Comment</Label>
            <Textarea
              id="review-comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              data-ocid="review.textarea"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="review.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary text-white border-0"
              disabled={saving}
              data-ocid="review.submit_button"
            >
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {saving ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Dashboard() {
  const { user, refreshProfile } = useAuth();
  const { actor } = useActor();
  const queryClient = useQueryClient();

  // Profile edit state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? "");
  const [editPhone, setEditPhone] = useState(user?.phone ?? "");
  const [editEmail, setEditEmail] = useState(user?.email ?? "");
  const [savingProfile, setSavingProfile] = useState(false);

  // Reschedule modal
  const [rescheduleBooking, setRescheduleBooking] = useState<Booking | null>(
    null,
  );

  // Review modal
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["ownBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOwnBookings();
    },
    enabled: !!actor,
  });

  const { data: myReviews } = useQuery({
    queryKey: ["callerReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerReviews();
    },
    enabled: !!actor,
  });

  const reviewedBookingIds = new Set([
    ...(myReviews?.map((r) => String(r.bookingId)) ?? []),
    ...reviewedIds,
  ]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSavingProfile(true);
    try {
      await actor.updateProfile(editName, editPhone, editEmail);
      await refreshProfile();
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancel = async (bookingId: bigint) => {
    if (!actor) return;
    try {
      await actor.cancelBooking(bookingId);
      queryClient.invalidateQueries({ queryKey: ["ownBookings"] });
      toast.success("Booking cancelled.");
    } catch {
      toast.error("Failed to cancel booking.");
    }
  };

  const handleReschedule = async (
    bookingId: bigint,
    newDate: string,
    newTime: string,
  ) => {
    if (!actor) return;
    await actor.rescheduleBooking(bookingId, newDate, newTime);
    queryClient.invalidateQueries({ queryKey: ["ownBookings"] });
    toast.success("Booking rescheduled!");
  };

  const handleSubmitReview = async (
    booking: Booking,
    rating: number,
    comment: string,
  ) => {
    if (!actor) return;
    await actor.submitReview(
      booking.id,
      booking.serviceId,
      booking.serviceName,
      BigInt(rating),
      comment,
    );
    setReviewedIds((prev) => new Set([...prev, String(booking.id)]));
    queryClient.invalidateQueries({ queryKey: ["callerReviews"] });
    queryClient.invalidateQueries({
      queryKey: ["reviewsForService", String(booking.serviceId)],
    });
    toast.success("Review submitted! Thank you.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          My Dashboard
        </h1>

        {/* Profile Card */}
        <section
          className="bg-white rounded-2xl border border-border shadow-card p-6 mb-8"
          data-ocid="dashboard.panel"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full btn-primary flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-foreground">
                  {user?.name}
                </h2>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role} Account
                </p>
              </div>
            </div>
            {!editing && (
              <Button
                variant="outline"
                size="sm"
                className="border-brand-blue text-brand-blue"
                onClick={() => {
                  setEditName(user?.name ?? "");
                  setEditPhone(user?.phone ?? "");
                  setEditEmail(user?.email ?? "");
                  setEditing(true);
                }}
                data-ocid="dashboard.edit_button"
              >
                <PenLine className="h-4 w-4 mr-1" /> Edit Profile
              </Button>
            )}
          </div>

          {editing ? (
            <form
              onSubmit={handleSaveProfile}
              className="grid sm:grid-cols-3 gap-4 mt-2"
            >
              <div className="space-y-1">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  data-ocid="dashboard.input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                  data-ocid="dashboard.input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  data-ocid="dashboard.input"
                />
              </div>
              <div className="sm:col-span-3 flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(false)}
                  data-ocid="dashboard.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-primary text-white border-0"
                  disabled={savingProfile}
                  data-ocid="dashboard.save_button"
                >
                  {savingProfile && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {savingProfile ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user?.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user?.email}</span>
              </div>
            </div>
          )}
        </section>

        {/* Bookings */}
        <section data-ocid="dashboard.panel">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock className="h-5 w-5 text-brand-blue" />
            <h2 className="font-display text-xl font-bold text-foreground">
              My Bookings
            </h2>
          </div>

          {bookingsLoading ? (
            <div
              className="flex justify-center py-10"
              data-ocid="dashboard.loading_state"
            >
              <Loader2 className="h-7 w-7 animate-spin text-brand-blue" />
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div
              className="text-center py-12 bg-white rounded-2xl border border-border"
              data-ocid="dashboard.empty_state"
            >
              <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No bookings yet. Book a service to get started!
              </p>
            </div>
          ) : (
            <div
              className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
              data-ocid="dashboard.table"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Date &amp; Time</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking, i) => (
                    <TableRow
                      key={String(booking.id)}
                      data-ocid={`dashboard.item.${i + 1}`}
                    >
                      <TableCell className="font-medium">
                        {booking.serviceName}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{booking.date}</div>
                        <div className="text-muted-foreground">
                          {booking.time}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm max-w-[160px]">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                          <span className="truncate">{booking.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{statusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {(booking.status === BookingStatus.pending ||
                            booking.status === BookingStatus.confirmed) && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                              onClick={() => handleCancel(booking.id)}
                              data-ocid={`dashboard.delete_button.${i + 1}`}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Cancel
                            </Button>
                          )}
                          {booking.status === BookingStatus.pending && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-brand-blue border-brand-blue/30 hover:bg-accent text-xs"
                              onClick={() => setRescheduleBooking(booking)}
                              data-ocid={`dashboard.edit_button.${i + 1}`}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />{" "}
                              Reschedule
                            </Button>
                          )}
                          {booking.status === BookingStatus.completed &&
                            !reviewedBookingIds.has(String(booking.id)) && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-brand-star border-yellow-300 hover:bg-yellow-50 text-xs"
                                onClick={() => setReviewBooking(booking)}
                                data-ocid={`dashboard.edit_button.${i + 1}`}
                              >
                                <Star className="h-3.5 w-3.5 mr-1" /> Review
                              </Button>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>

      {rescheduleBooking && (
        <RescheduleModal
          booking={rescheduleBooking}
          isOpen={true}
          onClose={() => setRescheduleBooking(null)}
          onReschedule={(d, t) => handleReschedule(rescheduleBooking.id, d, t)}
        />
      )}

      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          isOpen={true}
          onClose={() => setReviewBooking(null)}
          onSubmit={(rating, comment) =>
            handleSubmitReview(reviewBooking, rating, comment)
          }
        />
      )}
    </div>
  );
}
