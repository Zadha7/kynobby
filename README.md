<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- (All previous head content remains the same - fonts, libraries, etc.) -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>QRForge Pro • Ultimate Animated QR Code Generator</title>
  <meta name="description" content="The most advanced free QR code generator with 3D effects, animations, gradient frames, patterns, analytics & 40+ content types."/>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <style>
    :root { --primary: #3b82f6; --accent: #00f2c3; }
    .dark { --primary: #60a5fa; --accent: #34d399; background: #0f172a; color: #e2e8f0; }
    body { font-family: 'Inter', sans-serif; background: #f8fafc; }

    .glass { background: rgba(255,255,255,0.15); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); }
    .dark .glass { background: rgba(15,23,42,0.6); }

    /* Animated Header Background */
    .hero-bg {
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .floating-qr {
      position: absolute;
      opacity: 0.15;
      pointer-events: none;
      animation: float 20s infinite linear;
    }
  </style>
</head>
<body class="text-gray-800 dark:text-gray-200 min-h-screen">

  <!-- NEW ANIMATED HERO HEADER WITH IMAGE -->
  <header class="relative h-screen flex items-center justify-center overflow-hidden hero-bg">
    
    <!-- Floating QR Particles Background -->
    <div class="absolute inset-0">
      <img src="https://i.ibb.co/album/9bN2vK" alt="floating-qr-1" class="floating-qr w-64 -top-10 -left-10" style="animation-delay: 0s;">
      <img src="https://i.ibb.co/album/9bN2vK" alt="floating-qr-2" class="floating-qr w-80 top-1/3 right-0" style="animation-delay: -5s;">
      <img src="https://i.ibb.co/album/9bN2vK" alt="floating-qr-3" class="floating-qr w-96 bottom-0 left-1/4" style="animation-delay: -10s;">
      <img src="https://i.ibb.co/album/9bN2vK" alt="floating-qr-4" class="floating-qr w-72 top-1/4 right-1/3" style="animation-delay: -15s;">
    </div>

    <!-- Main Hero Content -->
    <div class="relative z-10 text-center px-6">
      <h1 class="text-6xl md:text-8xl font-black mb-6">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-pink-200 drop-shadow-2xl">
          QRForge <span class="text-white">Pro</span>
        </span>
      </h1>
      <p class="text-2xl md:text-4xl text-white/90 font-light mb-8 max-w-4xl mx-auto">
        Create <span class="font-bold text-cyan-300">stunning animated QR codes</span> with logos, gradients, frames & real-time analytics in seconds.
      </p>
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a href="#generator" class="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:shadow-2xl transform hover:scale-110 transition duration-300">
          🚀 Start Creating Free
        </a>
        <button onclick="document.body.classList.toggle('dark')" class="p-4 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition">
          🌙 Toggle Dark Mode
        </button>
      </div>
    </div>

    <!-- Hero Mockup Image (Phone scanning QR) -->
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 pointer-events-none">
      <img src="https://i.ibb.co.com/0jG4zQy/phone-qr-mockup.png" 
           alt="iPhone scanning beautiful QR code" 
           class="w-96 md:w-full max-w-2xl drop-shadow-4xl animate-bounce-slow">
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </header>

  <!-- Rest of your generator section (id="generator") -->
  <section id="generator" class="container mx-auto px-6 py-20 -mt-32 relative z-20">
    <div class="glass rounded-3xl shadow-2xl overflow-hidden border border-white/20" data-aos="fade-up">
      <!-- (All your previous generator code goes here - tabs, panels, preview, etc.) -->
      <!-- I'll paste only the beginning to confirm it connects -->

      <div class="flex overflow-x-auto bg-white/10 dark:bg-black/20 backdrop-blur scrollbar-hide p-4 gap-2">
        <!-- Your tabs here -->
      </div>
      <!-- ... rest of your generator ... -->
    </div>
  </section>

  <style>
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0) translateX(-50%); }
      50% { transform: translateY(-30px) translateX(-50%); }
    }
    .animate-bounce-slow { animation: bounce-slow 6s infinite; }
  </style>

  <script>
    AOS.init({ duration: 1200, once: false });

    // Parallax effect on hero mockup
    gsap.to(".hero-bg", {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Your existing QR code script continues here...
  </script>
</body>
</html>
