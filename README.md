  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>Kynobby From UK</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* CSS Reset for Cross-Browser Compatibility */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            -webkit-tap-highlight-color: transparent;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        :root {
            --primary: #003366;
            --secondary: #004d99;
            --accent: #ff6600;
            --light: #f8f9fa;
            --dark: #212529;
            --gray: #6c757d;
        }

        html {
            scroll-behavior: smooth;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        body {
            background-color: #f5f7fa;
            color: var(--dark);
            line-height: 1.6;
            overflow-x: hidden;
            min-height: 100vh;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }

        section {
            padding: 80px 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 15px;
            position: relative;
            display: inline-block;
        }

        .section-title h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background-color: var(--accent);
        }

        .section-title p {
            color: var(--gray);
            max-width: 700px;
            margin: 0 auto;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: var(--accent);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn:hover, .btn:active {
            background-color: #e55c00;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Header Styles */
        header {
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            position: relative;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo h1 {
            font-size: 1.8rem;
            color: var(--primary);
            font-weight: 700;
        }

        .logo span {
            color: var(--accent);
        }

        /* Toggle Button */
        .toggle-nav-btn {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 44px;
            height: 44px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px 7px;
            z-index: 10;
            -webkit-tap-highlight-color: transparent;
        }

        .toggle-nav-btn span {
            width: 100%;
            height: 3px;
            background-color: var(--primary);
            border-radius: 10px;
            transition: all 0.3s ease;
            position: relative;
            transform-origin: 1px;
        }

        .toggle-nav-btn.active span:nth-child(1) {
            transform: rotate(45deg);
        }

        .toggle-nav-btn.active span:nth-child(2) {
            opacity: 0;
            transform: translateX(20px);
        }

        .toggle-nav-btn.active span:nth-child(3) {
            transform: rotate(-45deg);
        }

        /* Navigation */
        nav {
            transition: all 0.5s ease;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
        }

        nav ul {
            display: flex;
            list-style: none;
            transition: all 0.5s ease;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
        }

        nav ul li {
            margin-left: 30px;
            position: relative;
        }

        nav ul li a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            -webkit-tap-highlight-color: transparent;
            padding: 10px 0;
            min-height: 44px;
        }

        nav ul li a:hover {
            color: var(--accent);
        }

        .dropdown {
            position: relative;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: white;
            min-width: 200px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            z-index: 1;
            padding: 10px 0;
        }

        .dropdown-content a {
            display: block;
            padding: 10px 20px;
            color: var(--dark);
            text-decoration: none;
            transition: background-color 0.3s;
            min-height: 44px;
            display: flex;
            align-items: center;
        }

        .dropdown-content a:hover {
            background-color: #f5f5f5;
            color: var(--accent);
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 77, 153, 0.8)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            text-align: center;
            padding: 200px 0 150px;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            margin-top: 80px;
        }

        .hero h2 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
        }

        /* Services Section */
        .services {
            background-color: white;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .service-card {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            -webkit-transition: transform 0.3s ease;
            -moz-transition: transform 0.3s ease;
        }

        .service-card:hover {
            transform: translateY(-10px);
        }

        .service-img {
            height: 200px;
            background-size: cover;
            background-position: center;
        }

        .service-content {
            padding: 25px;
        }

        .service-content h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--primary);
        }

        .service-content p {
            color: var(--gray);
            margin-bottom: 20px;
        }

        /* Employees Section */
        .employees {
            background-color: var(--light);
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
        }

        .employee-carousel-container {
            position: relative;
            overflow: hidden;
            padding: 20px 0;
        }

        .employee-track {
            display: flex;
            animation: scroll 180s linear infinite;
            -webkit-animation: scroll 180s linear infinite;
            -moz-animation: scroll 180s linear infinite;
        }

        .employee-card {
            flex: 0 0 220px;
            margin: 0 15px;
            text-align: center;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            -webkit-transition: transform 0.3s ease;
            -moz-transition: transform 0.3s ease;
        }

        .employee-card:hover {
            transform: translateY(-5px);
        }

        .employee-img {
            height: 200px;
            width: 100%;
            background-color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
        }

        .employee-info {
            padding: 15px;
        }

        .employee-info h4 {
            font-size: 1.1rem;
            margin-bottom: 5px;
            color: var(--primary);
        }

        .employee-info p {
            color: var(--gray);
            font-size: 0.9rem;
        }

        @keyframes scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(-220px * 20));
            }
        }

        @-webkit-keyframes scroll {
            0% {
                -webkit-transform: translateX(0);
            }
            100% {
                -webkit-transform: translateX(calc(-220px * 20));
            }
        }

        @-moz-keyframes scroll {
            0% {
                -moz-transform: translateX(0);
            }
            100% {
                -moz-transform: translateX(calc(-220px * 20));
            }
        }

        /* About Section */
        .about {
            background-color: white;
        }

        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }

        .about-text h3 {
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 20px;
        }

        .about-text p {
            margin-bottom: 20px;
            color: var(--gray);
        }

        .about-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 30px;
        }

        .stat {
            text-align: center;
            padding: 20px;
            background-color: var(--light);
            border-radius: 8px;
        }

        .stat h4 {
            font-size: 2rem;
            color: var(--accent);
            margin-bottom: 5px;
        }

        .about-img {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .about-img img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Contact Section */
        .contact {
            background-color: var(--light);
        }

        .contact-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
        }

        .contact-info h3 {
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 20px;
        }

        .contact-details {
            margin-bottom: 30px;
        }

        .contact-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .contact-icon {
            background-color: var(--primary);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .contact-form {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
        }

        .form-control:focus {
            border-color: var(--accent);
            outline: none;
        }

        textarea.form-control {
            min-height: 150px;
            resize: vertical;
        }

        /* Footer */
        footer {
            background-color: var(--primary);
            color: white;
            padding: 60px 0 20px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-bottom: 40px;
        }

        .footer-column h4 {
            font-size: 1.2rem;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-column h4::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background-color: var(--accent);
        }

        .footer-column ul {
            list-style: none;
        }

        .footer-column ul li {
            margin-bottom: 10px;
        }

        .footer-column ul li a {
            color: #b3c7e0;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-column ul li a:hover {
            color: white;
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }

        .social-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            color: white;
            transition: background-color 0.3s;
            min-height: 44px;
            min-width: 44px;
        }

        .social-links a:hover {
            background-color: var(--accent);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.9rem;
            color: #b3c7e0;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
            .about-content, .contact-container {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .toggle-nav-btn {
                display: flex;
            }
            
            nav {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                height: calc(100vh - 80px);
                background-color: white;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                transform: translateX(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.5s ease;
                -webkit-transition: all 0.5s ease;
                -moz-transition: all 0.5s ease;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            nav.active {
                transform: translateX(0);
                opacity: 1;
                visibility: visible;
            }
            
            nav ul {
                flex-direction: column;
                padding: 20px 0;
                width: 100%;
            }
            
            nav ul li {
                margin: 0;
                text-align: center;
                width: 100%;
            }
            
            nav ul li a {
                padding: 15px 20px;
                justify-content: center;
                width: 100%;
            }
            
            .dropdown-content {
                position: static;
                box-shadow: none;
                background-color: #f8f9fa;
                display: none;
                width: 100%;
            }
            
            .dropdown.active .dropdown-content {
                display: block;
            }
            
            .hero h2 {
                font-size: 2.5rem;
            }

            .section-title h2 {
                font-size: 2rem;
            }

            .about-stats {
                grid-template-columns: 1fr;
            }

            .hero {
                background-attachment: scroll;
                padding: 150px 0 100px;
            }
        }

        @media (max-width: 576px) {
            .footer-content {
                grid-template-columns: 1fr;
            }

            .hero {
                padding: 120px 0 80px;
            }

            section {
                padding: 60px 0;
            }
            
            .employee-card {
                flex: 0 0 180px;
            }
            
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(calc(-180px * 20));
                }
            }
            
            @-webkit-keyframes scroll {
                0% {
                    -webkit-transform: translateX(0);
                }
                100% {
                    -webkit-transform: translateX(calc(-180px * 20));
                }
            }
            
            @-moz-keyframes scroll {
                0% {
                    -moz-transform: translateX(0);
                }
                100% {
                    -moz-transform: translateX(calc(-180px * 20));
                }
            }
        }

        /* Prevent horizontal scrolling */
        body, html {
            max-width: 100%;
            overflow-x: hidden;
        }

        /* iOS-specific fixes */
        @supports (-webkit-touch-callout: none) {
            .hero {
                background-attachment: scroll;
            }
        }

        /* Fix for iOS Safari 100vh issue */
        .hero {
            height: auto;
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container header-container">
            <div class="logo">
                <h1>Kynobby<span>UK</span></h1>
            </div>
            
            <!-- Toggle Button -->
            <button class="toggle-nav-btn" id="toggleNav" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <nav id="mainNav">
                <ul>
                    <li><a href="#home"><i class="fas fa-home"></i> Home</a></li>
                    <li class="dropdown">
                        <a href="#categories"><i class="fas fa-th-large"></i> Categories <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-content">
                            <a href="#electrical"><i class="fas fa-bolt"></i> Electrical Engineering Management</a>
                            <a href="#civil"><i class="fas fa-hard-hat"></i> Civil Engineering Management</a>
                            <a href="#hospital"><i class="fas fa-hospital"></i> Hospital Administration System</a>
                        </div>
                    </li>
                    <li><a href="#about"><i class="fas fa-info-circle"></i> About Us</a></li>
                    <li><a href="#contact"><i class="fas fa-envelope"></i> Contact Us</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <h2>Kynobby From UK</h2>
            <p>Providing cutting-edge management solutions for engineering and healthcare sectors with over 3 years of industry experience.</p>
            <a href="#contact" class="btn">Get In Service</a>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="categories">
        <div class="container">
            <div class="section-title">
                <h2>Our Specializations</h2>
                <p>We offer comprehensive management solutions across multiple industries</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80');"></div>
                    <div class="service-content">
                        <h3>Electrical Engineering Management</h3>
                        <p>Comprehensive electrical system design, implementation, and maintenance services for industrial and commercial applications.</p>
                        <a href="#" class="btn">Learn More</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');"></div>
                    <div class="service-content">
                        <h3>Civil Engineering Management</h3>
                        <p>Our company specializing in Civil Engineering, providing AutoCAD and Revit design services for building projects. We focus on delivering precise, innovative, and efficient designs.</p>
                        <a href="#" class="btn">Learn More</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-img" style="background-image: url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80');"></div>
                    <div class="service-content">
                        <h3>Hospital Administration System</h3>
                        <p>Integrated healthcare management solutions to optimize hospital operations and patient care delivery.</p>
                        <a href="#" class="btn">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Employees Section -->
    <section class="employees">
        <div class="container">
            <div class="section-title">
                <h2>Our Team</h2>
                <p>Meet our dedicated team of professionals driving innovation and excellence</p>
            </div>
            <div class="employee-carousel-container">
                <div class="employee-track">
                    <!-- Mixed Pakistani and UK employees -->
                    <!-- Pakistani Employees -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Ahmed Khan</h4>
                            <p>Senior Electrical Engineer</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>James Wilson</h4>
                            <p>Project Manager</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Fatima Ali</h4>
                            <p>Civil Project Manager</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Sarah Johnson</h4>
                            <p>Senior Civil Engineer</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Bilal Ahmed</h4>
                            <p>Hospital Admin Director</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Michael Brown</h4>
                            <p>Healthcare Systems Manager</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Ayesha Malik</h4>
                            <p>Electrical Systems Analyst</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Emily Davis</h4>
                            <p>Systems Analyst</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Hassan Raza</h4>
                            <p>Structural Engineer</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Robert Taylor</h4>
                            <p>Structural Engineer</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Sana Khan</h4>
                            <p>Healthcare Systems Manager</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Jennifer Martinez</h4>
                            <p>Healthcare Systems Manager</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Omar Farooq</h4>
                            <p>Power Systems Engineer</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>David Anderson</h4>
                            <p>Power Systems Engineer</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Zainab Hussain</h4>
                            <p>Construction Manager</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Lisa Thomas</h4>
                            <p>Construction Manager</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Usman Ali</h4>
                            <p>Hospital IT Specialist</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Christopher Lee</h4>
                            <p>Hospital IT Specialist</p>
                        </div>
                    </div>
                    <!-- Pakistani Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Hina Shah</h4>
                            <p>Electrical Design Engineer</p>
                        </div>
                    </div>
                    <!-- UK Employee -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Amanda White</h4>
                            <p>Electrical Design Engineer</p>
                        </div>
                    </div>
                    <!-- Muhammad Wakas (Pakistani) -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Muhammad Wakas</h4>
                            <p>Senior Project Manager</p>
                        </div>
                    </div>
                    <!-- Arif Hussain (Pakistani) -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Arif Hussain</h4>
                            <p>Structural Engineer</p>
                        </div>
                    </div>
                    <!-- Asif Khan (Pakistani) -->
                    <div class="employee-card">
                        <div class="employee-img">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-info">
                            <h4>Asif Khan</h4>
                            <p>Electrical Systems Analyst</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="container">
            <div class="section-title">
                <h2>About Us</h2>
                <p>Learn more about our company, values, and achievements</p>
            </div>
            <div class="about-content">
                <div class="about-text">
                    <h3>Kynobby From UK</h3>
                    <p>Founded in 2022, Kynobby UK has established itself as a premier provider of specialized management solutions across multiple sectors. Our multidisciplinary approach combines technical expertise with strategic management to deliver exceptional results for our clients.</p>
                    <p>With offices in London, Manchester, and Edinburgh, we serve clients throughout the UK and internationally. Our team of over 50 professionals brings diverse expertise to every project, ensuring comprehensive solutions that address complex challenges.</p>
                    <div class="about-stats">
                        <div class="stat">
                            <h4>3+</h4>
                            <p>Years Experience</p>
                        </div>
                        <div class="stat">
                            <h4>200+</h4>
                            <p>Projects Completed</p>
                        </div>
                        <div class="stat">
                            <h4>50+</h4>
                            <p>Expert Team Members</p>
                        </div>
                    </div>
                </div>
                <div class="about-img">
                    <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" alt="Our Team">
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="container">
            <div class="section-title">
                <h2>Contact Us</h2>
                <p>Get in touch with our team for inquiries and collaborations</p>
            </div>
            <div class="contact-container">
                <div class="contact-info">
                    <h3>Let's Start a Conversation</h3>
                    <p>We're always interested in hearing about new projects and opportunities. Reach out to us using the form or contact details below.</p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <p>United Kingdom</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                                <p>kynobbyuk@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="contact-form">
                    <form>
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" class="form-control" placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="Your Email">
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" class="form-control" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" class="form-control" placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit" class="btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>Service</h4>
                    <p>Providing innovative engineering and administration solutions since 2022. We specialize in electrical engineering, civil engineering, and hospital administration management.</p>
                </div>
                <div class="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#categories">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#electrical">Electrical Engineering</a></li>
                        <li><a href="#civil">Civil Engineering</a></li>
                        <li><a href="#hospital">Hospital Administration</a></li>
                        <li><a href="#">Consulting Services</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Newsletter</h4>
                    <p>Subscribe to our newsletter to receive updates on our latest projects and services.</p>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Your Email">
                        <button class="btn" style="margin-top: 10px; width: 100%;">Subscribe</button>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2022 Kynobby UK. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Toggle navigation menu
        const toggleNavBtn = document.getElementById('toggleNav');
        const mainNav = document.getElementById('mainNav');
        
        toggleNavBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    toggleNavBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Dropdown functionality for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Fix for iOS viewport height issue
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    </script>
</body>
</html>
