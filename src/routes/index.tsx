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
      { title: "Guild Services — You Show Us the Space. We Build the Vision." },
      {
        name: "description",
        content:
          "The absolute one-stop solution for setting up Child Development Centers, Play Schools, and Educational Institutions. Civil works, interiors, furniture, electronics & branding.",
      },
      {
        property: "og:title",
        content: "Guild Services — You Show Us the Space. We Build the Vision.",
      },
      {
        property: "og:description",
        content:
          "Turnkey setups for Child Development Centers, Play Schools, and Educational Institutions.",
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
      <Journey />
      <BigStatement />
      <ServicesFilm />
      <Gallery />
      <WhyUsPitch />
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
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
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
      className={`fixed inset-x-0 top-0 z-50 bg-white/50 backdrop-blur-xl border-b border-white/60 shadow-sm transition-all duration-300 ${scrolled ? "py-1.5 shadow-md bg-white/80" : "py-3 md:py-4"}`}
    >
      <div className="mx-auto flex items-center justify-between px-6 md:px-10 max-w-[1600px] transition-all duration-300">
        <a
          href="#top"
          data-cursor="link"
          data-cursor-label="home"
          className="flex items-center gap-3 md:gap-4 group"
        >
          <div
            className={`relative shrink-0 overflow-hidden rounded-full border-2 border-[color:var(--copper)] bg-white p-0.5 shadow-md group-hover:scale-105 transition-all duration-300 ${scrolled ? "h-11 w-11" : "h-20 w-20"}`}
          >
            <img
              src={logo}
              alt="Guild Club Logo"
              className="h-full w-full object-cover scale-110 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-display tracking-tight leading-none font-bold text-[color:var(--ink)] transition-all duration-300 ${scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}
            >
              <span className="italic">Guild</span> Services
              <span className="text-[color:var(--copper)]">.</span>
            </span>
            <span
              className={`font-mono uppercase tracking-[0.28em] text-[color:var(--copper)] font-bold transition-all duration-300 ${scrolled ? "text-[9px] mt-0.5" : "text-[11px] mt-1"}`}
            >
              Guild Club
            </span>
          </div>
        </a>

        <nav className="hidden gap-10 md:flex items-center">
          {["Journey", "Services", "Gallery", "Promise", "Contact"].map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              data-cursor="link"
              data-cursor-label="→"
              className="group relative font-mono text-[11px] uppercase tracking-[0.28em]"
            >
              <span className="relative">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
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
            className="group relative overflow-hidden rounded-full border border-[color:var(--ink)]/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] backdrop-blur"
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[125vh]">
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <img src={hero} alt="Preschool foyer" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/40 via-transparent to-[color:var(--background)]" />
        <div className="godrays absolute inset-0" />
        <div className="fog absolute inset-0" />
        <div className="grain" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 sticky top-0 flex h-screen items-end pb-20"
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-4 rounded-full bg-white/95 backdrop-blur-xl px-5 py-2.5 border-2 border-[color:var(--copper)]/40 shadow-2xl">
            <div className="h-14 w-14 overflow-hidden rounded-full border border-[color:var(--copper)]/30 bg-white p-0.5">
              <img
                src={logo}
                alt="Guild Club Logo"
                className="h-full w-full object-cover scale-110 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[12px] uppercase tracking-[0.25em] font-bold text-[color:var(--ink)]">
                GUILD CLUB
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-[color:var(--copper)]">
                YOU NAME IT, WE DO IT
              </span>
            </div>
          </div>

          <h1 className="font-display text-[10vw] leading-[0.88] tracking-[-0.03em] md:text-[7.5vw] text-white">
            <RevealLine>You Show Us the Space.</RevealLine>
            <RevealLine delay={0.15}>
              <span className="text-white">We Build the </span>
              <span className="italic text-[color:var(--ink)] drop-shadow-sm">Vision</span>.
            </RevealLine>
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-display text-xl sm:text-2xl text-[color:var(--ink)] font-semibold leading-snug">
                The Absolute One-Stop Solution for Setting Up Child Development Centers, Play
                Schools, and Educational Institutions.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--foreground)]/85 max-w-xl">
                Are you planning to launch a child development center, a vibrant play school, or a
                full-scale educational campus? The vision is yours, but the execution doesn't have
                to be your stress.
                <br />
                At <strong>Guild Services</strong>, we turn empty spaces into thriving, functional,
                and beautiful learning environments. From the first brick to the final brand design,
                we take care of absolutely everything.
              </p>
            </div>

            <div className="md:col-span-5 md:flex md:flex-col md:items-end">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)]/60 text-right">
                <div>Turnkey Project Lifecycle</div>
                <div className="mt-2 h-14 w-px animate-pulse bg-[color:var(--ink)]/40 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Geometric Accents — Pushed behind text (z-0), hidden on mobile/tablet to prevent any overlap */}
      <FloatingObject
        className="hidden lg:block left-[2%] top-[12%] z-0 opacity-30 float-y"
        size={48}
        shape="paper"
      />
      <FloatingObject
        className="hidden xl:block right-[3%] top-[15%] z-0 opacity-30 float-y-slow"
        size={56}
        shape="cube"
      />
      <FloatingObject
        className="hidden lg:block left-[2%] bottom-[15%] z-0 opacity-25 float-y-slow"
        size={40}
        shape="sphere"
      />
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
    "Civil & Structural Works",
    "✦",
    "Vibrant Interiors",
    "✦",
    "Specialized Furniture",
    "✦",
    "Smart Electronics & IT",
    "✦",
    "End-to-End Branding",
    "✦",
    "Zero Vendor Hassle",
    "✦",
  ];
  return (
    <section className="relative border-y border-[color:var(--ink)]/15 bg-[color:var(--bone)] py-8">
      <div className="marquee-track flex whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-14 pr-14">
            {words.map((w, i) => (
              <span
                key={i}
                className={`font-display text-4xl md:text-5xl ${w === "✦" ? "text-[color:var(--copper)]" : ""}`}
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
    name: "Reception",
    src: reception,
    note: "First impression in oak & light. Complete check-in security & brand wall.",
  },
  {
    name: "Library Nook",
    src: library,
    note: "A room designed to hush. Custom child-accessible shelving & soft seating.",
  },
  {
    name: "Play Arena",
    src: play,
    note: "Movement as material. Safe, rounded, durable play modules.",
  },
  {
    name: "Sensory Room",
    src: sensory,
    note: "Warm copper glow, tactile walls, quiet ambient lighting for therapy.",
  },
  {
    name: "Smart Classroom",
    src: classroom,
    note: "Interactive smartboards, ergonomic furniture, and high-def CCTV setups.",
  },
  {
    name: "Outdoor Zone",
    src: outdoor,
    note: "Safe playground fencing, accessibility ramps, and play grass turf.",
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
          Completed <br />
          <span className="italic">learning environments</span>.
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const flip = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      <div
        className={`mx-auto grid max-w-[1600px] items-center gap-8 px-6 md:grid-cols-12 md:px-10 ${flip ? "" : "md:[direction:rtl]"}`}
      >
        <div
          className="relative overflow-hidden md:col-span-8 md:[direction:ltr]"
          data-cursor="view"
          data-cursor-label={`0${index + 1} / 06`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <motion.img
              src={room.src}
              alt={room.name}
              loading="lazy"
              width={1920}
              height={1200}
              style={{ y }}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
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
            transition={{ duration: 0.8 }}
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
      className="relative py-40 bg-[color:var(--bone)] my-24 border-y border-[color:var(--ink)]/15"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10 text-center space-y-8">
        <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 border border-[color:var(--ink)]/20 shadow-md mx-auto">
          <img src={logo} alt="Guild Logo" className="h-6 w-6 object-contain rounded-full" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--copper)] font-semibold">
            Our Key Handover Promise
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-[color:var(--ink)]">
          "You just show us the location.
          <br />
          <span className="italic text-[color:var(--copper)]">
            We will hand over the keys to a fully finished, branded, and operational center."
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          Launching a school or child center? Don't get bogged down by managing separate contractors
          for civil work, interiors, electronics, and branding. We act as your single point of
          contact for the entire setup.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    n: "01",
    title: "Civil & Structural Works",
    body: "Complete layout planning, remodeling, and structural modifications tailored for child safety, accessibility, and optimal space utility.",
    img: outdoor,
  },
  {
    n: "02",
    title: "Vibrant Interiors",
    body: "Child-friendly, ergonomic, and highly engaging interior designing that inspires learning, playfulness, and creativity.",
    img: reception,
  },
  {
    n: "03",
    title: "Specialized Furniture",
    body: "Safe, durable, rounded-edge and age-appropriate furniture custom-made for classrooms, therapy rooms, and play areas.",
    img: play,
  },
  {
    n: "04",
    title: "Smart Electronics & IT",
    body: "Smartboards, sound systems, security/CCTV setups, and essential appliances completely installed and configured.",
    img: classroom,
  },
  {
    n: "05",
    title: "End-to-End Branding",
    body: "Logos, signage, wall graphics, uniforms, and marketing collaterals to give your institution a powerful premium identity.",
    img: library,
  },
];

function ServicesFilm() {
  return (
    <section
      id="services"
      className="relative bg-[color:var(--charcoal)] py-32 text-[color:var(--cream)]"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">
              🛠️ What We Do · 004
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl">
              Five <span className="italic">core offerings</span>.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-[color:var(--cream)]/70 md:block">
            We manage your entire project lifecycle so you can focus on education and care.
          </p>
        </div>
        <div className="mt-20 divide-y divide-white/10">
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
      <span className="col-span-2 font-mono text-xs tracking-[0.3em] text-[color:var(--cream)]/50 md:col-span-1">
        {s.n}
      </span>
      <h3 className="col-span-10 font-display text-3xl md:col-span-7 md:text-6xl">
        <span
          className={`inline-block transition-transform duration-500 ${hover ? "translate-x-6 italic text-[color:var(--copper)]" : ""}`}
        >
          {s.title}
        </span>
      </h3>
      <p className="col-span-12 text-sm text-[color:var(--cream)]/70 md:col-span-4">{s.body}</p>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute right-6 top-1/2 hidden aspect-[4/5] w-52 -translate-y-1/2 overflow-hidden md:block rounded-xl border border-white/20 shadow-2xl z-20"
          >
            <img src={s.img} alt="" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Gallery() {
  const items = [reception, library, play, sensory, classroom, outdoor, hero];
  return (
    <section id="gallery" className="relative py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">
              Archive · 005
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl">
              Selected <span className="italic">projects</span>.
            </h2>
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink)]/50 md:block">
            Scroll horizontal →
          </p>
        </div>
      </div>
      <div
        data-cursor="drag"
        data-cursor-label="drag"
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-8 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((src, i) => (
          <figure
            key={i}
            className="relative shrink-0 snap-start"
            style={{ width: "clamp(280px, 42vw, 620px)" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="godrays absolute inset-0 opacity-40" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
              <span>Project Plate 0{i + 1}</span>
              <span className="text-[color:var(--copper)]">Guild Services ✦ MMXXVI</span>
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
      desc: "No need to chase separate people for interiors, civil work, furniture, or smart electronics.",
      n: "01",
    },
    {
      title: "Built for Safety",
      desc: "We specialize in setups that require strict safety compliance and child ergonomics.",
      n: "02",
    },
    {
      title: "On-Time Delivery",
      desc: "We respect your launch timelines so you can open your doors right on schedule.",
      n: "03",
    },
  ];

  return (
    <section className="relative bg-[color:var(--bone)] py-36 border-y border-[color:var(--ink)]/15">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">
              Why Partner With Us · 006
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">
              Why institution
              <br />
              <span className="italic text-[color:var(--copper)]">founders</span> choose
              <br />
              Guild Services.
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              {reasons.map((r) => (
                <div
                  key={r.n}
                  className="bg-white p-6 rounded-xl border border-[color:var(--ink)]/15 shadow-sm"
                >
                  <div className="font-mono text-xs text-[color:var(--copper)] font-semibold">
                    {r.n}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold">{r.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
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
    <section id="contact" className="relative overflow-hidden py-36">
      <img
        src={reception}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[color:var(--background)]/85 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)] font-semibold">
          Commission · 007
        </p>
        <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight md:text-[7vw]">
          <span className="italic">Begin</span> a<br />
          conversation.
        </h2>
        <p className="mt-3 text-lg font-display text-[color:var(--ink)]">
          Let’s build something amazing together. Fill in your details to start a conversation on
          WhatsApp.
        </p>

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
