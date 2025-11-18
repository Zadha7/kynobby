 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>QRForge Pro - Ultimate QR Code Generator</title>
  <meta name="description" content="Free advanced QR code generator with logo, frames, shapes, 30+ content types, analytics."/>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

  <style>
    :root { --primary: #2563eb; --accent: #00d4aa; }
    body { font-family: 'Inter', sans-serif; background: #f8fafc; }
    .tab-active { background: #3b82f6; color: white; }
    .frame-btn { transition: all 0.3s; border: 2px solid transparent; }
    .frame-btn.active { border-color: #3b82f6; transform: scale(1.1); }
    .shape-btn { cursor: pointer; }
    .shape-btn.active { outline: 3px solid #3b82f6; border-radius: 8px; }
  </style>
</head>
<body class="text-gray-800">

  <!-- Header Ad -->
  <div class="bg-white shadow sticky top-0 z-50">
    <div class="text-center py-2">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
    <header class="container mx-auto px-4 py-5 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-blue-600">QRForge <span class="text-teal-500">Pro</span></h1>
      <nav class="hidden md:flex space-x-8">
        <a href="#" class="hover:text-blue-600">Features</a>
        <a href="#" class="hover:text-blue-600">Pricing</a>
        <a href="#" class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">Login</a>
      </nav>
    </header>
  </div>

  <!-- Main Generator -->
  <section class="container mx-auto px-4 py-10">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- Content Type Tabs -->
      <div class="flex overflow-x-auto bg-gray-50 border-b scrollbar-hide">
        <button onclick="setType('url')" class="tab px-6 py-4 flex items-center space-x-2 whitespace-nowrap"><span>🌐</span><span>Website</span></button>
        <button onclick="setType('text')" class="tab px-6 py-4 flex items-center space-x-2"><span>📄</span><span>Text</span></button>
        <button onclick="setType('vcard')" class="tab px-6 py-4 flex items-center space-x-2"><span>👤</span><span>vCard</span></button>
        <button onclick="setType('wifi')" class="tab px-6 py-4 flex items-center space-x-2"><span>📶</span><span>Wi-Fi</span></button>
        <button onclick="setType('whatsapp')" class="tab px-6 py-4 flex items-center space-x-2"><span>💬</span><span>WhatsApp</span></button>
        <button onclick="setType('email')" class="tab px-6 py-4 flex items-center space-x-2"><span>✉️</span><span>Email</span></button>
        <button onclick="setType('sms')" class="tab px-6 py-4 flex items-center space-x-2"><span>📱</span><span>SMS</span></button>
        <button onclick="setType('pdf')" class="tab px-6 py-4 flex items-center space-x-2"><span>📑</span><span>PDF</span></button>
        <button onclick="setType('video')" class="tab px-6 py-4 flex items-center space-x-2"><span>🎥</span><span>Video</span></button>
        <button onclick="setType('social')" class="tab px-6 py-4 flex items-center space-x-2"><span>🔗</span><span>Social Media</span></button>
        <button onclick="setType('event')" class="tab px-6 py-4 flex items-center space-x-2"><span>📅</span><span>Event</span></button>
        <button onclick="setType('menu')" class="tab px-6 py-4 flex items-center space-x-2"><span>🍽️</span><span>Menu</span></button>
        <!-- Add more as needed -->
      </div>

      <div class="grid lg:grid-cols-3 gap-8 p-8">
        <!-- Left Panel -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Step 1: Content -->
          <div id="contentSection" class="bg-gray-50 p-8 rounded-2xl">
            <h3 class="text-2xl font-bold mb-6">1️⃣ Complete the content</h3>
            <div id="urlInput" class="space-y-4">
              <input type="text" id="urlText" placeholder="https://yourwebsite.com" class="w-full px-5 py-4 rounded-lg border text-lg">
            </div>
            <!-- Other content types will be injected here via JS -->
          </div>

          <!-- Step 2: Design -->
          <div class="bg-gray-50 p-8 rounded-2xl">
            <h3 class="text-2xl font-bold mb-6">2️⃣ Design your QR</h3>
            <div class="flex space-x-8 border-b mb-6">
              <button onclick="showTab('frame')" class="tab-design pb-3 px-2 border-b-4 border-blue-600">Frame</button>
              <button onclick="showTab('shape')" class="tab-design pb-3 px-2">Shape</button>
              <button onclick="showTab('logo')" class="tab-design pb-3 px-2">Logo</button>
              <button onclick="showTab('level')" class="tab-design pb-3 px-2">Level</button>
            </div>

            <!-- Frames -->
            <div id="frameTab" class="grid grid-cols-4 md:grid-cols-6 gap-4">
              <div onclick="setFrame('none')" class="frame-btn active p-4 bg-white rounded-xl text-center"><div class="w-16 h-16 mx-auto bg-gray-200 rounded"></div><p class="text-xs mt-2">None</p></div>
              <div onclick="setFrame('scanme')" class="frame-btn p-4 bg-white rounded-xl text-center">📱<p class="text-xs">Scan Me</p></div>
              <div onclick="setFrame('pay')" class="frame-btn p-4 bg-white rounded-xl text-center">💳<p class="text-xs">Pay Me</p></div>
              <div onclick="setFrame('follow')" class="frame-btn p-4 bg-white rounded-xl text-center">❤️<p class="text-xs">Follow</p></div>
              <!-- Add more frames -->
            </div>

            <!-- Shapes -->
            <div id="shapeTab" class="hidden space-y-6">
              <div>
                <h4 class="font-semibold mb-3">Shape style</h4>
                <div class="grid grid-cols-6 gap-3">
                  <div onclick="setDots('square')" class="shape-btn active p-4 bg-gray-800 rounded"></div>
                  <div onclick="setDots('dots')" class="shape-btn p-4"><span class="block w-4 h-4 bg-black rounded-full mx-auto"></span></div>
                  <div onclick="setDots('rounded')" class="shape-btn p-4 bg-gray-800 rounded-full"></div>
                  <div onclick="setDots('extra-rounded')" class="shape-btn p-4 bg-gray-800 rounded-full scale-75"></div>
                  <div onclick="setDots('classy')" class="shape-btn p-4 bg-gradient-to-br from-black to-gray-600 rounded"></div>
                  <div onclick="setDots('classy-rounded')" class="shape-btn p-4 bg-gradient-to-br from-black to-gray-600 rounded-full"></div>
                </div>
              </div>
              <div class="flex space-x-4">
                <div>
                  <label>Border color</label>
                  <input type="color" id="dotsColor" value="#000000" class="w-24 h-12 rounded cursor-pointer">
                </div>
                <div>
                  <label>Background</label>
                  <input type="color" id="bgColor" value="#ffffff" class="w-24 h-12 rounded cursor-pointer">
                </div>
                <button onclick="invertColors()" class="px-4 py-2 bg-blue-100 rounded">Invert</button>
              </div>
            </div>

            <!-- Logo -->
            <div id="logoTab" class="hidden text-center">
              <input type="file" id="logoInput" accept="image/*" class="hidden">
              <div onclick="document.getElementById('logoInput').click()" class="border-4 border-dashed border-gray-300 rounded-2xl p-12 cursor-pointer hover:border-blue-500">
                <p class="text-5xl">🖼️</p>
                <p class="mt-4 text-lg">Drag and drop or click to upload a logo<br><span class="text-sm text-gray-500">(JPG, PNG / 2MB max)</span></p>
              </div>
            </div>

            <!-- Level -->
            <div id="levelTab" class="hidden grid grid-cols-4 gap-4">
              <div onclick="setLevel('L')" class="p-6 bg-white rounded-xl shadow text-center cursor-pointer active:scale-95">
                <div class="w-20 h-20 mx-auto bg-gray-200 rounded-xl mb-3"></div>
                <p class="font-bold">Level L <small>7%</small></p>
              </div>
              <div onclick="setLevel('M')" class="p-6 bg-white rounded-xl shadow text-center cursor-pointer">
                <div class="w-20 h-20 mx-auto bg-gray-300 rounded-xl mb-3"></div>
                <p class="font-bold">Level M <small>15%</small></p>
              </div>
              <div onclick="setLevel('Q')" class="p-6 bg-white rounded-xl shadow text-center cursor-pointer">
                <div class="w-20 h-20 mx-auto bg-gray-400 rounded-xl mb-3"></div>
                <p class="font-bold">Level Q <small>25%</small></p>
              </div>
              <div onclick="setLevel('H')" class="p-6 bg-white rounded-xl shadow text-center cursor-pointer">
                <div class="w-20 h-20 mx-auto bg-gray-600 rounded-xl mb-3"></div>
                <p class="font-bold">Level H <small>30%</small></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Preview + Download -->
        <div class="space-y-8">
          <div class="bg-gray-50 p-10 rounded-2xl text-center">
            <h3 class="text-2xl font-bold mb-6">3️⃣ Download your QR</h3>
            <div id="qrPreview" class="inline-block bg-white p-10 rounded-3xl shadow-2xl"></div>
            <div class="mt-8 flex justify-center space-x-4">
              <button onclick="download('png')" class="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700">Download PNG</button>
              <button onclick="download('svg')" class="bg-teal-500 text-white px-8 py-4 rounded-xl hover:bg-teal-600">Download SVG</button>
            </div>
          </div>

          <!-- Sidebar Ad -->
          <div class="bg-gray-100 p-4 rounded-xl text-center">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init();

    let currentType = 'url';
    const qr = new QRCodeStyling({
      width: 400, height: 400,
      data: "https://example.com",
      dotsOptions: { type: "rounded", color: "#000000" },
      backgroundOptions: { color: "#ffffff" },
      imageOptions: { crossOrigin: "anonymous", margin: 20 },
      qrOptions: { errorCorrectionLevel: "M" }
    });
    qr.append(document.getElementById("qrPreview"));

    function setType(type) {
      currentType = type;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
      event.target.closest('.tab').classList.add('tab-active');
      updateData();
    }

    function updateData() {
      let data = document.getElementById("urlText")?.value || "https://example.com";
      if (currentType === 'whatsapp') data = "https://wa.me/123456789";
      if (currentType === 'wifi') data = "WIFI:T:WPA;S:mynetwork;P:mypass;;";
      qr.update({ data });
    }

    function showTab(tab) {
      document.querySelectorAll('#frameTab, #shapeTab, #logoTab, #levelTab').forEach(t => t.classList.add('hidden'));
      document.getElementById(tab + 'Tab').classList.remove('hidden');
      document.querySelectorAll('.tab-design').forEach(t => t.classList.remove('border-blue-600'));
      event.target.classList.add('border-b-4', 'border-blue-600');
    }

    function setFrame(frame) { /* Implement frame overlay in future */ }
    function setDots(type) {
      document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
      event.target.closest('.shape-btn').classList.add('active');
      qr.update({ dotsOptions: { type } });
    }
    function setLevel(level) { qr.update({ qrOptions: { errorCorrectionLevel: level } }); }
    function invertColors() {
      const fg = document.getElementById('dotsColor').value;
      const bg = document.getElementById('bgColor').value;
      document.getElementById('dotsColor').value = bg;
      document.getElementById('bgColor').value = fg;
      qr.update({
        dotsOptions: { color: bg },
        backgroundOptions: { color: fg }
      });
    }
    function download(type) { qr.download({ extension: type }); }

    // Logo upload
    document.getElementById('logoInput').addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => qr.update({ image: ev.target.result });
        reader.readAsDataURL(file);
      }
    });

    // Live update
    document.getElementById('urlText')?.addEventListener('input', updateData);
    document.getElementById('dotsColor').addEventListener('input', e => qr.update({ dotsOptions: { color: e.target.value }}));
    document.getElementById('bgColor').addEventListener('input', e => qr.update({ backgroundOptions: { color: e.target.value }}));

    // Init
    showTab('frame');
    document.querySelector('.tab').classList.add('tab-active');
  </script>
</body>
</html>
