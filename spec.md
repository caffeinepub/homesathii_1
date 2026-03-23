# HomeSathii

## Current State
- Home page with hero, service categories, Why Choose Us, featured services sections
- User auth (register, login via email/phone+password)
- User dashboard with booking history, cancel/reschedule
- Admin panel with tabs: bookings, users, providers
- Provider registration and dashboard (pending admin approval flow)
- Booking creation form (date, time, address, notes)
- Floating Call + WhatsApp contact buttons

## Requested Changes (Diff)

### Add
- Ratings & Reviews system: logged-in users with a completed booking can submit a star rating + comment for a service; reviews display on service cards
- About Us page: team intro, mission, values
- Contact Us page: contact form, phone/address info, embedded Google Maps iframe, "Chat on WhatsApp" button
- Booking confirmation screen shown after a booking is successfully created
- WhatsApp click-to-chat with pre-filled message (expanded from existing floating button)

### Modify
- FeaturedServices cards to show reviews list
- Floating WhatsApp button to include pre-filled message
- SiteHeader/navigation to include About and Contact links
- App routing to support `about` and `contact` pages

### Remove
- Nothing removed

## Implementation Plan
1. Add Review type and backend functions: submitReview, getReviewsForService, getReviewsForBooking
2. Frontend: About Us page component
3. Frontend: Contact Us page with embedded Google Maps iframe and WhatsApp chat button
4. Frontend: Booking confirmation modal/screen after createBooking succeeds
5. Frontend: Review form on completed bookings in user dashboard; review display on service cards
6. Frontend: Update navigation to include About/Contact links
7. Frontend: Update floating WhatsApp button with pre-filled message
