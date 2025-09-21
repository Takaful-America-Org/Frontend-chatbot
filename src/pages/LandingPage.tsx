import { useEffect, useRef, useState } from "react";
import {  motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      const a = target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const element = document.querySelector(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="relative font-poppins text-neutral-900 overflow-x-hidden">
      {/* Floating Islamic Elements */}
      <FloatingElements />

      {/* HEADER */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl border-b border-yellow-500/10 ${
          scrolled
            ? "bg-white/98 py-2 shadow-lg"
            : "bg-white/95 py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-full items-center justify-between px-4 md:px-8 relative">
          <div className="flex items-center gap-4 lg:gap-0">
            {/* Hamburger - Only visible on mobile/tablet, positioned first */}
            <div
              className={`hamburger lg:hidden flex flex-col gap-1.5 cursor-pointer p-2 ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
            </div>

            <a
              href="#home"
              className="font-amiri text-6xl font-bold flex items-center gap-2 logo-gradient hover:scale-105 transition-transform duration-300"
            >
              ☪ Takaful
            </a>
          </div>

          <ul
            className={`font-poppins text-xl font-semibold lg:flex items-center gap-10 ${
              menuOpen 
                ? "flex flex-col gap-6 absolute top-full left-0 bg-white/98 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-yellow-500/10 min-w-[200px] transform-none opacity-90 visible"
                : "hidden"
            } lg:static lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:rounded-none lg:shadow-none lg:border-none lg:min-w-0`}
          >
            <li><a href="#home" className="nav-link-effect relative text-neutral-900 hover:text-yellow-600 hover:-translate-y-0.5 transition-all duration-300">Home</a></li>
            <li><a href="#features" className="nav-link-effect relative text-neutral-900 hover:text-yellow-600 hover:-translate-y-0.5 transition-all duration-300">Features</a></li>
            <li><a href="#why-choose" className="nav-link-effect relative text-neutral-900 hover:text-yellow-600 hover:-translate-y-0.5 transition-all duration-300">Why Choose Us</a></li>
            <li><a href="#testimonials" className="nav-link-effect relative text-neutral-900 hover:text-yellow-600 hover:-translate-y-0.5 transition-all duration-300">Testimonials</a></li>
            <li><a href="#contact" className="nav-link-effect relative text-neutral-900 hover:text-yellow-600 hover:-translate-y-0.5 transition-all duration-300">Contact</a></li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Get Quote Button */}
            <Link to="/quote" className="btn-gold-gradient text-white px-10 py-5 rounded-full font-semibold text-xl relative overflow-hidden btn-shine hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/40 transition-all duration-300 inline-block">
              Get Quote
            </Link>

            {/* Hamburger Menu - positioned after the button */}
            <div
              className={`hamburger lg:hidden flex flex-col gap-1.5 cursor-pointer p-2 ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
              <span className="w-6 h-0.5 bg-slate-900 transition-all duration-300 rounded-sm"></span>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="hero-bg relative min-h-screen flex items-center overflow-hidden py-24 px-20"
      >
        <IslamicHeroPattern />
        <Particles count={20} />

        <div className="relative z-10 mx-auto grid max-w-full grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-24 items-center text-center lg:text-left">
          <div className="text-white">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-amiri text-6xl font-bold leading-tight md:text-7xl lg:text-8xl mb-12 mt-24"
            >
              Protect Your Home with{" "}
              <span className="hero-highlight">Shariah-Compliant</span> Insurance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl leading-9 md:text-3xl lg:text-2xl text-white/90 mb-20 max-w-5xl mx-auto lg:mx-0"
            >
              Experience ultimate peace of mind with our premium halal home
              insurance solutions. Built on authentic Islamic principles of mutual cooperation, 
              transparency, and shared responsibility for the modern Muslim family.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              <a href="#quote" className="btn-emerald-gradient text-white px-16 py-6 rounded-full font-semibold text-2xl hover:-translate-y-1 transition-all duration-300">
                Get Instant Quote
              </a>
              <a href="#features" className="bg-white/10 border-2 border-white/30 backdrop-blur-lg text-white px-16 py-6 rounded-full font-semibold text-2xl hover:bg-white/20 hover:border-yellow-500 hover:-translate-y-1 transition-all duration-300">
                Discover Benefits
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative flex items-center justify-center mt-16 lg:mt-0"
          >
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              initial={{ rotate: -5 }}
              className="hero-card-top bg-white/95 backdrop-blur-xl rounded-3xl px-16 py-24 shadow-2xl relative overflow-hidden text-center transform hover:shadow-3xl transition-all duration-500 max-w-lg"
            >
              <div className="text-9xl mb-8 logo-gradient">
                🏡
              </div>
              <h3 className="font-amiri text-4xl font-semibold text-slate-800 mb-4">
                Your Home, Protected
              </h3>
              <p className="text-neutral-600 text-xl leading-7">
                Comprehensive coverage that aligns with your Islamic values
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-32 text-white bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent"></div>
        <div className="relative z-10 mx-auto grid max-w-full grid-cols-1 gap-20 px-4 md:px-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <StatItem target={50000} label="Families Protected" />
          <StatItem target={99} label="Claims Satisfaction %" />
          <StatItem target={15} label="Years Experience" />
          <StatItem target={24} label="Hour Support" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-40">
        <IslamicDotsPattern />
        <div className="mx-auto max-w-full px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="font-amiri text-5xl md:text-6xl lg:text-7xl text-slate-800 mb-8 relative section-underline">
              Why Choose Takaful Insurance?
            </h2>
            <p className="text-2xl md:text-3xl lg:text-2xl text-neutral-600 max-w-5xl mx-auto leading-9">
              Our comprehensive insurance products are meticulously designed to comply with authentic Islamic law
              while providing world-class protection for your most valuable asset - your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-3 px-12 md:px-20">
            {featureData.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why-choose" className="bg-white py-40">
        <div className="mx-auto grid max-w-full grid-cols-1 items-center gap-32 px-12 md:px-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h2 className="font-amiri text-6xl md:text-7xl lg:text-6xl text-slate-800 mb-12">
              The Takaful Advantage
            </h2>
            <p className="text-2xl md:text-3xl lg:text-2xl text-neutral-600 mb-16 leading-9 max-w-4xl mx-auto lg:mx-0">
              Discover what sets us apart in the world of Islamic insurance. Our commitment to authentic 
              Islamic principles combined with modern insurance expertise creates unparalleled value.
            </p>
            <ul className="space-y-0">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefits-check flex items-center gap-8 py-8 border-b border-black/5 text-2xl hover:translate-x-2 hover:text-yellow-600 transition-all duration-300 cursor-pointer">
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left mt-24 lg:mt-0"
          >
            <h2 className="font-amiri text-5xl md:text-6xl lg:text-5xl text-slate-800 mb-12">
              Islamic Values at Our Foundation
            </h2>
            <p className="text-xl md:text-2xl lg:text-xl text-neutral-600 mb-16 leading-8 max-w-4xl mx-auto lg:mx-0">
              Every aspect of our service is guided by authentic Islamic principles that have guided Muslims for over 1400 years.
            </p>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  whileHover={{ y: -10 }}
                  className="value-card-top bg-gradient-to-br from-amber-50 to-white p-12 rounded-2xl transition-all duration-400 border border-yellow-500/10 relative overflow-hidden text-center hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="text-6xl mb-8">{value.icon}</div>
                  <h4 className="font-amiri text-2xl font-semibold text-slate-800 mb-6">
                    {value.title}
                  </h4>
                  <p className="text-neutral-600 text-lg leading-7">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-40 bg-stone-50">
        <div className="mx-auto max-w-full px-4 md:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-amiri text-5xl md:text-6xl lg:text-7xl text-slate-800 mb-20"
          >
            What Our Community Says
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-6xl bg-white p-16 rounded-2xl text-left shadow-xl border-l-4 border-yellow-500"
          >
            <p className="text-2xl md:text-3xl italic text-neutral-800 leading-10 mb-12">
              "Finally, an insurance company that truly understands our Islamic values. When our home was 
              damaged in a storm, Takaful handled everything with such care and speed. The entire process was 
              transparent and completely halal. Alhamdulillah!"
            </p>
            <div className="text-2xl font-semibold text-yellow-600">
              — Fatima Al-Zahra, Satisfied Customer
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="quote"
        className="btn-hero-gradient relative overflow-hidden py-40 text-white text-center"
      >
        <div className="absolute inset-0 cta-pattern"></div>
        <div className="relative z-10 mx-auto max-w-full px-4 md:px-8">
          <h2 className="font-amiri text-6xl md:text-7xl lg:text-8xl mb-10">
            Ready to Protect Your Home the Halal Way?
          </h2>
          <p className="mx-auto max-w-5xl text-2xl md:text-3xl lg:text-2xl mb-16 opacity-95 leading-10">
            Join over 50,000 Muslim families who trust Takaful for their home insurance needs. 
            Get a personalized quote in minutes and experience insurance that aligns with your faith.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <a href="#" className="bg-white text-slate-800 px-16 py-6 rounded-full font-semibold text-2xl hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
              Get Your Free Quote Now
            </a>
            <a href="#contact" className="bg-white/10 border-2 border-white/30 backdrop-blur-lg text-white px-16 py-6 rounded-full font-semibold text-2xl hover:bg-white/20 hover:border-yellow-500 hover:-translate-y-1 transition-all duration-300">
              Speak with an Expert
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-900 py-32 text-white">
        <div className="mx-auto grid max-w-full grid-cols-1 gap-20 px-4 md:px-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-amiri text-2xl text-yellow-500 mb-10 font-semibold">Takaful Insurance</h4>
            <p className="text-white/80 leading-9 mb-8 text-lg">
              Leading provider of Shariah-compliant home insurance solutions, serving the Muslim community 
              with integrity, transparency, and authentic Islamic values since 2010.
            </p>
            <p className="text-white/80 leading-9 text-lg">
              <strong className="text-white">Licensed & Regulated by:</strong>
              <br />Islamic Financial Services Board (IFSB)
              <br />National Insurance Commission
            </p>
          </div>
          
          <div>
            <h4 className="font-amiri text-2xl text-yellow-500 mb-10 font-semibold">Our Services</h4>
            <div className="space-y-4 text-white/80">
              {services.map((service) => (
                <div key={service}>
                  <a href="#" className="hover:text-yellow-500 hover:translate-x-1 transition-all duration-300 block leading-9 text-lg">
                    {service}
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-amiri text-2xl text-yellow-500 mb-10 font-semibold">Get in Touch</h4>
            <div className="space-y-4 text-white/80 leading-9 text-lg">
              <p>📧 salam@takaful-home.com</p>
              <p>📞 1-800-TAKAFUL (825-2385)</p>
              <p>💬 Live Chat Available 24/7</p>
              <p>
                📍 123 Islamic Finance Boulevard
                <br />Suite 456, Muslim Quarter
                <br />Your City, State 12345
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-amiri text-2xl text-yellow-500 mb-10 font-semibold">Islamic Certifications</h4>
            <div className="space-y-4 text-white/80 leading-9 text-lg">
              <p>✓ AAOIFI Standards Compliant</p>
              <p>✓ Independent Shariah Board Certified</p>
              <p>✓ Islamic Finance Foundation Member</p>
              <p>✓ Halal Investment Portfolio</p>
            </div>
            <p className="mt-8 text-white/70 leading-8 text-lg">
              <strong className="text-white/80">Prayer Times Support:</strong>
              <br />Customer service respects Islamic prayer times
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-full border-t border-white/10 px-4 md:px-8 pt-10 text-center text-white/60">
          <p className="leading-8 text-lg">
            © 2025 Takaful Islamic Insurance. All rights reserved. | Protecting Muslim Families with Faith-Based Insurance Solutions | 
            <a href="#" className="text-yellow-500 hover:underline"> Privacy Policy</a> | 
            <a href="#" className="text-yellow-500 hover:underline"> Shariah Compliance</a>
          </p>
          <p className="mt-6 text-base opacity-70">
            Powered by{" "}
            <a 
              href="https://dataorbitllc.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-yellow-500 hover:underline font-medium transition-colors duration-300"
            >
              DataOrbit
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}


/** --- Sub components --- **/

function FloatingElements() {
  return (
    <>
      <div className="fixed top-1/4 left-1/4 text-3xl opacity-10 pointer-events-none animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}>☪</div>
      <div className="fixed bottom-1/4 right-1/4 text-2xl opacity-10 pointer-events-none animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}>🕌</div>
      <div className="fixed top-1/3 right-1/4 text-4xl opacity-10 pointer-events-none animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}>✨</div>
    </>
  );
}

function IslamicHeroPattern() {
  return <div className="absolute inset-0 islamic-pattern-geometric pointer-events-none"></div>;
}

function IslamicDotsPattern() {
  return <div className="absolute inset-0 islamic-pattern-dots pointer-events-none"></div>;
}

function Particles({ count = 20 }) {
  useEffect(() => {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = particle.style.height = (Math.random() * 4 + 1) + 'px';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
      container.appendChild(particle);
    }
  }, [count]);

  return <div id="hero-particles" className="absolute inset-0 overflow-hidden pointer-events-none"></div>;
}

function StatItem({ target, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="stat-gradient font-amiri text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
        {value.toLocaleString()}
      </div>
      <div className="text-white/90 text-xl md:text-2xl uppercase tracking-wide font-medium">
        {label}
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="feature-card-border bg-white p-16 rounded-3xl text-center shadow-lg border border-yellow-500/10 relative overflow-hidden hover:-translate-y-4 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
    >
      <div className="text-8xl mb-10">{icon}</div>
      <h3 className="font-amiri text-3xl font-semibold text-slate-800 mb-8">
        {title}
      </h3>
      <p className="text-neutral-600 text-lg leading-8">{desc}</p>
    </motion.div>
  );
}

/* Data */
const featureData = [
  { 
    icon: "☪", 
    title: "100% Shariah Compliant", 
    desc: "All our products are rigorously certified by qualified Islamic scholars and fully comply with Islamic principles of finance, ensuring complete peace of mind for practicing Muslims." 
  },
  { 
    icon: "🤝", 
    title: "Mutual Cooperation", 
    desc: "Built on the beautiful Islamic concept of Ta'awun (mutual assistance), where community members support each other during times of hardship and need." 
  },
  { 
    icon: "💎", 
    title: "Transparent & Ethical", 
    desc: "Absolutely no hidden fees, zero interest (riba), and complete transparency in all transactions, policy terms, and investment strategies." 
  },
  { 
    icon: "🛡️", 
    title: "Comprehensive Protection", 
    desc: "Guard against fire damage, theft, natural disasters, structural issues, and other unforeseen events with our extensive coverage options." 
  },
  { 
    icon: "⚡", 
    title: "Lightning-Fast Claims", 
    desc: "Experience rapid and hassle-free claim processing with dedicated support from our team of Islamic insurance specialists and adjusters." 
  },
  { 
    icon: "📞", 
    title: "Premium Support", 
    desc: "Access round-the-clock customer support available in multiple languages including Arabic, English, and Urdu to assist with all your insurance needs." 
  },
];

const benefits = [
  "Zero interest-based transactions (Riba-free)",
  "Equitable profit sharing with participants", 
  "Ethical investment of pooled funds",
  "Independent Shariah board oversight",
  "Community-centered approach to coverage",
  "Integrated charitable giving (Zakat) options",
  "Transparent fee structure and operations",
  "Halal investment portfolio management",
];

const values = [
  { 
    icon: "🕌", 
    title: "Tawhid", 
    desc: "Unity of purpose in serving Allah and protecting our community" 
  },
  { 
    icon: "⚖️", 
    title: "Adl", 
    desc: "Justice and fairness in all our dealings and claim settlements" 
  },
  { 
    icon: "🤲", 
    title: "Ta'awun", 
    desc: "Mutual assistance and cooperation among community members" 
  },
  { 
    icon: "💝", 
    title: "Ihsan", 
    desc: "Excellence and beauty in service delivery and customer care" 
  },
];

const services = [
  "Home Insurance Coverage",
  "Rapid Claims Processing", 
  "Islamic Investment Options",
  "24/7 Customer Support",
  "Shariah Advisory Services",
  "Community Outreach Programs",
];