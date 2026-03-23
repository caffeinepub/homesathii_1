import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceCategory {
    id: bigint;
    name: string;
    description: string;
    iconName: string;
}
export type Time = bigint;
export interface FeaturedService {
    id: bigint;
    categoryId: bigint;
    name: string;
    currency: string;
    rating: number;
    priceMax: bigint;
    priceMin: bigint;
    reviewCount: bigint;
}
export type Principal = Principal;
export interface Booking {
    id: bigint;
    status: BookingStatus;
    serviceName: string;
    userId: Principal;
    date: string;
    createdAt: Time;
    time: string;
    problemNotes: string;
    address: string;
    serviceId: bigint;
}
export interface ServiceProvider {
    id: bigint;
    categoryId: bigint;
    status: ProviderStatus;
    userId: Principal;
    name: string;
    phone: string;
}
export interface Review {
    id: bigint;
    serviceName: string;
    bookingId: bigint;
    userId: Principal;
    createdAt: Time;
    comment: string;
    rating: bigint;
    serviceId: bigint;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ProviderStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    applyAsProvider(name: string, phone: string, categoryId: bigint): Promise<bigint>;
    approveProvider(providerId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelBooking(bookingId: bigint): Promise<void>;
    createBooking(serviceId: bigint, serviceName: string, date: string, time: string, address: string, problemNotes: string): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllProviders(): Promise<Array<ServiceProvider>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerReviews(): Promise<Array<Review>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedServices(): Promise<Array<FeaturedService>>;
    getOwnBookings(): Promise<Array<Booking>>;
    getReviewsForService(serviceId: bigint): Promise<Array<Review>>;
    getServiceCategories(): Promise<Array<ServiceCategory>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginWithEmail(email: string, password: string): Promise<boolean>;
    loginWithPhone(phone: string, password: string): Promise<boolean>;
    register(name: string, phone: string, email: string, password: string): Promise<void>;
    rejectProvider(providerId: bigint): Promise<void>;
    rescheduleBooking(bookingId: bigint, newDate: string, newTime: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitReview(bookingId: bigint, serviceId: bigint, serviceName: string, rating: bigint, comment: string): Promise<bigint>;
    updateBookingStatus(bookingId: bigint, status: BookingStatus): Promise<void>;
    updateProfile(name: string, phone: string, email: string): Promise<void>;
}
