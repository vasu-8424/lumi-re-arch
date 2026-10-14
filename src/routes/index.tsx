import { createFileRoute, Link } from "@tanstack/react-router";
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
import { Phone, Mail, MapPin, Accessibility, Activity, CheckCircle2, ShieldCheck, Zap, User, Building2, X, Send } from "lucide-react";

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
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--ink)]">
      <SmoothScroll />
      <Nav onOpenCommission={() => setIsCommissionOpen(true)} />
      <Hero onOpenCommission={() => setIsCommissionOpen(true)} />
      <Marquee />
      <WhyUsPitch />
      <Journey />
      <BigStatement />
      <ServicesFilm />
      <PhysicalRehabSection />
      <Gallery />
      <Contact />
      <Foot />
      <CommissionModal open={isCommissionOpen} onClose={() => setIsCommissionOpen(false)} />
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

interface CommissionModalProps {
  open: boolean;
  onClose: () => void;
}

function CommissionModal({ open, onClose }: CommissionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    service: "Turnkey Play School / Preschool Setup",
    phone: "",
    email: "",
    details: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToWhatsApp({
      name: formData.name,
      org: formData.org,
      phone: formData.phone,
      email: formData.email,
      details: `[${formData.service}] ${formData.details}`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-red-500 bg-white p-0.5 shadow-md shrink-0">
              <img
                src={logo}
                alt="Guild Services Logo"
                className="h-full w-full object-cover scale-110 rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                  Commission
                </span>
                <span className="font-mono text-[10px] text-blue-200 tracking-wider uppercase font-semibold">
                  Guild Services
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                Begin Your Project.
              </h3>
            </div>
          </div>
          <p className="mt-2.5 text-xs text-blue-100/90 leading-relaxed font-sans">
            Complete turnkey setup for Child Development Centers, Play Schools, and Sensory Clinics. Submitting connects directly with our design engineers on WhatsApp.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs font-sans max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-700" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Rajesh Kumar or Principal Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Institution / Organization *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Little Stars Academy or Care Child Development Center"
              value={formData.org}
              onChange={(e) => setFormData({ ...formData, org: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Project Type / Requirement
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-sm transition-all"
            >
              <option value="Turnkey Play School / Preschool Setup">Turnkey Play School / Preschool Setup</option>
              <option value="Child Development Center (CDC) Sensory Setup">Child Development Center (CDC) Sensory Setup</option>
              <option value="Occupational Therapy & Sensory Gym Equipment">Occupational Therapy & Sensory Gym Equipment</option>
              <option value="Physical Rehabilitation & Gait Mobility Wing">Physical Rehabilitation & Gait Mobility Wing</option>
              <option value="Custom Interior, Civil & Academic Space">Custom Interior, Civil & Academic Space</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Phone *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98000 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 outline-hidden font-medium text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                placeholder="contact@institution.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Space Area / Specific Requirements
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 1,500 sq ft hall in Hyderabad, need sensory swings, soft play foam, and reception branding..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden font-medium text-xs transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-mono text-xs uppercase tracking-[0.2em] font-extrabold shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>Send Inquiry via WhatsApp →</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
              Direct connection with Guild Services turnkey engineers • Instant response
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Nav({ onOpenCommission }: { onOpenCommission: () => void }) {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-md transition-all duration-300 ${scrolled ? "py-1" : "py-1.5 md:py-2"}`}
    >
      {/* Top Banner Strip */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-[10px] sm:text-[11px] font-mono tracking-wider py-1 px-4 border-b border-blue-800/50 mb-1">
        <div className="mx-auto flex items-center justify-between max-w-[1600px]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-blue-200 font-medium">Turnkey Play School, Child Center & Sensory Gym Setup</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-300 text-[10px]">
            <span>• PAN-INDIA DELIVERY</span>
            <span>• GST INVOICE</span>
            <span>• SAME-DAY CONSULTATION</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 max-w-[1600px] transition-all duration-300">
        <a
          href="#top"
          data-cursor="link"
          data-cursor-label="home"
          className="flex items-center gap-2.5 sm:gap-3 group"
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

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {["Journey", "Services", "Rehab", "Gallery", "Promise"].map((n) => (
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
        </nav>

        {/* Single Primary Commission Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommission}
            data-cursor="link"
            data-cursor-label="commission"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-5 sm:px-6 py-2 sm:py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-white font-extrabold shadow-md hover:from-red-700 hover:to-rose-700 transition-all hover:scale-105"
          >
            <span>Commission</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Hero({ onOpenCommission }: { onOpenCommission: () => void }) {
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

          {/* Single Action Button */}
          <div className="mt-8 flex items-center">
            <button
              onClick={onOpenCommission}
              data-cursor="link"
              data-cursor-label="commission"
              className="group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-8 py-4 font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-white font-black shadow-2xl shadow-red-600/40 hover:from-red-700 hover:to-rose-700 transition-all hover:scale-105"
            >
              <span>Commission a Space</span>
              <span className="text-base group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
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
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=70",
  },
  {
    n: "02",
    title: "🎨 Vibrant Interiors",
    body: "Child-friendly, ergonomic, and highly engaging interior designing that inspires learning and creativity.",
    img: "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=600&q=70",
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
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=70",
  },
  {
    n: "05",
    title: "💻 Smart Electronics & IT",
    body: "Smartboards, sound systems, security/CCTV setups, and essential appliances completely installed.",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=70",
  },
  {
    n: "06",
    title: "🏷️ End-to-End Branding",
    body: "Logos, signage, wall graphics, and marketing collaterals to give your institution a powerful premium identity.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=70",
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
// PHYSICAL REHABILITATION & CLINICAL CONSULTATION SECTION
// ─────────────────────────────────────────────────────────────────────────────

function PhysicalRehabSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Neuro-Physical Rehabilitation & Gait Training",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "918008227539";
    const msg = `*Physical Rehabilitation & Clinical Inquiry - Guild Services*\n\n` +
      `👤 *Patient / Contact:* ${formData.name}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `🩺 *Service Requested:* ${formData.service}\n` +
      `📝 *Clinical Details:* ${formData.notes || "Initial consultation request"}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="rehab" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clinical Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold tracking-widest uppercase">
              <Accessibility className="w-4 h-4 text-sky-400" />
              <span>Physical Rehabilitation & Mobility Care</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Advanced Neuro-Physiotherapy, Gait Restoration & Mobility Systems.
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
              From turnkey pediatric sensory-motor gyms to clinical adult neuro-rehabilitation setups, we empower recovery with evidence-based physical therapy, gait retraining harnesses, and neuromuscular stimulation.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Neuro-Gait Training</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Post-stroke hemiparetic cadence restoration, body-weight support harness treadmill walking, and foot-drop rehabilitation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                    <Accessibility className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Pediatric Motor Gym</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Core stability, balance stepping stones, sensory swings, and developmental coordination delay therapy for kids.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">VitalStim® Electrotherapy</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Targeted neuromuscular electrical stimulation (NMES) for pharyngeal swallowing and facial motor recruitment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Turnkey Clinic Setup</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  End-to-end medical civil works, ergonomic parallel bars, rubber flooring, and complete rehabilitation equipment setup.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Physical Rehab Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-1">
                  Direct Clinical Appointment & Setup
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Schedule Rehabilitation Consultation
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect with our rehabilitation specialists and turnkey setup engineers.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-600/60 text-center space-y-3 animate-in fade-in">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-emerald-200">Consultation Dispatched!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your physical rehabilitation inquiry has been opened on WhatsApp. Our medical team will review your requirements immediately.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-emerald-400 font-semibold underline hover:text-emerald-300 cursor-pointer"
                  >
                    Submit another consultation request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh or Patient Guardian"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Service Required *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="Neuro-Physical Rehabilitation & Gait Training">
                        Neuro-Physical Rehabilitation & Gait Training
                      </option>
                      <option value="Pediatric Physiotherapy & Motor Gym Setup">
                        Pediatric Physiotherapy & Motor Gym Setup
                      </option>
                      <option value="VitalStim® NMES & Dysphagia Therapy">
                        VitalStim® NMES & Dysphagia Therapy
                      </option>
                      <option value="Complete Turnkey Rehabilitation Center Setup">
                        Complete Turnkey Rehabilitation Center Setup
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Brief Clinical Need / Space Details</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Post-stroke recovery for elderly parent, or 1200 sq ft sensory clinic setup..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <span>Request Rehabilitation Consultation</span>
                    <span>→</span>
                  </button>

                  <p className="text-[10px] text-slate-500 text-center">
                    Instant WhatsApp connection • Direct response within 30 minutes
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Gallery() {
  const items = [
    { src: sensory, title: "Sensory OT Therapy Room" },
    { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=70", title: "Montessori Activity Zone" },
    { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=70", title: "Early Learning Reading Nook" },
    { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=70", title: "Smart Interactive Classroom" },
    { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=70", title: "Creative Art & Craft Studio" },
    { src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=70", title: "Pediatric Motor Skill Room" },
    { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=70", title: "Indoor Sports & Rubber Turf" },
    { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=70", title: "Institutional Campus Assembly" },
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
