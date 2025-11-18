 <!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>QRForge Pro • Ultimate Animated QR Code Generator</title>
  <meta name="description" content="The most advanced free QR code generator with 3D effects, animations, gradient frames, patterns, analytics & 40+ content types."/>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  
  <!-- Libraries -->
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>

  <style>
    :root {
      --primary: #3b82f6; --accent: #00f2c3; --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .dark { --primary: #60a5fa; --accent: #34d399; background: #0f172a; color: #e2e8f0; }
    
    body { font-family: 'Inter', sans-serif; background: linear-gradient(to bottom, #f8fafc, #e2e8f0); transition: all 0.6s cubic-bezier(0.4,0,0.2,1); }
    .dark body { background: #0f172a; }

    .glass { background: rgba(255,255,255,0.25); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.3); }
    .dark .glass { background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); }

    .tab-active { background: var(--primary); color: white !important; box-shadow: 0 10px 30px rgba(59,130,246,0.4); transform: translateY(-4px); }
    .frame-btn { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1); }
    .frame-btn:hover { transform: translateY(-8px) scale(1.1); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .frame-btn.active { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(59,130,246,0.3); transform: scale(1.15); }

    .floating { animation: float 6s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

    .scan-line {
      position: absolute; top: 0; left: 0; width: 100%; height: 4px;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
      box-shadow: 0 0 20px #00ff88; opacity: 0; pointer-events: none;
    }
  </style>
</head>
<body class="text-gray-800 dark:text-gray-200 min-h-screen">

  <!-- Floating Particles Background -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute inset-0 opacity-30">
      <div class="floating absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      <div class="floating absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl" style="animation-delay: -3s;"></div>
      <div class="floating absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500 rounded-full blur-3xl" style="animation-delay: -1.5s;"></div>
    </div>
  </div>

  <!-- Header -->
  <header class="sticky top-0 z-50 glass shadow-2xl">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">QRForge <span class="text-white">Pro</span></h1>
        <span class="text-xs bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">LIVE</span>
      </div>
      <nav class="flex items-center space-x-8">
        <button onclick="document.body.classList.toggle('dark')" class="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          🌙
        </button>
        <a href="#" class="hover:text-blue-500 transition">Features</a>
        <a href="#" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-2xl transform hover:scale-105 transition">Go Pro</a>
      </nav>
    </div>
  </header>

  <!-- Hero Generator -->
  <section class="container mx-auto px-6 py-16">
    <div class="glass rounded-3xl shadow-2xl overflow-hidden border border-white/20" data-aos="fade-up">
      
      <!-- Tabs -->
      <div class="flex overflow-x-auto bg-white/10 dark:bg-black/20 backdrop-blur scrollbar-hide p-4 gap-2">
        ${['url','text','vcard','wifi','whatsapp','email','sms','location','event','bitcoin','pdf','app','menu'].map((t,i) => `
          <button onclick="setType('${t}')" class="tab px-6 py-4 rounded-2xl flex items-center space-x-3 whitespace-nowrap transition-all duration-300 hover:bg-white/20">
            <span class="text-2xl">${{url:'🌐',text:'📄',vcard:'👤',wifi:'📶',whatsapp:'💬',email:'✉️',sms:'📱',location:'📍',event:'📅',bitcoin:'₿',pdf:'📑',app:'📱',menu:'🍽️'}[t]}</span>
            <span class="font-medium capitalize">${t === 'vcard' ? 'Contact' : t === 'app' ? 'App Store' : t}</span>
          </button>
        `).join('')}
      </div>

      <div class="grid lg:grid-cols-3 gap-10 p-10">
        <!-- Left Panel -->
        <div class="lg:col-span-2 space-y-10">
          
          <!-- Content Input -->
          <div class="glass p-10 rounded-3xl border border-white/30" data-aos="fade-right" data-aos-delay="100">
            <h3 class="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">1. Enter Your Content</h3>
            <div id="contentSection">
              <input type="text" id="urlText" placeholder="https://example.com" class="w-full px-6 py-5 rounded-2xl bg-white/70 dark:bg-black/50 border border-gray-300 dark:border-gray-700 text-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition">
            </div>
          </div>

          <!-- Design Panel -->
          <div class="glass p-10 rounded-3xl border border-white/30" data-aos="fade-right" data-aos-delay="200">
            <h3 class="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">2. Design Magic</h3>
            
            <div class="flex space-x-6 border-b border-gray-300/50 dark:border-gray-700 pb-4 mb-8 overflow-x-auto">
              ${['frame','pattern','shape','colors','logo','effects'].map(t => `
                <button onclick="showTab('${t}')" class="tab-design pb-4 px-4 font-semibold capitalize relative">
                  ${t}
                  <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full scale-x-0 transition-transform origin-left"></span>
                </button>
              `).join('')}
            </div>

            <!-- Pattern Backgrounds -->
            <div id="patternTab" class="hidden grid grid-cols-5 gap-4">
              ${['none','dots','waves','circuit','hexagon','gradient-radial','gradient-linear','triangles','bubbles','stars'].map(p => `
                <div onclick="setBackgroundPattern('${p}')" class="frame-btn p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl cursor-pointer hover:shadow-xl">
                  <div class="w-full h-20 bg-gradient-to-br from-blue-400 to-teal-400 rounded-xl"></div>
                  <p class="text-center mt-2 text-sm">${p.replace('-',' ')}</p>
                </div>
              `).join('')}
            </div>

            <!-- Advanced Color Picker -->
            <div id="colorsTab" class="hidden space-y-8">
              <div class="grid grid-cols-2 gap-8">
                <div>
                  <label class="block mb-3 text-lg font-semibold">Dots Gradient</label>
                  <div class="flex space-x-3">
                    <input type="color" id="color1" value="#3b82f6" class="w-20 h-20 rounded-2xl cursor-pointer">
                    <input type="color" id="color2" value="#10b981" class="w-20 h-20 rounded-2xl cursor-pointer">
                  </div>
                </div>
                <div>
                  <label class="block mb-3 text-lg font-semibold">Background</label>
                  <input type="color" id="bgColor" value="#ffffff" class="w-32 h-32 rounded-3xl cursor-pointer shadow-2xl">
                </div>
              </div>
              <button onclick="randomColors()" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl transform hover:scale-105 transition">
                🎨 Random Magic
              </button>
            </div>

            <!-- Effects Tab -->
            <div id="effectsTab" class="hidden space-y-6">
              <label class="flex items-center space-x-4 text-lg">
                <input type="checkbox" id="animateScan" class="w-6 h-6 rounded">
                <span>Glowing Scan Animation</span>
              </label>
              <label class="flex items-center space-x-4 text-lg">
                <input type="checkbox" id="rotate3d" class="w-6 h-6 rounded">
                <span>3D Hover Tilt</span>
              </label>
              <label class="flex items-center space-x-4 text-lg">
                <input type="checkbox" id="particles" class="w-6 h-6 rounded">
                <span>Particle Background</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="space-y-8">
          <div class="glass p-12 rounded-3xl text-center relative overflow-hidden" data-aos="zoom-in">
            <div class="scan-line" id="scanLine"></div>
            <h3 class="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Your Masterpiece</h3>
            <div id="qrPreview" class="inline-block p-12 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-700"></div>
            
            <div class="mt-10 flex flex-wrap justify-center gap-4">
              <button onclick="download('png')" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition font-semibold">PNG</button>
              <button onclick="download('svg')" class="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition font-semibold">SVG</button>
              <button onclick="download('webp')" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition font-semibold">WEBP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    AOS.init({ duration: 1000, once: false });

    const qr = new QRCodeStyling({
      width: 500, height: 500,
      data: "https://qrforge.pro",
      margin: 20,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { type: "extra-rounded", gradient: { type: "linear", rotation: 45, colorStops: [{ offset: 0, color: "#3b82f6" }, { offset: 1, color: "#10b981" }] } },
      backgroundOptions: { color: "#ffffff" },
      imageOptions: { crossOrigin: "anonymous", margin: 30, imageSize: 0.4 },
      cornersSquareOptions: { type: "extra-rounded", gradient: { type: "radial", colorStops: [{ offset: 0, color: "#8b5cf6" }, { offset: 1, color: "#ec4899" }] } },
      cornersDotOptions: { type: "dot", color: "#f59e0b" }
    });
    qr.append(document.getElementById("qrPreview"));

    // GSAP Animations
    gsap.to("#qrPreview canvas", { rotation: 360, duration: 20, repeat: -1, ease: "none" });

    function setType(t) {
      currentType = t;
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('tab-active'));
      event.target.closest('.tab').classList.add('tab-active');
      updateData();
    }

    function updateData() {
      let data = document.getElementById("urlText")?.value || "https://qrforge.pro";
      qr.update({ data });
    }

    function showTab(tab) {
      document.querySelectorAll('#patternTab, #colorsTab, #effectsTab').forEach(t => t.classList.add('hidden'));
      document.getElementById(tab + 'Tab')?.classList.remove('hidden');
      document.querySelectorAll('.tab-design span').forEach(s => s.classList.remove('scale-x-100'));
      event.target.querySelector('span').classList.add('scale-x-100');
    }

    function randomColors() {
      const colors = ['#ff0080','#00ff80','#0080ff','#ff8000','#8000ff'];
      const c1 = colors[Math.floor(Math.random()*colors.length)];
      const c2 = colors[Math.floor(Math.random()*colors.length)];
      document.getElementById('color1').value = c1;
      document.getElementById('color2').value = c2;
      qr.update({ dotsOptions: { gradient: { colorStops: [{offset:0,color:c1},{offset:1,color:c2}] } } });
    }

    function download(ext) {
      qr.download({ name: "qrforge-pro", extension: ext });
    }

    // Live Updates
    document.getElementById('urlText').addEventListener('input', updateData);
    document.getElementById('color1').addEventListener('input', e => qr.update({ dotsOptions: { gradient: { colorStops: [{offset:0,color:e.target.value},{offset:1,color2.value}] } } }));
    document.getElementById('color2').addEventListener('input', e => qr.update({ dotsOptions: { gradient: { colorStops: [{offset:0,color1.value},{offset:1,color:e.target.value}] } } }));
    document.getElementById('bgColor').addEventListener('input', e => qr.update({ backgroundOptions: { color: e.target.value } }));

    // Scan line animation
    setInterval(() => {
      if (document.getElementById('animateScan').checked) {
        const line = document.getElementById('scanLine');
        line.style.opacity = '0.8';
        line.style.transform = 'translateY(500px)';
        setTimeout(() => { line.style.opacity = '0'; line.style.transform = 'translateY(-500px)'; }, 2000);
      }
    }, 3000);

    // Init
    document.querySelector('.tab').classList.add('tab-active');
    document.querySelector('.tab-design span').classList.add('scale-x-100');
  </script>
</body>
</html>
