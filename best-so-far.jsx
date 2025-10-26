<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventsta: Next Gen</title>
    
    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- Google Font: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    
    <style>
        /* Base styles */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0a0a0a; /* Near-black background */
            color: #e5e5e5; /* Light neutral text */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #404040; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #525252; }

        /* --- HERO SLIDER STYLES (Homepage) --- */
        
        /* Main slider container */
        .hero-slider-container {
            position: relative;
            width: 100%;
            height: 90vh; 
            overflow: hidden;
        }

        /* Main slide */
        .hero-slide {
            position: absolute;
            inset: 0;
            opacity: 0;
            transform: scale(1.05);
            transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .hero-slide.active {
            opacity: 1;
            transform: scale(1);
            z-index: 10;
        }
        
        /* Inner image (slider-in-slider for Homepage) */
        .inner-image-container img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 2.5s ease-in-out;
            will-change: opacity, transform;
        }
        .inner-image-container img.inner-active {
            opacity: 1;
        }

        /* Ken Burns Animations (for Homepage) */
        @keyframes kenburns-tl {
            0% { transform: scale(1.1) translate(0, 0); }
            100% { transform: scale(1.25) translate(-10%, -5%); }
        }
        @keyframes kenburns-br {
            0% { transform: scale(1.1) translate(0, 0); }
            100% { transform: scale(1.25) translate(10%, 5%); }
        }
        @keyframes kenburns-center {
            0% { transform: scale(1.1); }
            100% { transform: scale(1.25); }
        }
        
        /* Assign animations */
        .inner-image-container img.anim-1 { animation: kenburns-tl 12s ease-in-out forwards; }
        .inner-image-container img.anim-2 { animation: kenburns-br 12s ease-in-out forwards; }
        .inner-image-container img.anim-3 { animation: kenburns-center 12s ease-in-out forwards; }
        
        /* Slider Pagination */
        .slider-dot {
            height: 10px;
            width: 10px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 99px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
        }
        .slider-dot.active {
            width: 3rem; /* 48px */
            background: rgba(255, 255, 255, 1);
        }
        .slider-dot:hover {
            background: rgba(255, 255, 255, 0.7);
        }

        /* --- END HERO SLIDER STYLES --- */
        
        /* Modal animations */
        .modal {
            animation: modal-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modal-fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        
        /* Subtle text-shadow for readability */
        .text-glow {
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
        }
        
        /* Card hover animation */
        .event-card {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid #262626; 
        }
        .event-card:hover {
            border-color: #a855f7; 
            box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.1), 0 4px 6px -2px rgba(168, 85, 247, 0.05);
            transform: translateY(-4px);
        }

        /* "Next-Gen" Button Style */
        .btn-nextgen-side {
            background-color: #1a1a1a; 
            color: #a3a3a3;
            transition: all 0.3s ease;
        }
        .event-card:hover .btn-nextgen-side {
            background-color: #a855f7; 
            color: #ffffff;
        }
        
        /* Active tab style */
        .tab-btn.active {
            color: #f5f5f5;
            border-color: #a855f7;
        }
        
        /* Quantity selector input */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
