import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { Booking, ServiceProvider, UserProfile } from "../backend.d";
import { BookingStatus, ProviderStatus } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

function bookingStatusBadge(status: BookingStatus) {
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

function providerStatusBadge(status: ProviderStatus) {
  const map: Record<ProviderStatus, { label: string; className: string }> = {
    [ProviderStatus.pending]: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    [ProviderStatus.approved]: {
      label: "Approved",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    [ProviderStatus.rejected]: {
      label: "Rejected",
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

function BookingsTab() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["allBookings"],
    queryFn: async () => (actor ? actor.getAllBookings() : []),
    enabled: !!actor,
  });

  const handleStatusChange = async (
    bookingId: bigint,
    status: BookingStatus,
  ) => {
    if (!actor) return;
    try {
      await actor.updateBookingStatus(bookingId, status);
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      toast.success("Booking status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex justify-center py-16"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-7 w-7 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        No bookings found.
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b, i) => (
            <TableRow key={String(b.id)} data-ocid={`admin.item.${i + 1}`}>
              <TableCell className="font-medium">{b.serviceName}</TableCell>
              <TableCell className="text-sm">{b.date}</TableCell>
              <TableCell className="text-sm">{b.time}</TableCell>
              <TableCell className="text-sm max-w-[120px] truncate">
                {b.address}
              </TableCell>
              <TableCell className="text-sm max-w-[120px] truncate">
                {b.problemNotes}
              </TableCell>
              <TableCell>{bookingStatusBadge(b.status)}</TableCell>
              <TableCell>
                <Select
                  value={b.status}
                  onValueChange={(val) =>
                    handleStatusChange(b.id, val as BookingStatus)
                  }
                >
                  <SelectTrigger
                    className="h-8 w-32 text-xs"
                    data-ocid="admin.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={BookingStatus.pending}>
                      Pending
                    </SelectItem>
                    <SelectItem value={BookingStatus.confirmed}>
                      Confirmed
                    </SelectItem>
                    <SelectItem value={BookingStatus.completed}>
                      Completed
                    </SelectItem>
                    <SelectItem value={BookingStatus.cancelled}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UsersTab() {
  const { actor } = useActor();

  const { data: users, isLoading } = useQuery<UserProfile[]>({
    queryKey: ["allUsers"],
    queryFn: async () => (actor ? actor.getAllUsers() : []),
    enabled: !!actor,
  });

  if (isLoading) {
    return (
      <div
        className="flex justify-center py-16"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-7 w-7 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        No users found.
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u, i) => (
            <TableRow key={`${u.email}-${i}`} data-ocid={`admin.item.${i + 1}`}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-sm">{u.email}</TableCell>
              <TableCell className="text-sm">{u.phone}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize text-xs">
                  {u.role}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ProvidersTab() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const { data: providers, isLoading } = useQuery<ServiceProvider[]>({
    queryKey: ["allProviders"],
    queryFn: async () => (actor ? actor.getAllProviders() : []),
    enabled: !!actor,
  });

  const handleApprove = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.approveProvider(id);
      queryClient.invalidateQueries({ queryKey: ["allProviders"] });
      toast.success("Provider approved.");
    } catch {
      toast.error("Failed to approve provider.");
    }
  };

  const handleReject = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.rejectProvider(id);
      queryClient.invalidateQueries({ queryKey: ["allProviders"] });
      toast.success("Provider rejected.");
    } catch {
      toast.error("Failed to reject provider.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex justify-center py-16"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-7 w-7 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        No service providers found.
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((p, i) => (
            <TableRow key={String(p.id)} data-ocid={`admin.item.${i + 1}`}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-sm">{p.phone}</TableCell>
              <TableCell className="text-sm">{String(p.categoryId)}</TableCell>
              <TableCell>{providerStatusBadge(p.status)}</TableCell>
              <TableCell>
                {p.status === ProviderStatus.pending && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white border-0 text-xs"
                      onClick={() => handleApprove(p.id)}
                      data-ocid={`admin.confirm_button.${i + 1}`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                      onClick={() => handleReject(p.id)}
                      data-ocid={`admin.delete_button.${i + 1}`}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminPanel() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You need admin privileges to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-brand-green" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admin Panel
          </h1>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger
              value="bookings"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <CalendarDays className="h-4 w-4" /> Bookings
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Users className="h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger
              value="providers"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Wrench className="h-4 w-4" /> Providers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          <TabsContent value="providers">
            <ProvidersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
