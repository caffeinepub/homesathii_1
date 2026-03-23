import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Review = {
    id : Nat;
    bookingId : Nat;
    userId : Principal.Principal;
    serviceId : Nat;
    serviceName : Text;
    rating : Nat; // 1-5
    comment : Text;
    createdAt : Time.Time;
  };

  // User Profile Type
  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
    role : Text; // "user" or "admin"
  };

  // Service Category
  type ServiceCategory = {
    id : Nat;
    name : Text;
    description : Text;
    iconName : Text;
  };

  // Featured Service
  type FeaturedService = {
    id : Nat;
    name : Text;
    categoryId : Nat;
    rating : Float;
    reviewCount : Nat;
    priceMin : Nat;
    priceMax : Nat;
    currency : Text;
  };

  // Service Provider Status
  type ProviderStatus = {
    #pending;
    #approved;
    #rejected;
  };

  // Service Provider
  type ServiceProvider = {
    id : Nat;
    userId : Principal.Principal;
    name : Text;
    phone : Text;
    categoryId : Nat;
    status : ProviderStatus;
  };

  // Booking Status
  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  // Booking
  type Booking = {
    id : Nat;
    userId : Principal.Principal;
    serviceId : Nat;
    serviceName : Text;
    date : Text;
    time : Text;
    address : Text;
    problemNotes : Text;
    status : BookingStatus;
    createdAt : Time.Time;
  };

  // State
  let userProfiles = Map.empty<Principal.Principal, UserProfile>();
  let userPasswords = Map.empty<Principal.Principal, Text>(); // In production, hash passwords
  let emailToUser = Map.empty<Text, Principal.Principal>();
  let phoneToUser = Map.empty<Text, Principal.Principal>();
  
  var nextProviderId : Nat = 1;
  let serviceProviders = Map.empty<Nat, ServiceProvider>();
  let userToProvider = Map.empty<Principal.Principal, Nat>();
  
  var nextBookingId : Nat = 1;
  let bookings = Map.empty<Nat, Booking>();

  var nextReviewId : Nat = 1;
  let reviews = Map.empty<Nat, Review>();
  let bookingToReview = Map.empty<Nat, Nat>();
  let serviceToReviews = Map.empty<Nat, [Nat]>(); // Map serviceId to list of review IDs

  let serviceCategories : [ServiceCategory] = [
    {
      id = 1;
      name = "Plumbing";
      description = "Help with leaks, clogs, or installing new fixtures.";
      iconName = "plumbing";
    },
    {
      id = 2;
      name = "Electrical";
      description = "Install new outlets, lights, or fix wiring issues.";
      iconName = "electrical";
    },
    {
      id = 3;
      name = "Cleaning";
      description = "Home cleaning, carpet cleaning, and more.";
      iconName = "cleaning";
    },
    {
      id = 4;
      name = "Painting";
      description = "Interior and exterior painting services.";
      iconName = "painting";
    },
    {
      id = 5;
      name = "Carpentry";
      description = "Furniture assembly, repairs, and custom work.";
      iconName = "carpentry";
    },
  ];

  let featuredServices : [FeaturedService] = [
    {
      id = 1;
      name = "Faucet Replacement";
      categoryId = 1;
      rating = 4.8;
      reviewCount = 108;
      priceMin = 1200;
      priceMax = 3000;
      currency = "INR";
    },
    {
      id = 2;
      name = "Ceiling Fan Installation";
      categoryId = 2;
      rating = 4.7;
      reviewCount = 87;
      priceMin = 500;
      priceMax = 1200;
      currency = "INR";
    },
    {
      id = 3;
      name = "House Deep Cleaning";
      categoryId = 3;
      rating = 4.9;
      reviewCount = 145;
      priceMin = 2500;
      priceMax = 6000;
      currency = "INR";
    },
    {
      id = 4;
      name = "Wall Painting";
      categoryId = 4;
      rating = 4.6;
      reviewCount = 92;
      priceMin = 1500;
      priceMax = 4000;
      currency = "INR";
    },
    {
      id = 5;
      name = "Door Repair";
      categoryId = 5;
      rating = 4.5;
      reviewCount = 54;
      priceMin = 800;
      priceMax = 2000;
      currency = "INR";
    },
  ];

  // Public queries - no auth needed for browsing
  public query func getServiceCategories() : async [ServiceCategory] {
    serviceCategories;
  };

  public query func getFeaturedServices() : async [FeaturedService] {
    featuredServices;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal.Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // User Registration
  public shared ({ caller }) func register(name : Text, phone : Text, email : Text, password : Text) : async () {
    // Check if email or phone already exists
    switch (emailToUser.get(email)) {
      case (?_) { Runtime.trap("Email already registered") };
      case null {};
    };
    switch (phoneToUser.get(phone)) {
      case (?_) { Runtime.trap("Phone already registered") };
      case null {};
    };

    let profile : UserProfile = {
      name = name;
      phone = phone;
      email = email;
      role = "user";
    };

    userProfiles.add(caller, profile);
    userPasswords.add(caller, password);
    emailToUser.add(email, caller);
    phoneToUser.add(phone, caller);

    // Assign user role
    AccessControl.assignRole(accessControlState, caller, caller, #user);
  };

  // Login with email
  public shared ({ caller }) func loginWithEmail(email : Text, password : Text) : async Bool {
    switch (emailToUser.get(email)) {
      case (?user) {
        switch (userPasswords.get(user)) {
          case (?storedPassword) {
            if (storedPassword == password) {
              true;
            } else {
              Runtime.trap("Invalid password");
            };
          };
          case null { Runtime.trap("User not found") };
        };
      };
      case null { Runtime.trap("Email not registered") };
    };
  };

  // Login with phone
  public shared ({ caller }) func loginWithPhone(phone : Text, password : Text) : async Bool {
    switch (phoneToUser.get(phone)) {
      case (?user) {
        switch (userPasswords.get(user)) {
          case (?storedPassword) {
            if (storedPassword == password) {
              true;
            } else {
              Runtime.trap("Invalid password");
            };
          };
          case null { Runtime.trap("User not found") };
        };
      };
      case null { Runtime.trap("Phone not registered") };
    };
  };

  // Update own profile
  public shared ({ caller }) func updateProfile(name : Text, phone : Text, email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          name = name;
          phone = phone;
          email = email;
          role = profile.role;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case null { Runtime.trap("Profile not found") };
    };
  };

  // Service Provider Management
  public shared ({ caller }) func applyAsProvider(name : Text, phone : Text, categoryId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can apply as providers");
    };

    // Check if user already has a provider application
    switch (userToProvider.get(caller)) {
      case (?_) { Runtime.trap("You already have a provider application") };
      case null {};
    };

    let provider : ServiceProvider = {
      id = nextProviderId;
      userId = caller;
      name = name;
      phone = phone;
      categoryId = categoryId;
      status = #pending;
    };

    serviceProviders.add(nextProviderId, provider);
    userToProvider.add(caller, nextProviderId);
    let providerId = nextProviderId;
    nextProviderId += 1;
    providerId;
  };

  // Admin: Approve provider
  public shared ({ caller }) func approveProvider(providerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve providers");
    };

    switch (serviceProviders.get(providerId)) {
      case (?provider) {
        let updatedProvider : ServiceProvider = {
          id = provider.id;
          userId = provider.userId;
          name = provider.name;
          phone = provider.phone;
          categoryId = provider.categoryId;
          status = #approved;
        };
        serviceProviders.add(providerId, updatedProvider);
      };
      case null { Runtime.trap("Provider not found") };
    };
  };

  // Admin: Reject provider
  public shared ({ caller }) func rejectProvider(providerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject providers");
    };

    switch (serviceProviders.get(providerId)) {
      case (?provider) {
        let updatedProvider : ServiceProvider = {
          id = provider.id;
          userId = provider.userId;
          name = provider.name;
          phone = provider.phone;
          categoryId = provider.categoryId;
          status = #rejected;
        };
        serviceProviders.add(providerId, updatedProvider);
      };
      case null { Runtime.trap("Provider not found") };
    };
  };

  // Admin: Get all providers
  public query ({ caller }) func getAllProviders() : async [ServiceProvider] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all providers");
    };

    serviceProviders.values().toArray();
  };

  // Booking Management
  public shared ({ caller }) func createBooking(
    serviceId : Nat,
    serviceName : Text,
    date : Text,
    time : Text,
    address : Text,
    problemNotes : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };

    let booking : Booking = {
      id = nextBookingId;
      userId = caller;
      serviceId = serviceId;
      serviceName = serviceName;
      date = date;
      time = time;
      address = address;
      problemNotes = problemNotes;
      status = #pending;
      createdAt = Time.now();
    };

    bookings.add(nextBookingId, booking);
    let bookingId = nextBookingId;
    nextBookingId += 1;
    bookingId;
  };

  // Get own bookings
  public query ({ caller }) func getOwnBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view bookings");
    };

    let userBookings = bookings.values().filter(
      func(b : Booking) : Bool { b.userId == caller }
    );
    userBookings.toArray();
  };

  // Cancel own booking
  public shared ({ caller }) func cancelBooking(bookingId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can cancel bookings");
    };

    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (booking.userId != caller) {
          Runtime.trap("Unauthorized: Can only cancel your own bookings");
        };

        let updatedBooking : Booking = {
          id = booking.id;
          userId = booking.userId;
          serviceId = booking.serviceId;
          serviceName = booking.serviceName;
          date = booking.date;
          time = booking.time;
          address = booking.address;
          problemNotes = booking.problemNotes;
          status = #cancelled;
          createdAt = booking.createdAt;
        };
        bookings.add(bookingId, updatedBooking);
      };
      case null { Runtime.trap("Booking not found") };
    };
  };

  // Reschedule own booking
  public shared ({ caller }) func rescheduleBooking(bookingId : Nat, newDate : Text, newTime : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reschedule bookings");
    };

    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (booking.userId != caller) {
          Runtime.trap("Unauthorized: Can only reschedule your own bookings");
        };

        let updatedBooking : Booking = {
          id = booking.id;
          userId = booking.userId;
          serviceId = booking.serviceId;
          serviceName = booking.serviceName;
          date = newDate;
          time = newTime;
          address = booking.address;
          problemNotes = booking.problemNotes;
          status = booking.status;
          createdAt = booking.createdAt;
        };
        bookings.add(bookingId, updatedBooking);
      };
      case null { Runtime.trap("Booking not found") };
    };
  };

  // Admin: Get all bookings
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };

    bookings.values().toArray();
  };

  // Admin: Update booking status
  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, status : BookingStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };

    switch (bookings.get(bookingId)) {
      case (?booking) {
        let updatedBooking : Booking = {
          id = booking.id;
          userId = booking.userId;
          serviceId = booking.serviceId;
          serviceName = booking.serviceName;
          date = booking.date;
          time = booking.time;
          address = booking.address;
          problemNotes = booking.problemNotes;
          status = status;
          createdAt = booking.createdAt;
        };
        bookings.add(bookingId, updatedBooking);
      };
      case null { Runtime.trap("Booking not found") };
    };
  };

  // Admin: Get all users
  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    userProfiles.values().toArray();
  };


  // ============================
  // ===== Review Handling ======
  // ============================

  public shared ({ caller }) func submitReview(
    bookingId : Nat,
    serviceId : Nat,
    serviceName : Text,
    rating : Nat,
    comment : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit reviews");
    };

    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5 (inclusive)");
    };

    switch (bookings.get(bookingId)) {
      case (?booking) {
        if (booking.userId != caller) {
          Runtime.trap("Unauthorized: Can only review your own bookings");
        };
        switch (booking.status) {
          case (#completed) {
            // Ensure single review per booking
            if (bookingToReview.containsKey(bookingId)) {
              Runtime.trap("Already reviewed this booking. Edit or delete previous review.");
            };

            let newReview : Review = {
              id = nextReviewId;
              bookingId;
              userId = caller;
              serviceId;
              serviceName;
              rating;
              comment;
              createdAt = Time.now();
            };

            reviews.add(nextReviewId, newReview);
            bookingToReview.add(bookingId, nextReviewId);
            
            // Link review to service
            let currentReviewIds = switch (serviceToReviews.get(serviceId)) {
              case (?existing) { existing };
              case (null) { [] };
            };

            let updatedReviewIds = currentReviewIds.concat([nextReviewId]);
            serviceToReviews.add(serviceId, updatedReviewIds);
            
            let reviewId = nextReviewId;
            nextReviewId += 1;
            reviewId;
          };
          case (_) {
            Runtime.trap("Can only review completed bookings");
          };
        };
      };
      case (null) {
        Runtime.trap("Unknown booking. Please contact support if this is an error.");
      };
    };
  };

  public query ({ caller }) func getReviewsForService(serviceId : Nat) : async [Review] {
    switch (serviceToReviews.get(serviceId)) {
      case (?reviewIds) {
        // Map reviewIds to actual reviews, filter out deleted ones
        let filteredReviews = reviewIds.filter(
          func(reviewId) {
            reviews.containsKey(reviewId);
          }
        );

        let serviceReviews = filteredReviews.map(
          func(reviewId) {
            switch (reviews.get(reviewId)) {
              case (?review) { review };
              case (null) { Runtime.trap("Deleted Review returned in list") };
            };
          }
        );

        // Sort reviews by createdAt descending (newest first)
        let sortedReviews = serviceReviews.sort(
          func(a, b) {
            if (a.createdAt > b.createdAt) { #less } else { #greater };
          }
        );

        sortedReviews;
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getCallerReviews() : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can see your review history");
    };

    let userReviews = reviews.filter(
      func(_id, review) {
        review.userId == caller;
      }
    );

    let userReviewIter = userReviews.values();

    let sortedReviews = userReviewIter.sort(
      func(a, b) {
        if (a.createdAt > b.createdAt) { #less } else { #greater };
      }
    ).toArray();
    sortedReviews;
  };
};