</head>
<body class="bg-[#0a0a0a]">

    <!-- Main Application Container -->
    <div id="app" class="min-h-screen w-full">
        
        <!-- Header / Navigation -->
        <header class="fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-black/50 backdrop-blur-lg border-b border-neutral-800/50">
            <nav class="container mx-auto max-w-7xl px-6 flex items-center justify-between">
                <!-- Logo -->
                <a href="#" id="logo-link" class="text-3xl font-black tracking-tighter text-white text-glow">
                    Eventsta<span class="text-purple-500">.</span>
                </a>
                
                <!-- Nav Links -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="nav-link text-neutral-400 hover:text-white transition-colors duration-200" data-page-target="home">Discover</a>
                    <a href="#" class="nav-link text-neutral-400 hover:text-white transition-colors duration-200" data-page-target="dashboard">Host</a>
                    <a href="#" class="nav-link text-neutral-400 hover:text-white transition-colors duration-200" data-page-target="dashboard">Promote</a>
                </div>
                
                <!-- Auth Button -->
                <div id="auth-container">
                    <button id="signin-btn" class="px-5 py-2 bg-purple-600 text-white text-sm font-semibold rounded-l-full hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/20">
                        Sign In
                    </button>
                    <button id="user-profile-btn" class="hidden h-10 w-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 border border-neutral-700 hover:border-purple-500 transition-all">
                        <i data-lucide="user" class="w-5 h-5"></i>
                    </button>
                </div>
            </nav>
        </header>
        
        <!-- Main Content Area (Pages) -->
        <main id="content-area" class="pt-20">
            
            <!-- ====== HOME PAGE ====== -->
            <div id="page-home" data-page="home">
                
                <!-- NEW Hero Event Slider -->
                <section class="hero-slider-container relative w-full h-[90vh] overflow-hidden">
                    <!-- Slides will be injected here by JS -->
                    <div id="slider-content"></div>
                    
                    <!-- Pagination Dots -->
                    <div id="slider-pagination" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        <!-- Dots will be injected here by JS -->
                    </div>
                </section>
                
                <!-- Upcoming Events Section -->
                <section class="container mx-auto max-w-7xl px-6 py-24">
                    <h2 class="text-4xl font-bold tracking-tight text-white mb-12 text-glow">Upcoming Events</h2>
                    <div id="event-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Event cards will be injected here by JS -->
                    </div>
                </section>
            </div>
            
            <!-- ====== EVENT DETAILS PAGE ====== -->
            <div id="page-event-details" data-page="event-details" class="hidden">
                <!-- Dynamic Content Area -->
                <div id="event-detail-content">
                    <!-- Event details will be injected here by JS -->
                </div>
            </div>
            
            <!-- ====== DASHBOARD PAGE ====== -->
            <div id="page-dashboard" data-page="dashboard" class="hidden">
                <div class="container mx-auto max-w-7xl px-6 py-16">
                    <h1 class="text-4xl font-bold tracking-tight text-white mb-4" id="dashboard-welcome">My Dashboard</h1>
                    <p class="text-neutral-400 mb-12">Manage your tickets, events, and promotions.</p>
                    
                    <!-- Dashboard Tabs -->
                    <div class="border-b border-neutral-800 mb-8">
                        <nav class="flex -mb-px space-x-8">
                            <button class="tab-btn active text-neutral-400 hover:text-white whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm transition-all" data-tab="tickets">
                                My Tickets
                            </button>
                            <button class="tab-btn text-neutral-400 hover:text-white whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm transition-all" data-tab="hosting">
                                My Events
                            </button>
                            <button class="tab-btn text-neutral-400 hover:text-white whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm transition-all" data-tab="promotions">
                                My Promotions
                            </button>
                        </nav>
                    </div>
                    
                    <!-- Tab Content -->
                    <div id="tab-content-container">
                        <!-- My Tickets -->
                        <div id="tab-tickets" class="tab-panel">
                            <div id="purchased-tickets-list" class="space-y-6">
                                <!-- Purchased tickets will be injected here -->
                            </div>
                        </div>
                        
                        <!-- My Events (Hosting) -->
                        <div id="tab-hosting" class="tab-panel hidden">
                            <button id="add-event-btn" class="mb-8 w-full md:w-auto px-6 py-3 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2">
                                <i data-lucide="plus" class="w-4 h-4"></i>
                                <span>Host New Event</span>
                            </button>
                            <div id="my-events-list" class="space-y-6">
                                <!-- Hosted events will be injected here -->
                            </div>
                        </div>
                        
                        <!-- My Promotions -->
                        <div id="tab-promotions" class="tab-panel hidden">
                            <div id="promo-stats-list" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <!-- Promo stats will be injected here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    </div>

    <!-- ====== MODALS (Unchanged) ====== -->

    <!-- Sign In Modal -->
    <div id="signin-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 hidden">
        <!-- Backdrop -->
        <div class="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm" data-modal-close="signin-modal"></div>
        
        <!-- Modal Content -->
        <div class="modal relative z-10 w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-purple-500/10">
            <button data-modal-close="signin-modal" class="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            
            <div class="p-8">
                <h2 class="text-2xl font-bold text-center text-white mb-2">Sign In</h2>
                <p class="text-neutral-400 text-center mb-8">to continue to Eventsta</p>
                
                <div class="space-y-4">
                    <button class="social-login-btn w-full h-12 px-6 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-700 transition-colors" data-provider="google">
                        <i data-lucide="chrome" class="w-5 h-5 mr-3"></i>
                        Continue with Google
                    </button>
                    <button class="social-login-btn w-full h-12 px-6 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-700 transition-colors" data-provider="facebook">
                        <i data-lucide="facebook" class="w-5 h-5 mr-3"></i>
                        Continue with Facebook
                    </button>
                    <button class="social-login-btn w-full h-12 px-6 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-700 transition-colors" data-provider="apple">
                        <i data-lucide="apple" class="w-5 h-5 mr-3"></i>
                        Continue with Apple
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Checkout Modal -->
    <div id="checkout-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 hidden">
        <!-- Backdrop -->
        <div class="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm" data-modal-close="checkout-modal"></div>
        
        <!-- Modal Content -->
        <div class="modal relative z-10 w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden">
            <button data-modal-close="checkout-modal" class="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            
            <!-- View 1: Checkout -->
            <div id="checkout-view-loading" class="p-8">
                <h2 class="text-2xl font-bold text-white mb-6">Checkout</h2>
                <div id="checkout-summary" class="space-y-4 mb-8">
                    <!-- Checkout summary items injected here -->
                </div>
                <div class="border-t border-neutral-800 pt-4 flex justify-between items-center">
                    <span class="text-lg font-semibold text-neutral-300">Total</span>
                    <span id="checkout-total" class="text-2xl font-bold text-white">$0.00</span>
                </div>
            </div>
            
            <!-- View 2: Success -->
            <div id="checkout-view-success" class="p-12 text-center hidden">
                <div class="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check-circle" class="w-12 h-12 text-green-400"></i>
                </div>
                <h2 class="text-3xl font-bold text-white mb-3">Payment Successful!</h2>
                <p class="text-neutral-400 mb-8">Your tickets are confirmed. See you there!</p>
            </div>
            
            <!-- Edge Button 1: Pay Now -->
            <button id="pay-now-btn" class="w-full h-16 px-6 bg-purple-600 text-white text-lg font-semibold rounded-t-none rounded-b-2xl hover:bg-purple-500 transition-all duration-300 flex items-center justify-center space-x-3">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
                <span>Pay Now (One-Click)</span>
            </button>
            
            <!-- Edge Button 2: Done (Success) -->
            <button id="checkout-success-done-btn" data-modal-close="checkout-modal" class="hidden w-full h-16 px-6 bg-purple-600 text-white text-lg font-semibold rounded-t-none rounded-b-2xl hover:bg-purple-500 transition-all duration-300">
                Done
            </button>
        </div>
    </div>
    
    <!-- Add Event Modal -->
    <div id="add-event-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 hidden">
        <!-- Backdrop -->
        <div class="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm" data-modal-close="add-event-modal"></div>
        
        <!-- Modal Content -->
        <div class="modal relative z-10 w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden">
             <button data-modal-close="add-event-modal" class="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <div class="p-8">
                <h2 class="text-2xl font-bold text-white mb-6">Host a New Event</h2>
                <form id="add-event-form" class="space-y-4">
                    <!-- Simple form for demo -->
                    <div>
                        <label for="event-title" class="block text-sm font-medium text-neutral-300 mb-1">Event Title</label>
                        <input type="text" id="event-title" class="w-full h-10 px-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required>
                    </div>
                     <div>
                        <label for="event-date" class="block text-sm font-medium text-neutral-300 mb-1">Date & Time</label>
                        <input type="datetime-local" id="event-date" class="w-full h-10 px-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required>
                    </div>
                     <div>
                        <label for="event-image" class="block text-sm font-medium text-neutral-300 mb-1">Image URL (Main)</label>
                        <input type="url" id="event-image" class="w-full h-10 px-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="https://..." required>
                    </div>
                    <div>
                        <label for="event-promo" class="block text-sm font-medium text-neutral-300 mb-1">Promo Commission (%)</label>
                        <input type="number" id="event-promo" class="w-full h-10 px-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" min="0" max="50" placeholder="e.g., 10" required>
                    </div>
                </form>
            </div>
            <!-- Edge Button for Create Event -->
            <button id="create-event-btn" class="w-full h-16 px-6 bg-purple-600 text-white text-lg font-semibold rounded-t-none rounded-b-2xl hover:bg-purple-500 transition-all duration-300">
                Create Event
            </button>
        </div>
    </div>


    <!-- JavaScript -->
    <script type="module">
        // Initialize Lucide Icons
        lucide.createIcons();
        
        // --- MOCK DATABASE LAYER ---
        const mockDB = {
            // Simulated user data
            users: {
                "user_123": {
                    id: "user_123",
                    name: "Alex Promo",
                    email: "alex@example.com",
                    purchasedTickets: [
                        { id: "t1", eventId: "e2", eventName: "Cybernetic Symphony", ticketType: "GA", qty: 2, purchaseDate: "2025-10-20" },
                        { id: "t2", eventId: "e3", eventName: "Voidcall", ticketType: "VIP", qty: 1, purchaseDate: "2025-10-18" },
                    ],
                    hostedEvents: [
                        { id: "e4", title: "My Underground Rave", date: "2025-12-15T22:00", location: "Secret Warehouse", commission: 15, imageUrls: ["https://placehold.co/1600x900/7c3aed/0a0a0a?text=My+Rave"] }
                    ],
                    promoStats: [
                        { eventId: "e1", eventName: "Cosmic Meadow", promoLink: "eventsta.com/promo/alex-e1", clicks: 450, sales: 32, commissionPct: 10, earned: 159.60 },
                        { eventId: "e2", eventName: "Cybernetic Symphony", promoLink: "eventsta.com/promo/alex-e2", clicks: 120, sales: 8, commissionPct: 12, earned: 47.52 },
                    ]
                }
            },
            
            // Simulated events data
            // *** MODIFIED: imageUrl is now imageUrls (an array) ***
            events: {
                "e1": {
                    id: "e1",
                    title: "Cosmic Meadow",
                    artist: "Orion Sun & The Nebulas",
                    date: "2025-11-15T20:00",
                    location: "Galaxy Arena, Neo-Tokyo",
                    imageUrls: [
                        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1974&q=80",
                        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2070&q=80",
                        "https://images.unsplash.com/photo-1511795409837-0953C103565b?auto=format&fit=crop&w=2070&q=80"
                    ],
                    description: "Journey through sound and space with Orion Sun & The Nebulas. An immersive audiovisual experience unlike any other, blending synthwave, ambient soundscapes, and stunning live visuals.",
                    tickets: [
                        { type: "General Admission", price: 49.99 },
                        { type: "VIP Access", price: 129.99, description: "Includes priority entry, access to VIP lounge, and a limited edition event poster." },
                        { type: "Skybox (4 Guests)", price: 450.00, description: "Private skybox with complimentary drinks." }
                    ],
                    commission: 10
                },
                "e2": {
                    id: "e2",
                    title: "Cybernetic Symphony",
                    artist: "DJ K-Byte",
                    date: "2025-11-22T22:00",
                    location: "Sector 7, Cyber City",
                    imageUrls: [
                        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=2070&q=80",
                        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2070&q=80",
                        "https://images.unsplash.com/photo-1561489396-888724a1543d?auto=format&fit=crop&w=2070&q=80"
                    ],
                    description: "Experience the future of hardstyle. DJ K-Byte drops a 4-hour set in the heart of Cyber City's industrial district. Prepare for sensory overload.",
                    tickets: [
                        { type: "General Admission", price: 39.99 },
                        { type: "Backstage Pass", price: 99.99, description: "Meet DJ K-Byte and get exclusive access." }
                    ],
                    commission: 12
                },
                "e3": {
                    id: "e3",
                    title: "Voidcall",
                    artist: "Etherea & The Void",
                    date: "2025-12-05T21:00",
                    location: "The Abandoned Cathedral",
                    imageUrls: [
                        "https://images.unsplash.com/photo-1583623733274-950bd4a400dc?auto=format&fit=crop&w=2070&q=80",
                        "https://images.unsplash.com/photo-1582736342623-fe3cfa63a010?auto=format&fit=crop&w=2083&q=80",
                        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=2069&q=80"
                    ],
                    description: "A night of darkwave, techno, and experimental electronic music. Dress in black.",
                    tickets: [
                        { type: "General Admission", price: 55.00 },
                    ],
                    commission: 8
                }
            },
            
            // --- API METHODS (Simulated) ---
            
            getFeaturedEvents: function() {
                console.log("DB: Fetching featured events...");
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(Object.values(this.events));
                    }, 500); 
                });
            },
            
            getEventDetails: function(eventId) {
                console.log(`DB: Fetching details for event ${eventId}...`);
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const event = this.events[eventId];
                        if (event) {
                            resolve(event);
                        } else {
                            reject(new Error("Event not found."));
                        }
                    }, 300);
                });
            },
            
            signIn: function(provider) {
                console.log(`DB: Signing in with ${provider}...`);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(this.users["user_123"]); 
                    }, 1000);
                });
            },
            
            purchaseTicket: function(userId, eventId, cart) {
                console.log(`DB: User ${userId} purchasing tickets for ${eventId}`, cart);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log("DB: Purchase complete.");
                        resolve({ success: true, confirmationId: `T-${Math.random().toString(36).substr(2, 9)}` });
                    }, 1500);
                });
            },

            createEvent: function(userId, eventData) {
                 console.log(`DB: User ${userId} creating event`, eventData);
                 return new Promise((resolve) => {
                    setTimeout(() => {
                        const newEventId = `e${Object.keys(this.events).length + 1}`;
                        const newEvent = {
                            id: newEventId,
                            title: eventData.title,
                            date: eventData.date,
                            location: eventData.location,
                            commission: eventData.commission,
                            artist: "Hosted Event",
                            description: "User-hosted event.",
                            // *** MODIFIED: Use new imageUrls format ***
                            imageUrls: [eventData.imageUrl, "https://placehold.co/1600x900/7c3aed/262626?text=Event+Angle+2"],
                            tickets: [{ type: "General Admission", price: 30.00 }] // Simplified
                        };
                        this.events[newEventId] = newEvent;
                        this.users[userId].hostedEvents.push({ ...newEvent }); // Push a copy
                        console.log("DB: Event created.", newEvent);
                        resolve(newEvent);
                    }, 1000);
                 });
            }
        };

        // --- APPLICATION STATE ---
        let state = {
            currentUser: null,
            currentPage: 'home',
            currentEventId: null,
            checkoutCart: {}, 
            // Slider states
            mainSliderInterval: null,
            mainSliderIndex: 0,
            mainInnerSliderIntervals: {}, // Store intervals by slide index
            eventDetailSliderInterval: null, // For the event details page
            MAIN_SLIDER_DURATION: 8000, // 8 seconds per event
            INNER_SLIDER_DURATION: 4000, // 4 seconds per image (for homepage)
            EVENT_DETAIL_SLIDER_DURATION: 5000, // 5 seconds (for event page, matching React)
        };

        // --- DOM ELEMENT REFERENCES ---
        const dom = {
            app: document.getElementById('app'),
            header: document.querySelector('header'),
            contentArea: document.getElementById('content-area'),
            pages: document.querySelectorAll('[data-page]'),
            
            // Auth
            authContainer: document.getElementById('auth-container'),
            signInBtn: document.getElementById('signin-btn'),
            userProfileBtn: document.getElementById('user-profile-btn'),
            
            // Home Page
            sliderContent: document.getElementById('slider-content'), // Changed from sliderTrack
            sliderPagination: document.getElementById('slider-pagination'), // New
            eventGrid: document.getElementById('event-grid'),
            
            // Event Details
            eventDetailPage: document.getElementById('page-event-details'),
            eventDetailContent: document.getElementById('event-detail-content'),
            
            // Dashboard
            dashboardPage: document.getElementById('page-dashboard'),
            dashboardWelcome: document.getElementById('dashboard-welcome'),
            tabButtons: document.querySelectorAll('.tab-btn'),
            tabPanels: document.querySelectorAll('.tab-panel'),
            purchasedTicketsList: document.getElementById('purchased-tickets-list'),
            myEventsList: document.getElementById('my-events-list'),
            promoStatsList: document.getElementById('promo-stats-list'),
            
            // Modals
            modals: document.querySelectorAll('.modal'),
            signInModal: document.getElementById('signin-modal'),
            checkoutModal: document.getElementById('checkout-modal'),
            addEventModal: document.getElementById('add-event-modal'),
            
            // Checkout Modal
            checkoutSummary: document.getElementById('checkout-summary'),
            checkoutTotal: document.getElementById('checkout-total'),
            checkoutViewLoading: document.getElementById('checkout-view-loading'),
            checkoutViewSuccess: document.getElementById('checkout-view-success'),
            payNowBtn: document.getElementById('pay-now-btn'),
            checkoutSuccessDoneBtn: document.getElementById('checkout-success-done-btn'),
            
            // Add Event Modal
            addEventForm: document.getElementById('add-event-form'),
            createEventBtn: document.getElementById('create-event-btn'),
        };

        // --- RENDER FUNCTIONS ---
        
        /**
         * Renders the new hero slider (Homepage)
         */
        function renderSlider(events) {
            if (!dom.sliderContent || !dom.sliderPagination) return;
            dom.sliderContent.innerHTML = '';
            dom.sliderPagination.innerHTML = '';
            
            events.forEach((event, index) => {
                // Create inner image tags
                const innerImagesHTML = event.imageUrls.map((url, imgIndex) => {
                    // Cycle through anim-1, anim-2, anim-3
                    const animClass = `anim-${(imgIndex % 3) + 1}`; 
                    return `<img src="${url}" alt="${event.title} image ${imgIndex + 1}" class="${animClass}" data-index="${imgIndex}">`;
                }).join('');

                // Create main slide
                dom.sliderContent.innerHTML += `
                    <div class="hero-slide w-full h-full" data-index="${index}">
                        <!-- Inner Image Slider (Full Bleed) -->
                        <div class="inner-image-container absolute inset-0 w-full h-full">
                            ${innerImagesHTML}
                        </div>
                        
                        <!-- Gradient Overlay for Readability -->
                        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                        
                        <!-- Content (Overlaid) -->
                        <div class="relative z-10 container mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
                            <div class="w-full md:w-1/2 lg:w-2/5">
                                <h1 class="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 text-glow">${event.title}</h1>
                                <p class="text-2xl lg:text-3xl font-semibold text-purple-400 mb-6">${event.artist}</p>
                                <p class="text-lg text-neutral-300 mb-10">${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • ${event.location}</p>
                                <a href="#" class="event-card-link inline-block px-8 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg font-bold text-white text-center hover:bg-white/20 transition-all duration-300" data-event-id="${event.id}">
                                    Get Tickets
                                </a>
                            </div>
                        </div>
                    </div>
                `;

                // Create pagination dot
                dom.sliderPagination.innerHTML += `
                    <button class="slider-dot" data-index="${index}"></button>
                `;
            });
        }
        
        /**
         * Renders the upcoming event cards
         */
        function renderEventGrid(events) {
            if (!dom.eventGrid) return;
            dom.eventGrid.innerHTML = '';
            events.forEach(event => {
                // Use the *first* image from the array for the grid
                const gridImageUrl = event.imageUrls[0] || 'https://placehold.co/160x160/1a1a1a/404040?text=Event';
                dom.eventGrid.innerHTML += `
                    <!-- Event Card -->
                    <div class="event-card bg-neutral-900 rounded-2xl overflow-hidden flex flex-row shadow-lg cursor-pointer" data-event-id="${event.id}">
                        <!-- Image -->
                        <div class="relative w-32 md:w-40 flex-shrink-0 pointer-events-none">
                            <img src="${gridImageUrl}" alt="${event.title}" class="w-full h-full object-cover absolute inset-0">
                        </div>
                        
                        <!-- Info -->
                        <div class="p-5 md:p-6 flex-grow flex flex-col justify-center overflow-hidden pointer-events-none">
                            <span class="text-sm font-semibold text-purple-400 mb-1 block">${new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                            <h3 class="text-lg md:text-xl font-bold text-white mb-2 truncate">${event.title}</h3>
                            <p class="text-neutral-400 text-sm flex items-center gap-2 truncate">
                                <i data-lucide="map-pin" class="w-4 h-4 text-neutral-500 flex-shrink-0"></i>
                                <span class="truncate">${event.location}</span>
                            </p>
                        </div>
                        
                        <!-- Next-Gen Seamless Button (Right Side) -->
                        <div class="btn-nextgen-side flex-shrink-0 flex items-center justify-center w-16 md:w-20 transition-all pointer-events-none">
                            <i data-lucide="arrow-right" class="w-6 h-6"></i>
                        </div>
                    </div>
                `;
            });
            lucide.createIcons(); // Re-render icons
        }
        
        /**
         * Renders the event details page
         */
        function renderEventDetails(event) {
            state.checkoutCart = {}; // Reset cart on new page load
            
            const ticketOptionsHTML = event.tickets.map(ticket => `
                <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h4 class="text-lg font-semibold text-white">${ticket.type}</h4>
                        <p class="text-neutral-400 text-sm mb-2">${ticket.description || ''}</p>
                        <span class="text-xl font-bold text-purple-400">$${ticket.price.toFixed(2)}</span>
                    </div>
                    <!-- Quantity Selector -->
                    <div class="flex-shrink-0 w-full sm:w-auto">
                        <div class="flex items-center border border-neutral-700 rounded-full p-1" data-ticket-type="${ticket.type}" data-ticket-price="${ticket.price}">
                            <button class="qty-btn qty-decrease w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors" ${state.checkoutCart[ticket.type] ? '' : 'disabled'}>
                                <i data-lucide="minus" class="w-5 h-5 mx-auto"></i>
                            </button>
                            <input type="number" readonly value="${state.checkoutCart[ticket.type] || 0}" class="qty-input w-16 h-10 bg-transparent text-white text-center font-bold text-lg outline-none border-none focus:ring-0">
                            <button class="qty-btn qty-increase w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors">
                                <i data-lucide="plus" class="w-5 h-5 mx-auto"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            // --- NEW: Generate HTML for blurred and sharp images ---

            // Create inner div tags for the *blurred* slider
            const blurredImagesHTML = event.imageUrls.map((url, imgIndex) => {
                return `<div 
                            class="event-detail-blur-img absolute inset-0 bg-cover bg-center filter blur-2xl transition-opacity duration-1000 ease-in-out" 
                            style="background-image: url(${url}); opacity: 0;" 
                            data-index="${imgIndex}">
                        </div>`;
            }).join('');
            
            // Create inner image tags for the *sharp* slider
            const sharpImagesHTML = event.imageUrls.map((url, imgIndex) => {
                // No more anim-class, just a simple img tag with a class to select later
                return `<img src="${url}" alt="${event.title} view ${imgIndex + 1}" 
                             class="event-detail-sharp-img absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out" 
                             style="opacity: 0;" 
                             data-index="${imgIndex}">`;
            }).join('');

            // Get formatted date (from React code)
            const formattedDate = new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

            // --- NEW: Updated HTML structure matching the React component ---
            dom.eventDetailContent.innerHTML = `
                <!-- NEW: 1. Fixed Blurred Background Layer -->
                <div id="event-detail-blur-background" class="fixed inset-0 scale-110 z-[-1]">
                    ${blurredImagesHTML}
                </div>
                
                <!-- NEW: 2. Fixed Dark Overlay -->
                <div class="fixed inset-0 bg-black/70 z-[-1]"></div>

                <!-- 3. Hero Section (Now just content, no background) -->
                <section class="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
                    <!-- Content Layer -->
                    <div class="relative z-10 container mx-auto max-w-7xl px-6 h-full flex flex-col items-end gap-8 pb-12 md:flex-row md:pb-20">
                        
                        <!-- Main Image Slider -->
                        <div id="event-detail-sharp-container" class="relative aspect-[3/4] h-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
                            ${sharpImagesHTML}
                        </div>
                        
                        <!-- Event Details Text -->
                        <div class="md:w-2/3">
                            <h1 class="text-4xl font-bold tracking-tighter text-white md:text-7xl">${event.title}</h1>
                            <h2 class="mt-1 text-2xl font-light text-purple-400 md:text-4xl">${event.artist}</h2>
                            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-lg text-neutral-200 space-y-2 sm:space-y-0">
                                <div class="flex items-center space-x-2">
                                    <i data-lucide="calendar" class="w-5 h-5"></i>
                                    <span>${formattedDate}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <i data-lucide="map-pin" class="w-5 h-5"></i>
                                    <span>${event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Content Section (Tickets, About, etc.) -->
                <div class="container mx-auto max-w-7xl px-6 py-16">
                    <div class="flex flex-col lg:flex-row gap-16">
                        <!-- Left Column (Event Info) -->
                        <div class="w-full lg:w-2/3">
                            <!-- NEW: Combined Info Card -->
                            <div class="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
                                <h2 class="text-2xl font-bold text-white mb-6">About This Event</h2>
                                
                                <!-- Date & Location Info -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div class="flex items-start gap-4">
                                        <i data-lucide="calendar" class="w-8 h-8 text-purple-400 flex-shrink-0 mt-1"></i>
                                        <div>
                                            <h3 class="text-lg font-semibold text-white">Date & Time</h3>
                                            <p class="text-neutral-400">${new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-4">
                                        <i data-lucide="map-pin" class="w-8 h-8 text-purple-400 flex-shrink-0 mt-1"></i>
                                        <div>
                                            <h3 class="text-lg font-semibold text-white">Location</h3>
                                            <p class="text-neutral-400">${event.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Divider -->
                                <div class="border-t border-neutral-700 my-6"></div>
                                
                                <!-- Description -->
                                <p class="text-neutral-300 leading-relaxed">${event.description}</p>
                            </div>
                        </div>
                        
                        <!-- Right Column (Tickets) (Unchanged) -->
                        <div class="w-full lg:w-1/3">
                            <div class="sticky top-28 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
                                <h2 class="text-2xl font-bold text-white mb-6">Select Tickets</h2>
                                <div class="space-y-4 mb-6">
                                    ${ticketOptionsHTML}
                                </div>
                                
                                <div class="border-t border-neutral-800 pt-4 flex justify-between items-center mb-6">
                                    <span class="text-lg font-semibold text-neutral-300">Total</span>
                                    <span id="event-total-price" class="text-3xl font-bold text-white">$0.00</span>
                                </div>
                                
                                <button id="checkout-btn" class="w-full h-14 px-6 bg-purple-600 text-white text-lg font-semibold rounded-full hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:shadow-none" disabled>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            updateTotalPrice();
            // We will call startEventDetailSlider() from navigateTo after render is complete
        }
        
        /**
         * Renders the user's dashboard
         */
        async function renderDashboard() {
            if (!state.currentUser) {
                navigateTo('home');
                openModal('signin-modal');
                return;
            }
            
            dom.dashboardWelcome.textContent = `Welcome, ${state.currentUser.name}`;
            
            // Render Tickets
            dom.purchasedTicketsList.innerHTML = state.currentUser.purchasedTickets.length ? 
                state.currentUser.purchasedTickets.map(ticket => {
                    const eventData = mockDB.events[ticket.eventId];
                    const eventImage = eventData?.imageUrls[0] || 'https://placehold.co/160x160/1a1a1a/404040?text=Event';
                    return `
                        <button class="event-card w-full text-left bg-neutral-900 rounded-2xl overflow-hidden flex flex-row shadow-lg" data-action="view-ticket" data-ticket-id="${ticket.id}">
                            <div class="relative w-32 md:w-40 flex-shrink-0">
                                <img src="${eventImage}" alt="${ticket.eventName}" class="w-full h-full object-cover absolute inset-0">
                            </div>
                            <div class="p-5 md:p-6 flex-grow flex flex-col justify-center overflow-hidden">
                                <span class="text-sm font-semibold text-purple-400 mb-1 block">${ticket.ticketType.toUpperCase()} (x${ticket.qty})</span>
                                <h3 class="text-lg md:text-xl font-bold text-white mb-2 truncate">${ticket.eventName}</h3>
                                <p class="text-neutral-400 text-sm flex items-center gap-2 truncate">
                                    <i data-lucide="calendar" class="w-4 h-4 text-neutral-500 flex-shrink-0"></i>
                                    <span class="truncate">Purchased: ${new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                                 </p>
                            </div>
                            <div class="btn-nextgen-side flex-shrink-0 flex flex-col items-center justify-center w-16 md:w-20 transition-all text-neutral-400">
                                <i data-lucide="eye" class="w-6 h-6"></i>
                                <span class="text-xs font-medium mt-1">VIEW</span>
                            </div>
                        </button>
                    `;
                }).join('') :
                `<p class="text-neutral-500">You haven't purchased any tickets yet.</p>`;

            // Render Hosted Events
            dom.myEventsList.innerHTML = state.currentUser.hostedEvents.length ?
                state.currentUser.hostedEvents.map(event => {
                    const eventImage = event.imageUrls[0] || 'https://placehold.co/160x160/1a1a1a/404040?text=Event';
                    return `
                        <button class="event-card w-full text-left bg-neutral-900 rounded-2xl overflow-hidden flex flex-row shadow-lg" data-action="manage-event" data-event-id="${event.id}">
                            <div class="relative w-32 md:w-40 flex-shrink-0">
                                <img src="${eventImage}" alt="${event.title}" class="w-full h-full object-cover absolute inset-0">
                            </div>
                            <div class="p-5 md:p-6 flex-grow flex flex-col justify-center overflow-hidden">
                                <h3 class="text-lg md:text-xl font-bold text-white mb-2 truncate">${event.title}</h3>
                                <p class="text-neutral-400 text-sm flex items-center gap-2 truncate mb-2">
                                    <i data-lucide="calendar" class="w-4 h-4 text-neutral-500 flex-shrink-0"></i>
                                    <span class="truncate">${new Date(event.date).toLocaleDateString()} • ${event.location}</span>
                                </p>
                                <span class="text-sm font-semibold text-purple-400">Promo Commission: ${event.commission}%</span>
                            </div>
                            <div class="btn-nextgen-side flex-shrink-0 flex flex-col items-center justify-center w-16 md:w-20 transition-all text-neutral-400">
                                <i data-lucide="settings" class="w-6 h-6"></i>
                                <span class="text-xs font-medium mt-1">MANAGE</span>
                            </div>
                        </button>
                    `;
                }).join('') :
                `<p class="text-neutral-500">You aren't hosting any events yet.</p>`;
                
            // Render Promo Stats
            dom.promoStatsList.innerHTML = state.currentUser.promoStats.length ?
                state.currentUser.promoStats.map(stat => `
                    <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                        <p class="text-sm font-medium text-neutral-400 mb-1">${stat.eventName}</p>
                        <p class="text-3xl font-bold text-green-400 mb-4">$${stat.earned.toFixed(2)}</p>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-neutral-500">Sales</span>
                            <span class="text-neutral-200 font-medium">${stat.sales}</span>
                        </div>
                         <div class="flex justify-between text-sm mb-1">
                            <span class="text-neutral-500">Clicks</span>
                            <span class="text-neutral-200 font-medium">${stat.clicks}</span>
                        </div>
                        <button class="mt-4 w-full text-xs font-semibold text-purple-400 hover:text-purple-300">Copy Link</button>
                    </div>
                `).join('') :
                `<p class="text-neutral-500">You are not promoting any events yet.</p>`;
                
            lucide.createIcons();
        }
        
        /**
         * Updates the total price on the event details page
         */
        function updateTotalPrice() {
            let total = 0;
            const eventTotalEl = document.getElementById('event-total-price');
            const checkoutBtn = document.getElementById('checkout-btn');
            
            for (const ticketType in state.checkoutCart) {
                const qty = state.checkoutCart[ticketType];
                const el = document.querySelector(`[data-ticket-type="${ticketType}"]`);
                if (el) {
                    const price = parseFloat(el.dataset.ticketPrice);
                    total += price * qty;
                }
            }
            
            if (eventTotalEl) {
                eventTotalEl.textContent = `$${total.toFixed(2)}`;
            }
            if (checkoutBtn) {
                checkoutBtn.disabled = total === 0;
            }
        }
        
        /**
         * Updates the checkout modal summary
         */
        async function updateCheckoutModal() {
            dom.checkoutSummary.innerHTML = '';
            
            // Reset views and buttons
            dom.checkoutViewLoading.classList.remove('hidden');
            dom.checkoutViewSuccess.classList.add('hidden');
            dom.payNowBtn.classList.remove('hidden');
            dom.checkoutSuccessDoneBtn.classList.add('hidden');
            
            // Reset pay button state
            dom.payNowBtn.disabled = false;
            dom.payNowBtn.innerHTML = `
                <i data-lucide="shield-check" class="w-5 h-5"></i>
                <span>Pay Now (One-Click)</span>
            `;
            lucide.createIcons(); // Re-create icon
            
            let total = 0;
            const event = await mockDB.getEventDetails(state.currentEventId);
            
            event.tickets.forEach(ticket => {
                const qty = state.checkoutCart[ticket.type] || 0;
                if (qty > 0) {
                    const price = ticket.price;
                    const subtotal = price * qty;
                    total += subtotal;
                    
                    dom.checkoutSummary.innerHTML += `
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-lg font-medium text-white">${ticket.type} (x${qty})</p>
                                <p class="text-sm text-neutral-400">$${price.toFixed(2)} each</p>
                            </div>
                            <span class="text-lg font-semibold text-white">$${subtotal.toFixed(2)}</span>
                        </div>
                    `;
                }
            });
            
            dom.checkoutTotal.textContent = `$${total.toFixed(2)}`;
        }

        // --- NEW/MODIFIED SLIDER LOGIC ---

        /**
         * Starts the inner slider (Ken Burns effect) for a given *main* slide (Homepage)
         */
        function startMainInnerSlider(slideElement) {
            const slideIndex = slideElement.dataset.index;
            const container = slideElement.querySelector('.inner-image-container');
            if (!container) return;
            
            const images = container.querySelectorAll('img');
            if (images.length <= 1) {
                if(images.length === 1) images[0].classList.add('inner-active');
                return; // No slideshow needed
            }

            let currentInnerIndex = 0;
            
            // Clear existing interval for this slide
            if (state.mainInnerSliderIntervals[slideIndex]) {
                clearInterval(state.mainInnerSliderIntervals[slideIndex]);
            }

            // Function to change inner slide
            const nextInnerSlide = () => {
                // Remove active class from current image
                images[currentInnerIndex].classList.remove('inner-active');
                
                // --- Re-apply animation class to reset it ---
                const animClass = images[currentInnerIndex].classList.item(0); // Assumes anim- class is first
                if (animClass && animClass.startsWith('anim-')) {
                     images[currentInnerIndex].classList.remove(animClass);
                     void images[currentInnerIndex].offsetWidth; // Trigger reflow
                     images[currentInnerIndex].classList.add(animClass);
                }
                
                // Move to next index
                currentInnerIndex = (currentInnerIndex + 1) % images.length;
                
                // Add active class to new image
                images[currentInnerIndex].classList.add('inner-active');
            };

            // Immediately show the first image
            images[0].classList.add('inner-active');
            
            // Start the interval
            state.mainInnerSliderIntervals[slideIndex] = setInterval(nextInnerSlide, state.INNER_SLIDER_DURATION);
        }

        /**
         * Stops all *main* inner sliders (Homepage)
         */
        function stopMainInnerSliders() {
            Object.values(state.mainInnerSliderIntervals).forEach(clearInterval);
            state.mainInnerSliderIntervals = {};
            // Only affect homepage slider images
            dom.sliderContent.querySelectorAll('.inner-image-container img').forEach(img => {
                img.classList.remove('inner-active');
            });
        }
        
        /**
         * Starts the inner slider for the Event Details page (NEW LOGIC)
         */
        function startEventDetailSlider() {
            // Clear any existing interval
            stopEventDetailSlider(); 
            
            const blurContainer = dom.eventDetailContent.querySelector('#event-detail-blur-background');
            const sharpContainer = dom.eventDetailContent.querySelector('#event-detail-sharp-container');
            
            if (!blurContainer || !sharpContainer) return;
            
            const blurImages = blurContainer.querySelectorAll('.event-detail-blur-img');
            const sharpImages = sharpContainer.querySelectorAll('.event-detail-sharp-img');
            
            if (sharpImages.length <= 1) {
                if(sharpImages.length === 1) {
                    sharpImages[0].style.opacity = 1;
                    if(blurImages[0]) blurImages[0].style.opacity = 1;
                }
                return; // No slideshow needed
            }

            let currentInnerIndex = 0; // Use local state for the index

            const nextInnerSlide = () => {
                // Hide old images
                sharpImages[currentInnerIndex].style.opacity = 0;
                blurImages[currentInnerIndex].style.opacity = 0;
                
                // Increment index
                currentInnerIndex = (currentInnerIndex + 1) % sharpImages.length;
                
                // Show new images
                sharpImages[currentInnerIndex].style.opacity = 1;
                blurImages[currentInnerIndex].style.opacity = 1;
            };

            // Show the first image immediately
            sharpImages[0].style.opacity = 1;
            blurImages[0].style.opacity = 1;
            
            state.eventDetailSliderInterval = setInterval(nextInnerSlide, state.EVENT_DETAIL_SLIDER_DURATION);
        }

        /**
         * Stops the Event Details page inner slider (NEW LOGIC)
         */
        function stopEventDetailSlider() {
            if (state.eventDetailSliderInterval) {
                clearInterval(state.eventDetailSliderInterval);
                state.eventDetailSliderInterval = null;
            }
            // Stop all images (both blur and sharp)
            dom.eventDetailContent.querySelectorAll('#event-detail-blur-background .event-detail-blur-img').forEach(img => {
                img.style.opacity = 0;
            });
            dom.eventDetailContent.querySelectorAll('#event-detail-sharp-container .event-detail-sharp-img').forEach(img => {
                img.style.opacity = 0;
            });
        }
        
        /**
         * Switches the main slide (Homepage)
         */
        function switchMainSlide(targetIndex) {
            const slides = dom.sliderContent.querySelectorAll('.hero-slide');
            const dots = dom.sliderPagination.querySelectorAll('.slider-dot');
            if (!slides.length) return;

            // Stop all animations
            stopMainInnerSliders();

            // Update state
            state.mainSliderIndex = targetIndex;
            
            // Update active slide
            slides.forEach((slide, index) => {
                if (index === targetIndex) {
                    slide.classList.add('active');
                    startMainInnerSlider(slide); // Start this slide's inner animation
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === targetIndex);
            });
        }

        /**
         * Starts the main auto-playing slider (Homepage)
         */
        function startMainSlider() {
            if (state.mainSliderInterval) {
                clearInterval(state.mainSliderInterval);
            }
            
            const slideCount = dom.sliderContent.querySelectorAll('.hero-slide').length;
            if (slideCount <= 1) return; // Don't auto-play if 1 or 0 slides

            state.mainSliderInterval = setInterval(() => {
                const nextIndex = (state.mainSliderIndex + 1) % slideCount;
                switchMainSlide(nextIndex);
            }, state.MAIN_SLIDER_DURATION);
        }
        
        /**
         * Handle clicks on pagination dots (Homepage)
         */
        function handlePaginationClick(e) {
            const dot = e.target.closest('.slider-dot');
            if (dot) {
                const targetIndex = parseInt(dot.dataset.index, 10);
                if (targetIndex !== state.mainSliderIndex) {
                    switchMainSlide(targetIndex);
                    // Reset main interval so the user has time
                    startMainSlider(); 
                }
            }
        }

        // --- NAVIGATION ---
        
        /**
         * Main navigation function
         */
        async function navigateTo(pageId) {
            // Stop all sliders *before* changing page
            if (state.mainSliderInterval) clearInterval(state.mainSliderInterval);
            stopMainInnerSliders();
            stopEventDetailSlider();

            state.currentPage = pageId;
            dom.pages.forEach(page => {
                page.classList.toggle('hidden', page.dataset.page !== pageId);
            });
            
            // Reset page-specific adjustments
            dom.contentArea.style.paddingTop = '5rem'; // 80px (default)
            
            if (pageId === 'home') {
                // When navigating TO home, re-start the slider
                startMainSlider();
            } else if (pageId === 'event-details') {
                // The new hero is part of the page, so default padding is correct
                if (state.currentEventId) {
                    try {
                        dom.eventDetailContent.innerHTML = `<p class="text-center text-neutral-400 py-20">Loading event...</p>`;
                        const event = await mockDB.getEventDetails(state.currentEventId);
                        renderEventDetails(event);
                        startEventDetailSlider(); // Start animation *after* content is rendered
                    } catch (error) {
                         dom.eventDetailContent.innerHTML = `<p class="text-center text-red-400 py-20">Error: ${error.message}</p>`;
                    }
                }
            } else if (pageId === 'dashboard') {
                renderDashboard();
            }
            
            window.scrollTo(0, 0); // Scroll to top on page change
        }

        // --- MODAL CONTROLS ---
        
        function openModal(modalId) {
            document.getElementById(modalId)?.classList.remove('hidden');
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId)?.classList.add('hidden');
        }

        // --- EVENT HANDLERS ---
        
        function handleNavClick(e) {
            e.preventDefault();
            const targetPage = e.target.closest('.nav-link')?.dataset.pageTarget;
            
            if (targetPage) {
                if (targetPage === 'dashboard' && !state.currentUser) {
                    openModal('signin-modal');
                } else {
                    navigateTo(targetPage);
                }
            } else if (e.target.closest('#logo-link')) {
                navigateTo('home');
            } else if (e.target.closest('#user-profile-btn')) {
                navigateTo('dashboard');
            } else if (e.target.closest('#signin-btn')) {
                 openModal('signin-modal');
            }
        }
        
        function handleModalControls(e) {
            const modalCloseId = e.target.closest('[data-modal-close]')?.dataset.modalClose;
            if (modalCloseId) {
                closeModal(modalCloseId);
            }
            
            if (e.target.closest('#add-event-btn')) {
                openModal('add-event-modal');
            }
        }
        
        async function handleSignIn(e) {
            const provider = e.target.closest('.social-login-btn')?.dataset.provider;
            if (!provider) return;
            
            e.target.closest('.social-login-btn').innerHTML = 'Signing in...';
            
            try {
                const user = await mockDB.signIn(provider);
                state.currentUser = user;
                
                dom.signInBtn.classList.add('hidden');
                dom.userProfileBtn.classList.remove('hidden');
                
                closeModal('signin-modal');
                navigateTo('dashboard');
                
            } catch (error) {
                console.error("Sign-in failed:", error);
                 e.target.closest('.social-login-btn').innerHTML = `Failed to sign in. Try again.`;
            }
        }
        
        function handleEventLinkClick(e) {
            const link = e.target.closest('.event-card-link[data-event-id]');
            const card = e.target.closest('.event-card[data-event-id]');
            
            let eventId;
            if (link) eventId = link.dataset.eventId;
            else if (card) eventId = card.dataset.eventId;
            
            if (eventId) {
                e.preventDefault();
                state.currentEventId = eventId;
                navigateTo('event-details');
            }
        }
        
        function handleTabClick(e) {
            const targetTab = e.target.closest('.tab-btn')?.dataset.tab;
            if (!targetTab) return;
            
            dom.tabButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === targetTab);
            });
            
            dom.tabPanels.forEach(panel => {
                panel.classList.toggle('hidden', panel.id !== `tab-${targetTab}`);
            });
        }
        
        function handleQuantityChange(e) {
            const increaseBtn = e.target.closest('.qty-increase');
            const decreaseBtn = e.target.closest('.qty-decrease');
            
            if (!increaseBtn && !decreaseBtn) return;
            
            const container = e.target.closest('[data-ticket-type]');
            const ticketType = container.dataset.ticketType;
            const input = container.querySelector('.qty-input');
            const currentQty = parseInt(input.value) || 0;
            
            let newQty = currentQty;
            
            if (increaseBtn) {
                newQty = currentQty + 1;
            } else if (decreaseBtn) {
                newQty = Math.max(0, currentQty - 1);
            }
            
            input.value = newQty;
            container.querySelector('.qty-decrease').disabled = (newQty === 0);
            
            if (newQty === 0) {
                delete state.checkoutCart[ticketType];
            } else {
                state.checkoutCart[ticketType] = newQty;
            }
            
            updateTotalPrice();
        }
        
        function handleCheckoutClick(e) {
            if (e.target.id === 'checkout-btn') {
                if (!state.currentUser) {
                    openModal('signin-modal');
                    return;
                }
                updateCheckoutModal();
                openModal('checkout-modal');
            }
        }
        
        async function handlePayment(e) {
            dom.payNowBtn.disabled = true;
            dom.payNowBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...`;
            
            try {
                const result = await mockDB.purchaseTicket(state.currentUser.id, state.currentEventId, state.checkoutCart);
                if (result.success) {
                    dom.checkoutViewLoading.classList.add('hidden');
                    dom.checkoutViewSuccess.classList.remove('hidden');
                    dom.payNowBtn.classList.add('hidden');
                    dom.checkoutSuccessDoneBtn.classList.remove('hidden');
                    
                    state.checkoutCart = {};
                    updateTotalPrice();
                }
            } catch (error) {
                console.error("Payment failed", error);
                dom.payNowBtn.innerHTML = 'Payment Failed. Try Again.';
            } finally {
                dom.payNowBtn.disabled = false;
            }
        }
        
        function handleDashboardCardClick(e) {
            const card = e.target.closest('.event-card[data-action]');
            if (!card) return;

            const action = card.dataset.action;
            
            if (action === 'view-ticket') {
                console.log("ACTION: View ticket:", card.dataset.ticketId);
            } else if (action === 'manage-event') {
                console.log("ACTION: Manage event:", card.dataset.eventId);
            }
        }
        
        async function handleAddEventSubmit(e) {
            e.preventDefault();
            dom.createEventBtn.disabled = true;
            dom.createEventBtn.innerHTML = "Creating...";
            
            const formData = {
                title: dom.addEventForm.querySelector('#event-title').value,
                date: dom.addEventForm.querySelector('#event-date').value,
                imageUrl: dom.addEventForm.querySelector('#event-image').value, // Now just the first image
                location: "User Hosted", // Simplified
                commission: parseInt(dom.addEventForm.querySelector('#event-promo').value)
            };
            
            try {
                const newEvent = await mockDB.createEvent(state.currentUser.id, formData);
                closeModal('add-event-modal');
                renderDashboard(); // Re-render dashboard
                dom.addEventForm.reset();
            } catch (error) {
                console.error("Failed to create event:", error);
            } finally {
                dom.createEventBtn.disabled = false;
                dom.createEventBtn.innerHTML = "Create Event";
            }
        }

        // --- APP INITIALIZATION ---
        
        async function initApp() {
            try {
                // I also updated the mock data to use some nicer Unsplash images
                const events = await mockDB.getFeaturedEvents();
                renderSlider(events);
                renderEventGrid(events);

                // --- NEW SLIDER INIT ---
                // Show the first slide and start its inner loop
                switchMainSlide(0); 
                // Start the main auto-play
                startMainSlider(); 
                
            } catch (error) {
                console.error("Failed to load events:", error);
                dom.eventGrid.innerHTML = `<p class="text-red-400">Could not load events.</p>`;
            }
        }
        
        // --- EVENT LISTENERS ---
        document.addEventListener('DOMContentLoaded', () => {
            initApp();
            
            // Header navigation
            dom.header.addEventListener('click', handleNavClick);
            
            // Modal controls
            document.addEventListener('click', handleModalControls);
            dom.signInModal.addEventListener('click', handleSignIn);
            dom.payNowBtn.addEventListener('click', handlePayment);
            
            // Page content interactions
            dom.contentArea.addEventListener('click', (e) => {
                handleEventLinkClick(e);
                handleTabClick(e);
                handleQuantityChange(e);
                handleCheckoutClick(e);
                handleDashboardCardClick(e);
            });
            
            // Slider Pagination
            dom.sliderPagination.addEventListener('click', handlePaginationClick);
            
            // Forms
            dom.addEventForm.addEventListener('submit', handleAddEventSubmit);
            dom.createEventBtn.addEventListener('click', () => {
                dom.addEventForm.requestSubmit();
            });
        });

    </script>

</body>
</html>


