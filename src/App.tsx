import { useEffect, useRef, useState, ReactNode, FormEvent } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Award, 
  ShieldCheck, 
  Check, 
  Menu, 
  X, 
  Sparkles, 
  Crown, 
  Activity, 
  Zap, 
  Smile, 
  Baby, 
  Shield, 
  HeartPulse, 
  ExternalLink,
  ChevronRight,
  MessageSquareQuote,
  ThumbsUp
} from "lucide-react";

// Custom ScrollReveal component using standard IntersectionObserver
function ScrollReveal({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Interactive booking state
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    service: "Teeth Whitening",
    date: "",
    message: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) return;
    setBookingSubmitted(true);
  };

  const handleResetBooking = () => {
    setBookingSubmitted(false);
    setBookingData({
      name: "",
      phone: "",
      service: "Teeth Whitening",
      date: "",
      message: ""
    });
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-mint/30 selection:text-brand-navy" id="root-container">
      
      {/* STICKY NAVBAR */}
      <header 
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-navy/95 backdrop-blur-md py-4 border-b border-brand-gold/20 shadow-lg" 
            : "bg-transparent py-6 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center" id="navbar-inner">
          <div 
            className="flex flex-col cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            id="nav-logo"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">
                Teeth <span className="text-brand-mint">&</span> Smile
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-medium">
              Dental Clinic • Dr. Namrata
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <button 
              onClick={() => handleScrollToSection("services")} 
              className="text-sm font-medium text-white/80 hover:text-brand-mint transition-colors cursor-pointer"
              id="link-services"
            >
              Services
            </button>
            <button 
              onClick={() => handleScrollToSection("about")} 
              className="text-sm font-medium text-white/80 hover:text-brand-mint transition-colors cursor-pointer"
              id="link-about"
            >
              About Doctor
            </button>
            <button 
              onClick={() => handleScrollToSection("why-choose-us")} 
              className="text-sm font-medium text-white/80 hover:text-brand-mint transition-colors cursor-pointer"
              id="link-why"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => handleScrollToSection("reviews")} 
              className="text-sm font-medium text-white/80 hover:text-brand-mint transition-colors cursor-pointer"
              id="link-reviews"
            >
              Reviews
            </button>
            <button 
              onClick={() => handleScrollToSection("booking")} 
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              id="btn-nav-book"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center" id="mobile-nav-toggle-wrapper">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-mint transition-colors p-2 focus:outline-none"
              aria-label="Toggle menu"
              id="btn-mobile-toggle"
            >
              {isMobileMenuOpen ? <X size={24} id="icon-close" /> : <Menu size={24} id="icon-open" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-brand-navy border-b border-brand-gold/20 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          id="mobile-dropdown"
        >
          <div className="px-6 py-6 flex flex-col space-y-4 bg-brand-navy" id="mobile-dropdown-inner">
            <button 
              onClick={() => handleScrollToSection("services")} 
              className="text-left text-base font-medium text-white/90 hover:text-brand-mint py-2"
              id="mlink-services"
            >
              Our Services
            </button>
            <button 
              onClick={() => handleScrollToSection("about")} 
              className="text-left text-base font-medium text-white/90 hover:text-brand-mint py-2"
              id="mlink-about"
            >
              About Dr. Namrata
            </button>
            <button 
              onClick={() => handleScrollToSection("why-choose-us")} 
              className="text-left text-base font-medium text-white/90 hover:text-brand-mint py-2"
              id="mlink-why"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => handleScrollToSection("reviews")} 
              className="text-left text-base font-medium text-white/90 hover:text-brand-mint py-2"
              id="mlink-reviews"
            >
              Patient Reviews
            </button>
            <div className="pt-4 flex flex-col gap-3" id="mobile-nav-ctas">
              <button 
                onClick={() => handleScrollToSection("booking")} 
                className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider"
                id="mbtn-book"
              >
                Request Slot
              </button>
              <a 
                href="tel:07042533395" 
                className="w-full bg-transparent border border-brand-mint text-brand-mint text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2"
                id="mbtn-call"
              >
                <Phone size={14} id="micon-phone" /> Call: 070425 33395
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative bg-brand-navy text-white min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      >
        {/* Abstract design subtle light beams */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-mint/5 rounded-full filter blur-[120px] pointer-events-none" id="hero-glow-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-brand-gold/5 rounded-full filter blur-[120px] pointer-events-none" id="hero-glow-2"></div>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" id="hero-grid"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" id="hero-content-wrapper">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto" id="hero-inner-layout">
            
            {/* Tagline Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in"
              id="hero-badge"
            >
              <Award size={14} className="text-brand-gold" id="hero-badge-icon" />
              <span>Noida Sector 76 • 5-Star Rated Clinic</span>
            </div>

            {/* Display Heading */}
            <h1 
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white max-w-3xl mb-8"
              id="hero-title"
            >
              Where Confidence Begins With Your <span className="text-brand-mint block md:inline italic font-medium">Smile</span>
            </h1>

            {/* SIGNATURE 2D INTERACTIVE SMILE ARC WITH LEFT-TO-RIGHT DRAWING EFFECT */}
            <div className="w-full max-w-lg mx-auto mb-10 flex flex-col items-center justify-center relative select-none" id="hero-smile-container">
              <div className="relative w-full h-32 md:h-40 flex items-center justify-center" id="smile-svg-wrapper">
                
                {/* Embedded custom styling for precise drawing triggers */}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes drawSmileLeftToRight {
                    0% {
                      stroke-dashoffset: 600;
                    }
                    100% {
                      stroke-dashoffset: 0;
                    }
                  }
                  @keyframes popScale {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  @keyframes floatGlimmer {
                    0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.3; }
                    50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
                  }
                  .smile-line-draw {
                    stroke-dasharray: 600;
                    stroke-dashoffset: 600;
                    animation: drawSmileLeftToRight 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  }
                  .bead-left {
                    animation: popScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s forwards;
                  }
                  .bead-right {
                    opacity: 0;
                    animation: popScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.5s forwards;
                  }
                  .sparkle-twinkle-1 {
                    opacity: 0;
                    animation: floatGlimmer 3s ease-in-out infinite, popScale 0.5s ease-out 1.7s forwards;
                  }
                  .sparkle-twinkle-2 {
                    opacity: 0;
                    animation: floatGlimmer 2.6s ease-in-out infinite 0.5s, popScale 0.5s ease-out 1.9s forwards;
                  }
                `}} />

                <svg 
                  viewBox="0 0 500 140" 
                  className="w-full h-full text-brand-mint filter drop-shadow-[0_0_15px_rgba(0,201,167,0.35)] transition-transform duration-500 hover:scale-[1.03]" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  id="hero-smile-2d-svg"
                >
                  <defs>
                    <linearGradient id="smile-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9954C" /> {/* Warm gold start */}
                      <stop offset="30%" stopColor="#00C9A7" /> {/* Transition to Electric mint */}
                      <stop offset="100%" stopColor="#00C9A7" /> {/* Finish with brilliant mint */}
                    </linearGradient>
                    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* The Smile Arc Curve */}
                  <path 
                    d="M 60 40 Q 250 135 440 40" 
                    stroke="url(#smile-grad)" 
                    strokeWidth="7" 
                    strokeLinecap="round" 
                    className="smile-line-draw" 
                    id="hero-smile-path-2d"
                  />

                  {/* Start Point Pearl (Left - Gold) */}
                  <circle 
                    cx="60" 
                    cy="40" 
                    r="8" 
                    fill="#C9954C" 
                    className="bead-left origin-[60px_40px] shadow-lg" 
                    id="smile-left-bead" 
                  />

                  {/* End Point Pearl (Right - Mint) */}
                  <circle 
                    cx="440" 
                    cy="40" 
                    r="8" 
                    fill="#00C9A7" 
                    className="bead-right origin-[440px_40px] shadow-lg" 
                    id="smile-right-bead" 
                  />

                  {/* Sparkling Clinical Stars representing perfect dental health */}
                  {/* Star 1 (Over the center curve area) */}
                  <g className="sparkle-twinkle-1 origin-[250px_92px]" id="sparkle-grp-1">
                    <path 
                      d="M 250 82 Q 250 92 260 92 Q 250 92 250 102 Q 250 92 240 92 Q 250 92 250 82 Z" 
                      fill="#C9954C" 
                    />
                  </g>

                  {/* Star 2 (Slightly to the upper right) */}
                  <g className="sparkle-twinkle-2 origin-[350px_50px]" id="sparkle-grp-2">
                    <path 
                      d="M 350 42 Q 350 50 358 50 Q 350 50 350 58 Q 350 50 342 50 Q 350 50 350 42 Z" 
                      fill="#FFFFFF" 
                    />
                  </g>
                </svg>

                {/* Micro-sparkle icons on top of the container */}
                <div className="absolute top-2 left-1/4 animate-bounce duration-1000 opacity-60">
                  <Sparkles size={16} className="text-brand-gold" />
                </div>
                <div className="absolute top-4 right-1/4 animate-pulse duration-700 opacity-60">
                  <Sparkles size={14} className="text-brand-mint" />
                </div>
              </div>

              {/* Aesthetic descriptive caption */}
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/55 font-mono mt-2" id="smile-label-2d">
                Perfect Symmetry • Left to Right Flow
              </span>
            </div>

            {/* Intro Copy */}
            <p 
              className="text-base sm:text-lg md:text-xl text-white/80 font-sans max-w-2xl mb-12 leading-relaxed"
              id="hero-desc"
            >
              Experience painless, modern dental care with Uttar Pradesh's leading specialist, 
              <strong className="text-white font-medium"> Dr. Namrata</strong>. Combining advanced state-of-the-art tech with a gentle, personal touch.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto" id="hero-ctas">
              <button 
                onClick={() => handleScrollToSection("booking")} 
                className="w-full sm:w-auto px-8 py-4 bg-brand-mint hover:bg-brand-mint/90 text-brand-navy text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-brand-mint/20 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                id="hero-cta-book"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => handleScrollToSection("services")} 
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-services"
              >
                <span>View Services</span>
                <ChevronRight size={16} id="hero-cta-services-icon" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR SECTION */}
      <section 
        id="trust-bar" 
        className="relative z-20 -mt-8 px-6 max-w-7xl mx-auto w-full"
      >
        <div 
          className="bg-white border border-brand-gold/10 rounded-2xl shadow-xl py-6 px-8 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center" 
          id="trust-bar-card"
        >
          <div className="flex flex-col items-center justify-center p-2 border-r border-gray-100 last:border-0 lg:border-r" id="trust-col-1">
            <div className="flex items-center gap-1 mb-1 text-brand-gold" id="trust-stars-wrapper">
              <Star size={16} fill="#C9954C" className="text-brand-gold" id="star-1" />
              <Star size={16} fill="#C9954C" className="text-brand-gold" id="star-2" />
              <Star size={16} fill="#C9954C" className="text-brand-gold" id="star-3" />
              <Star size={16} fill="#C9954C" className="text-brand-gold" id="star-4" />
              <Star size={16} fill="#C9954C" className="text-brand-gold" id="star-5" />
            </div>
            <span className="font-serif text-xl font-bold text-brand-navy" id="trust-rating-text">5.0 ★ Google Rating</span>
            <span className="text-[11px] uppercase tracking-wider text-brand-navy/60 font-medium" id="trust-rating-sub">Clinical Excellence</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 lg:border-r border-gray-100" id="trust-col-2">
            <span className="font-serif text-2xl font-bold text-brand-navy" id="trust-reviews-count">64+ Reviews</span>
            <span className="text-[11px] uppercase tracking-wider text-brand-navy/60 font-medium" id="trust-reviews-sub">100% Patient Satisfaction</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 border-r border-gray-100 last:border-0" id="trust-col-3">
            <span className="font-serif text-2xl font-bold text-brand-navy" id="trust-years-count">10+ Years</span>
            <span className="text-[11px] uppercase tracking-wider text-brand-navy/60 font-medium" id="trust-years-sub">Clinical Experience</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2" id="trust-col-4">
            <span className="font-serif text-2xl font-bold text-brand-navy" id="trust-patients-count">5000+ Happy</span>
            <span className="text-[11px] uppercase tracking-wider text-brand-navy/60 font-medium" id="trust-patients-sub">Patients & Families</span>
          </div>
        </div>
      </section>

      {/* 3. ABOUT DR. NAMRATA SECTION */}
      <section 
        id="about" 
        className="py-24 bg-brand-pearl"
      >
        <div className="max-w-7xl mx-auto px-6" id="about-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" id="about-grid">
            
            {/* Left Column: Testimonial & Visual Quote */}
            <div className="lg:col-span-5" id="about-left-col">
              <ScrollReveal className="h-full" id="about-left-reveal">
                <div 
                  className="bg-brand-navy text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[400px] border border-brand-gold/20"
                  id="about-quote-box"
                >
                  {/* Decorative quote mark */}
                  <div className="absolute top-6 right-8 text-brand-gold opacity-10 pointer-events-none" id="quote-decor">
                    <MessageSquareQuote size={160} id="icon-quote-decor" />
                  </div>

                  <div className="relative z-10" id="quote-card-header">
                    <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] block mb-6">Patient Spotlight</span>
                    <div className="flex gap-1 text-brand-gold mb-6" id="quote-stars">
                      <Star size={14} fill="#C9954C" id="qstar-1" />
                      <Star size={14} fill="#C9954C" id="qstar-2" />
                      <Star size={14} fill="#C9954C" id="qstar-3" />
                      <Star size={14} fill="#C9954C" id="qstar-4" />
                      <Star size={14} fill="#C9954C" id="qstar-5" />
                    </div>
                    <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-brand-pearl mb-8" id="quote-text">
                      "Highly recommend Dr. Namrata for anyone looking for quality dental care. Soft spoken, extremely skilled, and very fair pricing."
                    </blockquote>
                  </div>

                  <div className="border-t border-white/10 pt-6 relative z-10 flex items-center gap-4" id="quote-author-wrapper">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-sm" id="quote-avatar">
                      N
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white" id="quote-author-name">Noida Resident</h4>
                      <p className="text-xs text-white/60" id="quote-author-meta">Verified Google Reviewer</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Doctor Info Intro */}
            <div className="lg:col-span-7" id="about-right-col">
              <ScrollReveal delay={150} id="about-right-reveal">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4" id="about-subtitle">
                  The Specialist Behind Your Smile
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy mb-8 leading-[1.15]" id="about-title">
                  Meet Dr. Namrata
                  <span className="block text-xl font-sans text-brand-navy/60 font-normal mt-2 tracking-wide">
                    Lead Surgeon & Cosmetic Dentistry Pioneer
                  </span>
                </h2>

                <div className="space-y-6 text-brand-navy/80 text-base leading-relaxed" id="about-description">
                  <p id="about-p1">
                    With over a decade of hands-on experience in clinical and cosmetic dentistry, 
                    Dr. Namrata is dedicated to transforming how patients experience dental wellness. 
                    Known in Noida for her exceptionally <strong className="text-brand-navy font-semibold">soft-spoken, reassuring demeanor</strong>, 
                    she has earned consecutive 5-star accolades for delivering painless root canals, 
                    impeccable smile designs, and secure implants.
                  </p>
                  <p id="about-p2">
                    Our sanctuary in Sector 76 has been meticulously designed as a stress-free environment. 
                    We leverage advanced intraoral diagnostics and modern, minimally invasive procedures. 
                    At Teeth & Smile, we don't just treat dental conditions—we curate personalized oral health 
                    blueprints that align with your health, life, and aesthetic goals.
                  </p>
                </div>

                {/* Certifications or Quick stats list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-brand-navy/10 mt-8" id="about-stats-grid">
                  <div className="flex items-start gap-3" id="about-stat-1">
                    <div className="p-2 rounded-lg bg-brand-mint/10 text-brand-mint mt-0.5" id="stat-icon-wrapper-1">
                      <ShieldCheck size={18} id="stat-icon-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy" id="stat-title-1">Advanced Laser Certified</h4>
                      <p className="text-xs text-brand-navy/60" id="stat-desc-1">Suture-free, speedy healing times</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3" id="about-stat-2">
                    <div className="p-2 rounded-lg bg-brand-gold/10 text-brand-gold mt-0.5" id="stat-icon-wrapper-2">
                      <Clock size={18} id="stat-icon-2" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy" id="stat-title-2">Patient-First Scheduling</h4>
                      <p className="text-xs text-brand-navy/60" id="stat-desc-2">Guaranteed urgent emergency slots</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10" id="about-cta">
                  <button 
                    onClick={() => handleScrollToSection("booking")}
                    className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-mint text-xs font-bold uppercase tracking-widest border-b-2 border-brand-gold pb-1 hover:border-brand-mint transition-all duration-300 cursor-pointer"
                    id="about-cta-link"
                  >
                    <span>Read verified case studies</span>
                    <ChevronRight size={14} id="about-cta-arrow" />
                  </button>
                </div>

              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID SECTION */}
      <section 
        id="services" 
        className="py-24 bg-white border-t border-brand-navy/5"
      >
        <div className="max-w-7xl mx-auto px-6" id="services-container">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16" id="services-header">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4" id="services-subtitle">
              Comprehensive Dental Care
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy mb-4" id="services-title">
              Our Specialized Services
            </h2>
            <div className="w-16 h-1 bg-brand-mint mx-auto mb-6 rounded-full" id="services-decor-line"></div>
            <p className="text-brand-navy/70 text-base" id="services-desc">
              Every procedure is powered by world-class standards, strict sterilization protocols, 
              and a commitment to stress-free comfort.
            </p>
          </div>

          {/* Grid Layout of 9 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
            
            {/* 1. Teeth Whitening */}
            <ScrollReveal delay={50} id="reveal-s1">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-1"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s1-icon-container">
                  <Sparkles size={24} id="s1-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s1-title">Teeth Whitening</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s1-description">
                  Professional advanced laser whitening to safely brighten your smile up to 8 shades in a single session.
                </p>
              </div>
            </ScrollReveal>

            {/* 2. Dental Implants */}
            <ScrollReveal delay={100} id="reveal-s2">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-2"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s2-icon-container">
                  <Crown size={24} id="s2-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s2-title">Dental Implants</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s2-description">
                  Permanent, natural-looking tooth replacements utilizing top-tier biocompatible Swiss implants.
                </p>
              </div>
            </ScrollReveal>

            {/* 3. Veneers & Crowns */}
            <ScrollReveal delay={150} id="reveal-s3">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-3"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s3-icon-container">
                  <Shield size={24} id="s3-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s3-title">Veneers & Crowns</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s3-description">
                  Custom-designed porcelain laminates and zirconia crowns for complete visual transformation.
                </p>
              </div>
            </ScrollReveal>

            {/* 4. Root Canal */}
            <ScrollReveal delay={50} id="reveal-s4">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s4-icon-container">
                  <Activity size={24} id="s4-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s4-title">Root Canal</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s4-description">
                  Painless single-visit root canals using advanced computerized rotary endodontics.
                </p>
              </div>
            </ScrollReveal>

            {/* 5. Laser Dentistry */}
            <ScrollReveal delay={100} id="reveal-s5">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s5-icon-container">
                  <Zap size={24} id="s5-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s5-title">Laser Dentistry</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s5-description">
                  Suture-free, bloodless gum treatments and laser-guided sterilization for accelerated tissue healing.
                </p>
              </div>
            </ScrollReveal>

            {/* 6. Cosmetic Dentistry */}
            <ScrollReveal delay={150} id="reveal-s6">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-6"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s6-icon-container">
                  <Smile size={24} id="s6-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s6-title">Cosmetic Dentistry</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s6-description">
                  Esthetic transformations including smile contouring, tooth gap closures, and custom shade mapping.
                </p>
              </div>
            </ScrollReveal>

            {/* 7. Paediatric Dentistry */}
            <ScrollReveal delay={50} id="reveal-s7">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-7"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s7-icon-container">
                  <Baby size={24} id="s7-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s7-title">Paediatric Dentistry</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s7-description">
                  Fun, compassionate, and stress-free dental care to ensure your child’s developmental teeth grow strong.
                </p>
              </div>
            </ScrollReveal>

            {/* 8. Teeth Cleaning */}
            <ScrollReveal delay={100} id="reveal-s8">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-8"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s8-icon-container">
                  <Check size={24} id="s8-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s8-title">Teeth Cleaning</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s8-description">
                  Deep scaling and high-pressure airflow stain polishing to restore absolute hygiene and fresh breath.
                </p>
              </div>
            </ScrollReveal>

            {/* 9. Emergency Care */}
            <ScrollReveal delay={150} id="reveal-s9">
              <div 
                className="group relative bg-brand-pearl p-8 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-mint hover:-translate-y-2 hover:shadow-xl"
                id="service-card-9"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint/10 text-brand-mint flex items-center justify-center mb-6 group-hover:bg-brand-mint group-hover:text-white transition-all duration-300" id="s9-icon-container">
                  <HeartPulse size={24} id="s9-icon" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3" id="s9-title">Emergency Care</h3>
                <p className="text-brand-navy/70 text-sm leading-relaxed" id="s9-description">
                  Guaranteed immediate relief for severe pain, physical sports trauma, or infection with same-day booking.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section 
        id="why-choose-us" 
        className="py-24 bg-brand-navy text-white relative overflow-hidden"
      >
        {/* Abstract Background Design */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-radial from-brand-mint/5 to-transparent filter blur-[150px] pointer-events-none" id="why-bg-radial"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10" id="why-container">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20" id="why-header">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4" id="why-subtitle">
              Setting the Standard
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-white" id="why-title">
              Why Discerning Noida Families Trust Us
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-6 rounded-full" id="why-decor-line"></div>
          </div>

          {/* Three columns of benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12" id="why-grid">
            
            {/* Benefit 1 */}
            <ScrollReveal delay={50} id="why-reveal-1">
              <div className="flex flex-col items-center text-center px-4" id="why-card-1">
                <div className="font-serif text-5xl md:text-6xl font-bold text-brand-mint/25 mb-4" id="why-num-1">01</div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4" id="why-ctitle-1">Painless Procedures</h3>
                <p className="text-white/75 text-sm md:text-base leading-relaxed" id="why-cdesc-1">
                  We utilize specialized computerized micro-anesthesia, targeted lasers, and gentle manual protocols to ensure physical peace of mind during your visit.
                </p>
              </div>
            </ScrollReveal>

            {/* Benefit 2 */}
            <ScrollReveal delay={150} id="why-reveal-2">
              <div className="flex flex-col items-center text-center px-4" id="why-card-2">
                <div className="font-serif text-5xl md:text-6xl font-bold text-brand-gold/25 mb-4" id="why-num-2">02</div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4" id="why-ctitle-2">State-of-the-Art Equipment</h3>
                <p className="text-white/75 text-sm md:text-base leading-relaxed" id="why-cdesc-2">
                  Our clinic houses ultra-low radiation dental X-rays, computerized rotary systems, and premium sterile tools adhering strictly to global ISO criteria.
                </p>
              </div>
            </ScrollReveal>

            {/* Benefit 3 */}
            <ScrollReveal delay={250} id="why-reveal-3">
              <div className="flex flex-col items-center text-center px-4" id="why-card-3">
                <div className="font-serif text-5xl md:text-6xl font-bold text-brand-mint/25 mb-4" id="why-num-3">03</div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4" id="why-ctitle-3">Trusted by 5000+ Families</h3>
                <p className="text-white/75 text-sm md:text-base leading-relaxed" id="why-cdesc-3">
                  Over a decade of consistent, compassionate dental leadership in Sector 76. Verified by Google ratings reflecting fair, honest, and completely transparent pricing.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* Core commitment seal */}
          <ScrollReveal delay={300} id="why-reveal-seal">
            <div className="mt-20 p-8 rounded-2xl bg-white/5 border border-white/10 max-w-2xl mx-auto text-center" id="why-seal">
              <ThumbsUp className="text-brand-gold mx-auto mb-4" size={28} id="why-seal-icon" />
              <p className="text-brand-gold font-serif text-lg italic mb-2" id="why-seal-text">
                "We make every diagnosis clear and transparent. No hidden charges, no unneeded procedures."
              </p>
              <span className="text-[10px] uppercase tracking-wider text-white/50" id="why-seal-author">
                — Our Strict Ethical Promise
              </span>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 6. REVIEWS SECTION */}
      <section 
        id="reviews" 
        className="py-24 bg-brand-pearl"
      >
        <div className="max-w-7xl mx-auto px-6" id="reviews-container">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16" id="reviews-header">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4" id="reviews-subtitle">
              Words From Our Patients
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy mb-4" id="reviews-title">
              Loved By The Noida Community
            </h2>
            <div className="w-16 h-1 bg-brand-mint mx-auto mb-6 rounded-full" id="reviews-decor-line"></div>
            <p className="text-brand-navy/70 text-base" id="reviews-desc">
              Nothing speaks louder than authentic feedback. Here are verified snippets from real patients we had the honor to treat.
            </p>
          </div>

          {/* Testimonial Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="reviews-grid">
            
            {/* Review 1 */}
            <ScrollReveal delay={50} id="review-reveal-1">
              <div 
                className="bg-white p-8 rounded-2xl border border-brand-gold/10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
                id="review-card-1"
              >
                <div id="r1-content-wrapper">
                  <div className="flex gap-1 text-brand-gold mb-6" id="r1-stars">
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r1-star-1" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r1-star-2" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r1-star-3" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r1-star-4" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r1-star-5" />
                  </div>
                  <p className="text-brand-navy/80 text-base italic leading-relaxed mb-8" id="r1-text">
                    "Too good experience with such a soft spoken and friendly Doctor. Underwent wisdom tooth removal and it was completely painless."
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-6" id="r1-author">
                  <div className="w-10 h-10 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold text-sm" id="r1-avatar">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy" id="r1-name">Anjali Sharma</h4>
                    <p className="text-xs text-brand-navy/50" id="r1-meta">Google verified local guide</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Review 2 */}
            <ScrollReveal delay={150} id="review-reveal-2">
              <div 
                className="bg-white p-8 rounded-2xl border border-brand-gold/10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
                id="review-card-2"
              >
                <div id="r2-content-wrapper">
                  <div className="flex gap-1 text-brand-gold mb-6" id="r2-stars">
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r2-star-1" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r2-star-2" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r2-star-3" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r2-star-4" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r2-star-5" />
                  </div>
                  <p className="text-brand-navy/80 text-base italic leading-relaxed mb-8" id="r2-text">
                    "Highly recommend Dr. Namrata for anyone looking for quality dental care. Excellent root canal work. The place is extremely hygienic."
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-6" id="r2-author">
                  <div className="w-10 h-10 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold text-sm" id="r2-avatar">
                    V
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy" id="r2-name">Vikram Aditya</h4>
                    <p className="text-xs text-brand-navy/50" id="r2-meta">Sector 76 Noida Resident</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Review 3 */}
            <ScrollReveal delay={250} id="review-reveal-3">
              <div 
                className="bg-white p-8 rounded-2xl border border-brand-gold/10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
                id="review-card-3"
              >
                <div id="r3-content-wrapper">
                  <div className="flex gap-1 text-brand-gold mb-6" id="r3-stars">
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r3-star-1" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r3-star-2" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r3-star-3" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r3-star-4" />
                    <Star size={16} fill="#C9954C" className="text-brand-gold" id="r3-star-5" />
                  </div>
                  <p className="text-brand-navy/80 text-base italic leading-relaxed mb-8" id="r3-text">
                    "Pricing is fair and staff is friendly. Unlike other places they explain your issues patiently and recommend only what's required."
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-6" id="r3-author">
                  <div className="w-10 h-10 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center font-bold text-sm" id="r3-avatar">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy" id="r3-name">Rohan Gupta</h4>
                    <p className="text-xs text-brand-navy/50" id="r3-meta">Aditya Celebrity Homes Resident</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          <div className="text-center mt-12 animate-pulse" id="reviews-footer">
            <a 
              href="https://maps.app.goo.gl/wYv8x3bCFrgqLREr8" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-mint text-xs font-bold uppercase tracking-wider transition-colors"
              id="google-maps-citation"
            >
              <span>Verify all reviews live on Google Maps</span>
              <ExternalLink size={14} id="review-link-icon" />
            </a>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE BOOKING CTA SECTION */}
      <section 
        id="booking" 
        className="py-24 bg-brand-navy text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-mint/5 rounded-full filter blur-[120px] pointer-events-none" id="book-glow-1"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-brand-gold/5 rounded-full filter blur-[120px] pointer-events-none" id="book-glow-2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10" id="booking-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" id="booking-grid">
            
            {/* Left Col: Captivating Text and Direct Call Button */}
            <div className="lg:col-span-5" id="booking-left-col">
              <ScrollReveal id="booking-text-reveal">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4" id="booking-text-subtitle">
                  Begin Your Transformation
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight" id="booking-text-title">
                  Ready for Your Best Smile?
                </h2>
                <p className="text-white/80 text-base leading-relaxed mb-8" id="booking-text-desc">
                  Schedule an in-person diagnostic slot with <strong className="text-brand-mint">Dr. Namrata</strong> today. 
                  Use our immediate request callback form or dial our official hotline directly. We accommodate emergency pain visits within the hour.
                </p>

                {/* Direct Telephone CTA Button */}
                <div className="flex flex-col gap-4" id="booking-ctas-panel">
                  <a 
                    href="tel:07042533395" 
                    className="flex items-center justify-center sm:justify-start gap-4 p-5 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-brand-gold/10"
                    id="cta-direct-tel"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-navy/15 flex items-center justify-center text-brand-navy" id="direct-tel-icon-wrapper">
                      <Phone size={24} className="animate-bounce" id="direct-tel-icon" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block font-bold text-brand-navy/60" id="direct-tel-label">Click to Call Directly</span>
                      <span className="font-serif text-xl font-bold" id="direct-tel-number">070425 33395</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 px-2 text-white/60 text-xs" id="booking-urgency-note">
                    <div className="w-2 h-2 rounded-full bg-brand-mint animate-ping" id="urgency-dot"></div>
                    <p id="urgency-label">Currently accepting new patients in Sector 76 & surrounding sectors.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Col: High-End Interactive Appointment Form */}
            <div className="lg:col-span-7" id="booking-right-col">
              <ScrollReveal delay={150} id="booking-form-reveal">
                <div 
                  className="bg-white/5 border border-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl"
                  id="booking-form-card"
                >
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2" id="form-card-title">
                    Request an Appointment Slot
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mb-6" id="form-card-desc">
                    Fill out this form and our receptionist will confirm your slot within 15 minutes.
                  </p>

                  {bookingSubmitted ? (
                    /* Beautiful Success State */
                    <div className="text-center py-12 px-4" id="booking-success-state">
                      <div className="w-16 h-16 rounded-full bg-brand-mint/20 text-brand-mint flex items-center justify-center mx-auto mb-6" id="success-icon-wrapper">
                        <Check size={36} id="success-icon" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-white mb-2" id="success-title">
                        Request Received!
                      </h4>
                      <p className="text-white/80 text-sm max-w-sm mx-auto mb-8" id="success-message">
                        Thank you, <strong className="text-white">{bookingData.name}</strong>. Our clinical team is reviewing current calendar slots for {bookingData.date || "your preferred date"} and will call you back at <strong className="text-brand-mint">{bookingData.phone}</strong> shortly.
                      </p>
                      <button 
                        onClick={handleResetBooking}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        id="btn-success-reset"
                      >
                        Submit another request
                      </button>
                    </div>
                  ) : (
                    /* Active Request Form */
                    <form onSubmit={handleBookingSubmit} className="space-y-4" id="booking-form-element">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-row-1">
                        <div id="form-group-name">
                          <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1 font-bold" htmlFor="patient-name">
                            Your Full Name *
                          </label>
                          <input 
                            id="patient-name"
                            type="text" 
                            required
                            placeholder="e.g. Rahul Mishra"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-mint focus:outline-none focus:bg-white/10 text-white text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                        <div id="form-group-phone">
                          <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1 font-bold" htmlFor="patient-phone">
                            Mobile Number *
                          </label>
                          <input 
                            id="patient-phone"
                            type="tel" 
                            required
                            placeholder="e.g. 098765 43210"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-mint focus:outline-none focus:bg-white/10 text-white text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-row-2">
                        <div id="form-group-service">
                          <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1 font-bold" htmlFor="patient-service">
                            Required Service
                          </label>
                          <select 
                            id="patient-service"
                            value={bookingData.service}
                            onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-navy border border-white/10 rounded-xl focus:border-brand-mint focus:outline-none focus:bg-white/10 text-white text-sm transition-all"
                          >
                            <option value="Teeth Whitening" className="bg-brand-navy text-white">Teeth Whitening</option>
                            <option value="Dental Implants" className="bg-brand-navy text-white">Dental Implants</option>
                            <option value="Veneers & Crowns" className="bg-brand-navy text-white">Veneers & Crowns</option>
                            <option value="Root Canal" className="bg-brand-navy text-white">Root Canal</option>
                            <option value="Laser Dentistry" className="bg-brand-navy text-white">Laser Dentistry</option>
                            <option value="Cosmetic Dentistry" className="bg-brand-navy text-white">Cosmetic Dentistry</option>
                            <option value="Paediatric Dentistry" className="bg-brand-navy text-white">Paediatric Dentistry</option>
                            <option value="Teeth Cleaning" className="bg-brand-navy text-white">Teeth Cleaning</option>
                            <option value="Emergency Care" className="bg-brand-navy text-white">Emergency Care</option>
                          </select>
                        </div>
                        <div id="form-group-date">
                          <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1 font-bold" htmlFor="patient-date">
                            Preferred Appointment Date
                          </label>
                          <input 
                            id="patient-date"
                            type="date" 
                            value={bookingData.date}
                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-mint focus:outline-none focus:bg-white/10 text-white text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div id="form-group-message">
                        <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1 font-bold" htmlFor="patient-message">
                          Brief message or symptoms (Optional)
                        </label>
                        <textarea 
                          id="patient-message"
                          rows={3}
                          placeholder="e.g. Sensitivity in upper left molar..."
                          value={bookingData.message}
                          onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-mint focus:outline-none focus:bg-white/10 text-white text-sm transition-all resize-none placeholder:text-white/20"
                        />
                      </div>

                      <button 
                        id="btn-form-submit"
                        type="submit"
                        className="w-full py-4 bg-brand-mint hover:bg-brand-mint/90 text-brand-navy text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        Send Callback Request
                      </button>

                      <p className="text-[10px] text-center text-white/40" id="form-privacy-note">
                        🔒 Your phone number is strictly used for booking purposes only.
                      </p>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer 
        id="footer" 
        className="bg-brand-navy text-white pt-20 pb-8 border-t border-white/10 relative"
      >
        <div className="max-w-7xl mx-auto px-6" id="footer-container">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10" id="footer-grid">
            
            {/* Col 1: Brand & Bio */}
            <div className="space-y-6" id="footer-col-1">
              <div className="flex flex-col" id="footer-logo">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Teeth <span className="text-brand-mint">&</span> Smile
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-medium mt-1">
                  Dental Clinic • Dr. Namrata
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed" id="footer-col-1-text">
                Providing Noida residents with the ultimate premium, pain-free dental healthcare experience. 
                Our 5-star clinic features state-of-the-art diagnostics and patient-first specialty care.
              </p>
            </div>

            {/* Col 2: Services Quick Links */}
            <div id="footer-col-2">
              <h4 className="font-serif text-lg font-bold text-brand-gold mb-6" id="footer-col-2-title">Our Services</h4>
              <ul className="space-y-3 text-sm text-white/70" id="footer-services-list">
                <li><button onClick={() => handleScrollToSection("services")} className="hover:text-brand-mint transition-colors cursor-pointer" id="flink-s1">Teeth Whitening</button></li>
                <li><button onClick={() => handleScrollToSection("services")} className="hover:text-brand-mint transition-colors cursor-pointer" id="flink-s2">Dental Implants</button></li>
                <li><button onClick={() => handleScrollToSection("services")} className="hover:text-brand-mint transition-colors cursor-pointer" id="flink-s3">Veneers & Crowns</button></li>
                <li><button onClick={() => handleScrollToSection("services")} className="hover:text-brand-mint transition-colors cursor-pointer" id="flink-s4">Root Canal Treatment</button></li>
                <li><button onClick={() => handleScrollToSection("services")} className="hover:text-brand-mint transition-colors cursor-pointer" id="flink-s5">Laser Dentistry</button></li>
              </ul>
            </div>

            {/* Col 3: Clinical Hours */}
            <div id="footer-col-3">
              <h4 className="font-serif text-lg font-bold text-brand-gold mb-6" id="footer-col-3-title">Clinical Hours</h4>
              <ul className="space-y-3 text-sm text-white/70" id="footer-hours-list">
                <li className="flex justify-between" id="fhours-row-1">
                  <span id="fhours-day-1">Monday – Saturday</span>
                  <span className="text-brand-mint font-bold" id="fhours-time-1">10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between text-white/40" id="fhours-row-2">
                  <span id="fhours-day-2">Sunday</span>
                  <span id="fhours-time-2">Closed</span>
                </li>
                <li className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-brand-gold" id="fhours-note">
                  <Clock size={14} id="fhours-note-icon" />
                  <span>Appointments highly recommended</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Reach Us */}
            <div className="space-y-6" id="footer-col-4">
              <h4 className="font-serif text-lg font-bold text-brand-gold mb-6" id="footer-col-4-title">Contact & Location</h4>
              <ul className="space-y-4 text-sm text-white/70" id="footer-contact-list">
                <li className="flex items-start gap-3" id="fcontact-row-1">
                  <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" id="fcontact-icon-1" />
                  <span id="fcontact-text-1">
                    Shop No. 20, Aditya Celebrity Homes, Sector 76, Noida, Uttar Pradesh 201301, India
                  </span>
                </li>
                <li className="flex items-center gap-3" id="fcontact-row-2">
                  <Phone size={18} className="text-brand-gold shrink-0" id="fcontact-icon-2" />
                  <a href="tel:07042533395" className="hover:text-brand-mint transition-colors font-bold text-white text-base" id="fcontact-text-2">
                    070425 33395
                  </a>
                </li>
              </ul>

              {/* Google Maps Embed Link */}
              <div className="pt-2" id="footer-map-action">
                <a 
                  href="https://maps.app.goo.gl/wYv8x3bCFrgqLREr8" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-brand-mint text-white hover:text-brand-mint rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  id="footer-maps-button"
                >
                  <MapPin size={14} id="btn-map-icon" />
                  <span>Get Directions in Maps</span>
                  <ExternalLink size={12} id="btn-map-arrow" />
                </a>
              </div>
            </div>

          </div>

          {/* Sub Footer */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4" id="sub-footer">
            <p id="sub-footer-copyright">
              © {new Date().getFullYear()} Teeth & Smile Dental Clinic. All Rights Reserved. 
            </p>
            <p id="sub-footer-credits">
              Curated for clinical perfection by Dr. Namrata & team.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
