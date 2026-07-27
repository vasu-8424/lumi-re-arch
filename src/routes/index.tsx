import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import hero from "@/assets/hero.jpg";
import reception from "@/assets/reception.jpg";
import library from "@/assets/library.jpg";
import play from "@/assets/play.jpg";
import sensory from "@/assets/sensory.jpg";
import classroom from "@/assets/classroom.jpg";
import outdoor from "@/assets/outdoor.jpg";
import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guild Services — Turnkey Play Schools, Preschools & OT Sensory Equipment" },
      {
        name: "description",
        content:
          "Complete turnkey setups for Play Schools, Preschools, Primary Schools, and Child Development / OT Centers. Civil works, interiors, sensory play equipment, ergonomic furniture, and branding.",
      },
      {
        property: "og:title",
        content: "Guild Services — Turnkey Setup for Play Schools & Sensory Centers",
      },
      {
        property: "og:description",
        content:
          "Vibrant interior design, sensory therapy equipment, soft play modules & ergonomic school furniture for Play Schools, Preschools & Clinics.",
      },
    ],
  }),
  component: Index,
});

export function Index() {
  return (
    <div className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--ink)]">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <WhyUsPitch />
      <Journey />
      <BigStatement />
      <ServicesFilm />
      <Gallery />
      <Contact />
      <Foot />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const sendToWhatsApp = (formData: {
  name: string;
  phone: string;
  email?: string;
  org?: string;
  details?: string;
}) => {
  const whatsappNumber = "918008227539";
  let message = `*Guild Services / Guild Club Inquiry*\n\n`;
  if (formData.name) message += `👤 *Name:* ${formData.name}\n`;
  if (formData.phone) message += `📞 *Phone:* ${formData.phone}\n`;
  if (formData.email) message += `✉️ *Email:* ${formData.email}\n`;
  if (formData.org) message += `🏫 *Institution:* ${formData.org}\n`;
  if (formData.details) message += `📝 *Details:* ${formData.details}\n`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const org = (form.elements.namedItem("org") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "";

    sendToWhatsApp({ name, org, email, phone });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-md transition-all duration-300 ${scrolled ? "py-1" : "py-1.5 md:py-2"}`}
    >
      {/* Top Banner Strip for Instant Highlights */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-[10px] sm:text-[11px] font-mono tracking-wider py-1 px-4 border-b border-blue-800/50 mb-1">
        <div className="mx-auto flex items-center justify-between max-w-[1600px]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-blue-200">Turnkey Play School & Child Center Setup</span>
            <span className="sm:hidden text-blue-200">Turnkey Setup</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 font-bold">
            <a
              href="#partner"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-white transition-all hover:scale-105 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40"
            >
              <span>🤝 Partner With Us</span>
            </a>
            <span className="text-blue-700">|</span>
            <a
              href="#get-started"
              className="inline-flex items-center gap-1 text-rose-300 hover:text-white transition-all hover:scale-105 bg-red-500/20 px-2.5 py-0.5 rounded-full border border-red-400/40"
            >
              <span>🚀 Get Started</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex items-center justify-between px-6 md:px-10 max-w-[1600px] transition-all duration-300">
        <a
          href="#top"
          data-cursor="link"
          data-cursor-label="home"
          className="flex items-center gap-3 group"
        >
          <div
            className={`relative shrink-0 overflow-hidden rounded-full border-2 border-red-500 bg-white p-0.5 shadow-md group-hover:scale-105 transition-all duration-300 ${scrolled ? "h-8 w-8" : "h-10 w-10 md:h-11 md:w-11"}`}
          >
            <img
              src={logo}
              alt="Guild Club Logo"
              className="h-full w-full object-cover scale-110 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display tracking-tight leading-none font-bold text-blue-950 transition-all duration-300 ${scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"}`}
            >
              <span className="italic">Guild</span> Services
              <span className="text-red-600">.</span>
            </span>
            <span
              className={`font-mono uppercase tracking-[0.28em] text-red-600 font-bold transition-all duration-300 ${scrolled ? "text-[8px]" : "text-[9px] mt-0.5"}`}
            >
              Guild Club
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {["Journey", "Services", "Gallery", "Promise"].map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              data-cursor="link"
              data-cursor-label="→"
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-blue-950/80 hover:text-blue-950 font-semibold"
            >
              <span className="relative">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}

          {/* HIGHLIGHTED SECTIONS IN TOP NAV */}
          <a
            href="#partner"
            data-cursor="link"
            data-cursor-label="partner"
            className="group relative font-mono text-[11px] uppercase tracking-[0.16em] font-extrabold px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-950 border border-amber-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm flex items-center gap-1.5 hover:scale-105"
          >
            <span className="text-xs">🤝</span>
            <span>Partner With Us</span>
          </a>

          <a
            href="#get-started"
            data-cursor="link"
            data-cursor-label="get started"
            className="group relative font-mono text-[11px] uppercase tracking-[0.16em] font-extrabold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white border border-red-400 hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 hover:scale-105"
          >
            <span className="text-xs">🚀</span>
            <span>Get Started</span>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/918008227539"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-full border border-emerald-300 hover:bg-emerald-600 hover:text-white transition-all font-bold"
          >
            <span>WhatsApp Us</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            data-cursor="link"
            data-cursor-label="enquire"
            className="group relative overflow-hidden rounded-full border border-[color:var(--ink)]/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] backdrop-blur"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[color:var(--cream)]">
              Commission
            </span>
            <span className="absolute inset-0 -translate-y-full bg-[color:var(--ink)] transition-transform duration-500 group-hover:translate-y-0" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-[color:var(--ink)]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="absolute left-1/2 top-1/2 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-[color:var(--cream)] p-10 shadow-2xl border border-[color:var(--ink)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={logo}
                  alt="Guild Logo"
                  className="h-10 w-10 object-cover rounded-full bg-white p-0.5 border"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--copper)] font-semibold">
                  Enquire · Guild Services
                </p>
              </div>
              <h3 className="font-display text-4xl">Begin your project.</h3>
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
                Complete turnkey setup for Child Development Centers, Play Schools, and Educational
                Institutions. Submitting will redirect directly to WhatsApp.
              </p>
              <form className="mt-8 space-y-4" onSubmit={handleModalSubmit}>
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <input
                  name="org"
                  placeholder="Institution / Organization"
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Phone number (WhatsApp)"
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <button
                  type="submit"
                  className="mt-6 w-full border border-emerald-600 bg-emerald-600 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-emerald-700 font-bold"
                >
                  Send Inquiry via WhatsApp →
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-blue-950 flex items-center pt-28 sm:pt-32 md:pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={hero}
          alt="Child and Teacher Play School Sensory Equipment Setup"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-950/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-2xl bg-blue-950/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
          {/* Promotional Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/90 px-4 py-1.5 border border-blue-400/40 shadow-xl text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span>• SAME-DAY QUOTE • GST INVOICE • PAN-INDIA DELIVERY</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-white">
            <RevealLine>You Show Us the Space.</RevealLine>
            <RevealLine delay={0.15}>
              <span className="text-white">We Build the </span>
              <span className="italic text-[color:var(--brass)] font-serif">Vision</span>.
            </RevealLine>
          </h1>

          {/* Clean, Streamlined Sub-heading */}
          <p className="mt-4 text-sm sm:text-base text-blue-100 font-sans font-medium leading-relaxed">
            The Absolute One-Stop Solution for Setting Up Child Development Centers, Play Schools, and Educational Institutions.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/918008227539?text=Hi%2C%20I%20would%20like%20to%20get%20a%20bulk%20quote%20for%20an%20educational%2Fplay%20school%20setup."
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              data-cursor-label="quote"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-blue-950 font-bold shadow-2xl hover:bg-blue-50 transition-all scale-100 hover:scale-105"
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Get a Bulk Quote</span>
            </a>

            <a
              href="#journey"
              data-cursor="link"
              data-cursor-label="explore"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white font-bold hover:bg-white hover:text-blue-950 transition-all"
            >
              <span>Browse Services →</span>
            </a>
          </div>

          {/* WhatsApp Note */}
          <div className="mt-4 flex items-center gap-2 font-sans text-xs text-blue-200/90 font-medium">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Or chat on <strong>WhatsApp (+91 8008227539)</strong> — we reply within minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatingObject({
  className = "",
  size = 60,
  shape,
}: {
  className?: string;
  size?: number;
  shape: "cube" | "sphere" | "paper";
}) {
  const style: React.CSSProperties = { width: size, height: size };
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style} aria-hidden>
      {shape === "cube" && (
        <div
          className="h-full w-full rotate-12"
          style={{
            background:
              "linear-gradient(135deg, var(--oak) 0%, var(--oak-deep) 60%, var(--charcoal) 100%)",
            boxShadow: "0 30px 60px -20px rgba(60,30,10,0.35)",
            borderRadius: 4,
          }}
        />
      )}
      {shape === "sphere" && (
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #fff, var(--brass) 55%, var(--copper) 100%)",
            boxShadow: "0 30px 60px -20px rgba(80,40,10,0.5)",
          }}
        />
      )}
      {shape === "paper" && (
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
        >
          <polygon
            points="10,50 90,10 50,50 90,90"
            fill="var(--cream)"
            stroke="var(--ink)"
            strokeWidth="0.6"
          />
          <polygon points="10,50 50,50 90,90" fill="var(--bone)" opacity="0.9" />
        </svg>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Marquee() {
  const words = [
    "Play School Setup",
    "✦",
    "Sensory & OT Equipment",
    "✦",
    "Soft Play Zones",
    "✦",
    "Ergonomic Kids Furniture",
    "✦",
    "Child Safety Flooring",
    "✦",
    "Vibrant Wall Murals",
    "✦",
    "Pan-India Delivery",
    "✦",
  ];
  return (
    <section className="relative border-y border-[color:var(--ink)]/15 bg-blue-50/50 py-8">
      <div className="marquee-track flex whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-14 pr-14">
            {words.map((w, i) => (
              <span
                key={i}
                className={`font-display text-4xl md:text-5xl ${w === "✦" ? "text-red-500 font-bold" : "text-blue-900 font-bold"}`}
              >
                {w === "✦" ? "✦" : <span className="italic">{w}</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const journey = [
  {
    name: "Institution Reception Foyer",
    src: reception,
    note: "Modern reception architectural layout featuring a rounded front counter, acoustic wall paneling, child-safe entry gates, and institutional branding.",
  },
  {
    name: "Sensory OT Therapy Room",
    src: sensory,
    note: "Complete Sensory OT room setup featuring ceiling-mounted therapy swing rigs, illuminated LED bubble column, foam ball pit with slide, wall activity panels, climbing wall, balance beams, and anti-impact flooring.",
  },
  {
    name: "Indoor Soft Play Arena",
    src: play,
    note: "High-density foam play block modules, foam climbing stairs, mini play slide, and padded protective floor layouts.",
  },
  {
    name: "Ergonomic Activity Classroom",
    src: classroom,
    note: "Custom child-sized wooden activity tables, colorful student chairs, modular storage cubbies, and interactive wall board displays.",
  },
  {
    name: "Library & Storytelling Nook",
    src: library,
    note: "Child-accessible colorful bookshelf shelving units, soft seating nooks, and quiet, focused early literacy architectural space.",
  },
  {
    name: "Safe Outdoor Playground Turf",
    src: outdoor,
    note: "High-impact rubberized safety floor tiles, outdoor slide modules, safe climbing nets, and shade canopy structures.",
  },
];

function Journey() {
  return (
    <section id="journey" className="relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">
          Walk-through · 002
        </p>
        <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight md:text-[7vw]">
          Ahead of this <br />
          <span className="italic">complete learning environment</span>.
        </h2>
      </div>
      <div className="mt-20 space-y-36 md:space-y-48">
        {journey.map((room, i) => (
          <JourneyRoom key={room.name} room={room} index={i} />
        ))}
      </div>
    </section>
  );
}

function JourneyRoom({ room, index }: { room: (typeof journey)[number]; index: number }) {
  const flip = index % 2 === 0;

  return (
    <div className="relative">
      <div
        className={`mx-auto grid max-w-[1600px] items-center gap-8 px-6 md:grid-cols-12 md:px-10 ${flip ? "" : "md:[direction:rtl]"}`}
      >
        <div
          className="relative overflow-hidden md:col-span-8 md:[direction:ltr]"
          data-cursor="view"
          data-cursor-label={`0${index + 1} / 06`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <img
              src={room.src}
              alt={room.name}
              loading="lazy"
              decoding="async"
              width={1200}
              height={750}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="godrays absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/40 via-transparent" />
            <div className="absolute bottom-6 left-6 flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--cream)]/80">
                Space 0{index + 1}
              </span>
              <span className="h-px w-16 bg-[color:var(--cream)]/60" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4 md:[direction:ltr]">
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl leading-[0.9] tracking-tight md:text-6xl"
          >
            <span className="italic">{room.name}</span>
          </motion.h3>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[color:var(--foreground)]/80">
            {room.note}
          </p>
          <div className="mt-8 h-px w-24 bg-[color:var(--ink)]/40" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">
            Guild Services · Turnkey Execution
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function BigStatement() {
  return (
    <section
      id="promise"
      className="relative py-36 bg-blue-50/80 my-24 border-y border-blue-100"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10 text-center space-y-8">
        <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 border border-blue-200 shadow-md mx-auto">
          <img src={logo} alt="Guild Logo" className="h-6 w-6 object-contain rounded-full" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-red-600 font-bold">
            Our Simple Promise
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight text-blue-950">
          "You just show us the location.
          <br />
          <span className="italic text-red-600">
            We will hand over the keys to a fully finished, branded, and operational center."
          </span>
        </h2>

        <p className="text-base sm:text-lg text-blue-900/80 max-w-3xl mx-auto leading-relaxed font-medium">
          Starting a child development center or school is an incredible milestone, but managing vendors, contractors, carpenters, and designers can quickly become overwhelming. That is where Guild Services steps in. We act as your single point of contact for the entire setup.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    n: "01",
    title: "🧱 Civil & Structural Works",
    body: "Complete layout planning, remodeling, and structural modifications tailored for child safety and accessibility.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "02",
    title: "🎨 Vibrant Interiors",
    body: "Child-friendly, ergonomic, and highly engaging interior designing that inspires learning and creativity.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "03",
    title: "🧩 Sensory & OT Room Setup",
    body: "Pediatric OT sensory swing rigs, LED bubble columns, tactile activity boards, ball pits, climbing walls, and safety flooring.",
    img: sensory,
  },
  {
    n: "04",
    title: "🪑 Specialized Furniture",
    body: "Safe, durable, and age-appropriate furniture for classrooms, therapy rooms, and play areas.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "05",
    title: "💻 Smart Electronics & IT",
    body: "Smartboards, sound systems, security/CCTV setups, and essential appliances completely installed.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "06",
    title: "🏷️ End-to-End Branding",
    body: "Logos, signage, wall graphics, and marketing collaterals to give your institution a powerful premium identity.",
    img: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
  },
];

function ServicesFilm() {
  return (
    <section
      id="services"
      className="relative bg-blue-950 py-32 text-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-400 font-bold">
              🛠️ Specialized Capabilities · 004
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl font-bold">
              Six <span className="italic text-blue-300">core solutions</span>.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-blue-200/80 md:block font-medium">
            We handle everything from initial raw space to fully equipped school, play school, and OT clinic handover.
          </p>
        </div>
        <div className="mt-20 divide-y divide-blue-800/60">
          {services.map((s) => (
            <ServiceRow key={s.n} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ s }: { s: (typeof services)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="view"
      data-cursor-label="view"
      className="group relative grid cursor-pointer grid-cols-12 items-center gap-6 py-10"
    >
      <span className="col-span-2 font-mono text-xs tracking-[0.3em] text-blue-300/60 md:col-span-1 font-bold">
        {s.n}
      </span>
      <h3 className="col-span-10 font-display text-3xl md:col-span-7 md:text-4xl font-bold">
        <span
          className={`inline-block transition-transform duration-500 ${hover ? "translate-x-6 italic text-red-400" : "text-white"}`}
        >
          {s.title}
        </span>
      </h3>
      <p className="col-span-12 text-sm text-blue-100/80 md:col-span-4 leading-relaxed">{s.body}</p>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute right-6 top-1/2 hidden aspect-[4/5] w-56 -translate-y-1/2 overflow-hidden md:block rounded-xl border border-blue-400/40 shadow-2xl z-20"
          >
            <img
              src={s.img}
              alt={s.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Gallery() {
  const items = [
    { src: sensory, title: "Sensory OT Therapy Room" },
    { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80", title: "Montessori Activity Zone" },
    { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80", title: "Early Learning Reading Nook" },
    { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80", title: "Smart Interactive Classroom" },
    { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", title: "Creative Art & Craft Studio" },
    { src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80", title: "Pediatric Motor Skill Room" },
    { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80", title: "Indoor Sports & Rubber Turf" },
    { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80", title: "Institutional Campus Assembly" },
  ];
  return (
    <section id="gallery" className="relative py-32 bg-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-600 font-bold">
              Showcase · 005
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl font-extrabold text-blue-950">
              Completed <span className="italic text-blue-600">projects</span>.
            </h2>
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-blue-900/50 md:block font-bold">
            Scroll horizontal →
          </p>
        </div>
      </div>
      <div
        data-cursor="drag"
        data-cursor-label="drag"
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-8 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <figure
            key={i}
            className="relative shrink-0 snap-start"
            style={{ width: "clamp(280px, 42vw, 620px)" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-blue-100 shadow-xl">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="godrays absolute inset-0 opacity-30" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              <span className="text-blue-900">{item.title}</span>
              <span className="text-red-600">Guild Services ✦ MMXXVI</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-12 shrink-0" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function WhyUsPitch() {
  const reasons = [
    {
      title: "Zero Vendor Hassle",
      desc: "No need to chase separate people for interiors, civil work, or electronics.",
      n: "01",
    },
    {
      title: "Built for Safety",
      desc: "We specialize in setups that require strict safety compliance for children.",
      n: "02",
    },
    {
      title: "On-Time Delivery",
      desc: "We respect your launch timelines so you can open your doors right on schedule.",
      n: "03",
    },
  ];

  return (
    <section id="partner" className="relative bg-blue-50/70 py-36 border-y border-blue-100 scroll-mt-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-600 font-bold">
              Why Partner With Us · 006
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl font-extrabold text-blue-950">
              Why institution
              <br />
              <span className="italic text-red-600">founders</span> choose
              <br />
              Guild Services.
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              {reasons.map((r) => (
                <div
                  key={r.n}
                  className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="font-mono text-xs text-red-600 font-bold">
                    {r.n}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-blue-950 leading-snug">{r.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-blue-900/70 font-medium">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement)?.value || "";

    sendToWhatsApp({ name, phone, email, details });
    setSubmitted(true);
  };

  return (
    <section id="get-started" className="relative overflow-hidden py-36 scroll-mt-24">
      <div id="contact" className="absolute -top-24" />
      <img
        src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
        alt="School Campus Architecture"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[color:var(--background)]/85 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-600 font-bold">
          Get Started · 007
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl font-extrabold text-blue-950">
          Dreaming of starting your own <br />
          <span className="italic text-red-600">Play School</span> or <span className="italic text-blue-600">Child Center</span>?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-blue-900/80 max-w-2xl leading-relaxed font-medium">
          Don't get bogged down by the headache of construction, sourcing furniture, or finding decorators. With <strong>Guild Services</strong>, your setup journey is entirely stress-free.
        </p>
        <div className="mt-4 flex flex-wrap gap-6 font-mono text-xs font-bold text-blue-950">
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-blue-200 shadow-sm">👉 Step 1: You show us the space.</span>
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-blue-200 shadow-sm">🔑 Step 2: We do the rest and hand over the keys.</span>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          {/* Details */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4 font-mono text-[12px] uppercase tracking-[0.25em]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[color:var(--copper)]" />
                <div className="flex flex-col gap-1">
                  <a
                    href="https://wa.me/918008227539"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors font-bold"
                  >
                    +91 8008227539 (WhatsApp)
                  </a>
                  <a
                    href="https://wa.me/919652075387"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors font-bold"
                  >
                    +91 9652075387 (WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[color:var(--ink)]/15 pt-4">
                <Mail className="w-4 h-4 text-[color:var(--copper)]" />
                <a
                  href="mailto:guildclub1013@gmail.com"
                  className="hover:text-[color:var(--copper)] transition-colors font-bold lowercase"
                >
                  guildclub1013@gmail.com
                </a>
              </div>

              <div className="space-y-3 border-t border-[color:var(--ink)]/15 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[color:var(--copper)] shrink-0 mt-1" />
                  <div>
                    <span className="text-[color:var(--copper)] font-bold">Address 1:</span>
                    <p className="normal-case text-sm tracking-normal font-sans text-[color:var(--ink)]/80 mt-0.5">
                      1-3-77/29/ A Venkateshwara colony medak 502110
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[color:var(--copper)] shrink-0 mt-1" />
                  <div>
                    <span className="text-[color:var(--copper)] font-bold">Address 2:</span>
                    <p className="normal-case text-sm tracking-normal font-sans text-[color:var(--ink)]/80 mt-0.5">
                      flat no 410 Essen marvella apartments suchitra road
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="bg-white/80 p-10 rounded-2xl border border-emerald-300 text-center space-y-4 shadow-xl">
                <h3 className="font-display text-3xl font-bold text-emerald-800">
                  Redirected to WhatsApp!
                </h3>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  Your inquiry message has been formatted and opened in WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono uppercase tracking-wider text-emerald-700 underline pt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="space-y-6 bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-[color:var(--ink)]/20 shadow-xl"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-display text-xl outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                  />
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Phone number (WhatsApp)"
                    className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-display text-xl outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-display text-xl outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <textarea
                  name="details"
                  placeholder="Tell us about your institution / location requirements..."
                  rows={3}
                  className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-display text-xl outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]"
                />
                <button
                  type="submit"
                  data-cursor="link"
                  data-cursor-label="send"
                  className="group relative mt-4 inline-flex items-center gap-4 overflow-hidden border border-emerald-600 bg-emerald-600 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white hover:bg-emerald-700 transition-colors rounded-lg font-bold shadow-lg"
                >
                  <span className="relative z-10">Send via WhatsApp →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Foot() {
  return (
    <footer className="border-t border-[color:var(--ink)]/15 bg-[color:var(--bone)] py-12">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.3em] md:px-10">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Guild Club Logo"
            className="h-7 w-7 object-contain rounded-full bg-white p-0.5 border border-[color:var(--copper)]/40"
          />
          <span className="font-bold text-[color:var(--copper)]">
            © MMXXVI Guild Services · Guild Club
          </span>
        </div>
        <span className="italic font-display text-lg not-italic text-[color:var(--ink)]/80">
          You Show Us the Space. We Build the Vision.
        </span>
        <div className="flex items-center gap-4">
          <a
            href="tel:8008227539"
            className="hover:text-[color:var(--copper)] transition-colors font-bold"
          >
            8008227539
          </a>
          <span>·</span>
          <a
            href="tel:9652075387"
            className="hover:text-[color:var(--copper)] transition-colors font-bold"
          >
            9652075387
          </a>
        </div>
      </div>
    </footer>
  );
}
