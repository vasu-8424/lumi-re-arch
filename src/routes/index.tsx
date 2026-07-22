import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import hero from "@/assets/hero.jpg";
import reception from "@/assets/reception.jpg";
import library from "@/assets/library.jpg";
import play from "@/assets/play.jpg";
import sensory from "@/assets/sensory.jpg";
import classroom from "@/assets/classroom.jpg";
import outdoor from "@/assets/outdoor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guild Services — Where Learning Feels Like Architecture" },
      { name: "description", content: "Guild Services designs and builds premium preschools — civil works, luxury interiors, bespoke furniture, brand systems, and smart classrooms." },
      { property: "og:title", content: "Guild Services — Where Learning Feels Like Architecture" },
      { property: "og:description", content: "Premium preschool architecture, interiors, and brand systems." },
    ],
  }),
  component: Index,
});

function Index() {
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
      <Philosophy />
      <Testimonial />
      <Contact />
      <Foot />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-6 py-6 md:px-10">
        <a href="#top" data-cursor="link" data-cursor-label="home" className="font-display text-xl tracking-tight">
          <span className="italic">Guild</span> Services<span className="text-[color:var(--copper)]">.</span>
        </a>
        <nav className="hidden gap-10 md:flex">
          {["Journey", "Services", "Gallery", "Philosophy", "Contact"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} data-cursor="link" data-cursor-label="→"
              className="group relative font-mono text-[11px] uppercase tracking-[0.28em]">
              <span className="relative">{n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} data-cursor="link" data-cursor-label="enquire"
          className="group relative overflow-hidden rounded-full border border-[color:var(--ink)]/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] backdrop-blur">
          <span className="relative z-10 transition-colors duration-500 group-hover:text-[color:var(--cream)]">Commission</span>
          <span className="absolute inset-0 -translate-y-full bg-[color:var(--ink)] transition-transform duration-500 group-hover:translate-y-0" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-[color:var(--ink)]/80 backdrop-blur-sm">
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute left-1/2 top-1/2 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-[color:var(--cream)] p-10"
              onClick={(e) => e.stopPropagation()}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Enquire · 01</p>
              <h3 className="mt-3 font-display text-4xl">Begin a project.</h3>
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">We take on a limited number of commissions each quarter.</p>
              <form className="mt-8 space-y-4">
                {["Full name", "Institution", "Email"].map((p) => (
                  <input key={p} placeholder={p} className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--copper)]" />
                ))}
                <button type="button" className="mt-4 w-full border border-[color:var(--ink)] py-3 font-mono text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)]">Send Request</button>
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[130vh]">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={hero} alt="Preschool foyer" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/20 via-transparent to-[color:var(--background)]" />
        <div className="godrays absolute inset-0" />
        <div className="fog absolute inset-0" />
        <div className="grain" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="sticky top-0 flex h-screen items-end pb-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
            <span className="inline-block h-px w-10 bg-[color:var(--ink)]/60" /> Vol. 01 — A Guild Film
          </p>
          <h1 className="font-display text-[15vw] leading-[0.85] tracking-[-0.03em] md:text-[11vw]">
            <RevealLine>Where learning</RevealLine>
            <RevealLine delay={0.15}>feels like <span className="italic text-[color:var(--copper)]">architecture</span>.</RevealLine>
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--foreground)]/80">
              Guild Services builds the interiors, atmospheres and small rituals that turn a preschool into a place a child remembers for life.
            </p>
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)]/50">
              <div>Scroll to enter</div>
              <div className="mt-2 h-16 w-px animate-pulse bg-[color:var(--ink)]/40 md:ml-2" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* floating objects */}
      <FloatingObject className="left-[8%] top-[22%] float-y" size={64} shape="paper" />
      <FloatingObject className="right-[10%] top-[30%] float-y-slow" size={80} shape="cube" />
      <FloatingObject className="left-[18%] bottom-[38%] float-y-slow" size={56} shape="sphere" />
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} className="block">
        {children}
      </motion.span>
    </span>
  );
}

function FloatingObject({ className = "", size = 60, shape }: { className?: string; size?: number; shape: "cube" | "sphere" | "paper" }) {
  const style: React.CSSProperties = { width: size, height: size };
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style} aria-hidden>
      {shape === "cube" && (
        <div className="h-full w-full rotate-12" style={{ background: "linear-gradient(135deg, var(--oak) 0%, var(--oak-deep) 60%, var(--charcoal) 100%)", boxShadow: "0 30px 60px -20px rgba(60,30,10,0.35), inset 0 -6px 12px rgba(0,0,0,0.25), inset 0 6px 12px rgba(255,220,180,0.35)", borderRadius: 4 }} />
      )}
      {shape === "sphere" && (
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle at 30% 25%, #fff, var(--brass) 55%, var(--copper) 100%)", boxShadow: "0 30px 60px -20px rgba(80,40,10,0.5)" }} />
      )}
      {shape === "paper" && (
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]">
          <polygon points="10,50 90,10 50,50 90,90" fill="var(--cream)" stroke="var(--ink)" strokeWidth="0.6" />
          <polygon points="10,50 50,50 90,90" fill="var(--bone)" opacity="0.9" />
        </svg>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Marquee() {
  const words = ["Civil Works", "★", "Interior Design", "★", "Furniture", "★", "Branding", "★", "Smart Classrooms", "★"];
  return (
    <section className="relative border-y border-[color:var(--ink)]/15 bg-[color:var(--bone)] py-8">
      <div className="marquee-track flex whitespace-nowrap">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-14 pr-14">
            {words.map((w, i) => (
              <span key={i} className={`font-display text-4xl md:text-6xl ${w === "★" ? "text-[color:var(--copper)]" : ""}`}>
                {w === "★" ? "✦" : <span className="italic">{w}</span>}
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
  { name: "Reception", src: reception, note: "First impression, in oak & light." },
  { name: "Library", src: library, note: "A room designed to hush." },
  { name: "Play", src: play, note: "Movement as material." },
  { name: "Sensory", src: sensory, note: "Copper glow, deep quiet." },
  { name: "Classroom", src: classroom, note: "Northern light, southern warmth." },
  { name: "Outdoors", src: outdoor, note: "The last chapter is the sky." },
];

function Journey() {
  return (
    <section id="journey" className="relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Walk-through · 002</p>
        <h2 className="mt-4 font-display text-6xl leading-[0.9] tracking-tight md:text-[9vw]">
          A slow<br /><span className="italic">walk-through</span>.
        </h2>
      </div>
      <div className="mt-24 space-y-40 md:space-y-64">
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
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);
  const flip = index % 2 === 0;
  return (
    <div ref={ref} className="relative">
      <div className={`mx-auto grid max-w-[1600px] items-center gap-8 px-6 md:grid-cols-12 md:px-10 ${flip ? "" : "md:[direction:rtl]"}`}>
        <div className="relative overflow-hidden md:col-span-8 md:[direction:ltr]" data-cursor="view" data-cursor-label={`0${index + 1} / 06`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img src={room.src} alt={room.name} loading="lazy" width={1920} height={1200}
              style={{ y, scale }} className="absolute inset-0 h-full w-full object-cover will-change-transform" />
            <div className="godrays absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/40 via-transparent" />
            <div className="absolute bottom-6 left-6 flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--cream)]/80">Room 0{index + 1}</span>
              <span className="h-px w-16 bg-[color:var(--cream)]/60" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4 md:[direction:ltr]">
          <motion.h3 initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl leading-[0.9] tracking-tight md:text-7xl">
            <span className="italic">{room.name}</span>
          </motion.h3>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-[color:var(--foreground)]/75">{room.note}</p>
          <div className="mt-8 h-px w-24 bg-[color:var(--ink)]/40" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">Oak · Marble · Linen · Copper</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function BigStatement() {
  const words = "We design preschools the way jewellers design watches — every joint, every shadow, every square metre."
    .split(" ");
  return (
    <section className="relative py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Manifesto · 003</p>
        <h2 className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {words.map((w, i) => (
            <motion.span key={i}
              initial={{ opacity: 0.15, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
              className="inline-block pr-3">
              {w === "watches" || w === "jewellers" ? <span className="italic text-[color:var(--copper)]">{w}</span> : w}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const services = [
  { n: "01", title: "Civil Works", body: "From the first excavation to the final skirting. Structural rigour, silent detailing.", img: outdoor },
  { n: "02", title: "Interior Design", body: "Rooms tuned like instruments — light, texture, acoustic, temperature.", img: reception },
  { n: "03", title: "Furniture", body: "Solid oak, sanded until it feels like skin. Made to be climbed on for twenty years.", img: play },
  { n: "04", title: "Branding", body: "Marks, wayfinding, uniforms, print — a language your school can grow into.", img: library },
  { n: "05", title: "Smart Classrooms", body: "Boards, lights, air. Invisible technology in the service of attention.", img: classroom },
];

function ServicesFilm() {
  return (
    <section id="services" className="relative bg-[color:var(--charcoal)] py-32 text-[color:var(--cream)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Services · 004</p>
            <h2 className="mt-4 font-display text-6xl leading-[0.9] md:text-8xl">Five <span className="italic">crafts</span>.</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-[color:var(--cream)]/60 md:block">
            One studio, five disciplines. Assembled per project into a single, considered whole.
          </p>
        </div>
        <div className="mt-24 divide-y divide-white/10">
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
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      data-cursor="view" data-cursor-label="view"
      className="group relative grid cursor-none grid-cols-12 items-center gap-6 py-10">
      <span className="col-span-2 font-mono text-xs tracking-[0.3em] text-[color:var(--cream)]/50 md:col-span-1">{s.n}</span>
      <h3 className="col-span-8 font-display text-4xl md:col-span-7 md:text-7xl">
        <span className={`inline-block transition-transform duration-500 ${hover ? "translate-x-6 italic text-[color:var(--copper)]" : ""}`}>
          {s.title}
        </span>
      </h3>
      <p className="col-span-12 text-sm text-[color:var(--cream)]/60 md:col-span-4">{s.body}</p>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-6 top-1/2 hidden aspect-[4/5] w-52 -translate-y-1/2 overflow-hidden md:block">
            <img src={s.img} alt="" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Gallery() {
  const scroller = useRef<HTMLDivElement>(null);
  const items = [reception, library, play, sensory, classroom, outdoor, hero];
  return (
    <section id="gallery" className="relative py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Archive · 005</p>
            <h2 className="mt-4 font-display text-6xl leading-[0.9] md:text-8xl">
              Selected <span className="italic">work</span>.
            </h2>
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink)]/50 md:block">Drag ↔ or scroll</p>
        </div>
      </div>
      <div ref={scroller} data-cursor="drag" data-cursor-label="drag"
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-8 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((src, i) => (
          <figure key={i} className="relative shrink-0 snap-start" style={{ width: "clamp(280px, 42vw, 620px)" }}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
              <div className="godrays absolute inset-0 opacity-40" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
              <span>Plate 0{i + 1}</span>
              <span className="text-[color:var(--copper)]">Guild ✦ MMXXVI</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-12 shrink-0" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Philosophy() {
  const stats = [
    { n: "142", l: "Rooms delivered" },
    { n: "18", l: "Schools shaped" },
    { n: "11", l: "Years of practice" },
    { n: "1", l: "Guiding obsession" },
  ];
  return (
    <section id="philosophy" className="relative bg-[color:var(--bone)] py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Philosophy · 006</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              A quiet<br /><span className="italic">obsession</span> with<br />the way children<br />learn to look.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-display text-2xl leading-relaxed md:text-3xl">
              We believe a child who spends five years in a beautiful room becomes an adult who expects the world to be beautiful, too. Every joint, every shaft of light, every hush is a small argument for that future.
            </p>
            <div className="mt-16 grid grid-cols-2 gap-8">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-6xl">{s.n}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">{s.l}</div>
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

function Testimonial() {
  return (
    <section className="relative bg-[color:var(--ink)] py-32 text-[color:var(--cream)]">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="relative aspect-[3/4] overflow-hidden md:col-span-5">
          <img src={library} alt="Founder portrait" loading="lazy" className="h-full w-full object-cover" />
          <div className="godrays absolute inset-0 opacity-60" />
        </div>
        <div className="md:col-span-7 md:pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Interview · 007</p>
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] md:text-5xl">
            <span className="text-[color:var(--copper)]">“</span>They didn't build us a school. They built a place our children walk into on tiptoe, the way you walk into a museum you love.<span className="text-[color:var(--copper)]">”</span>
          </blockquote>
          <div className="mt-10 flex items-center gap-6">
            <div>
              <div className="font-display text-lg italic">Ines Marchetti</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--cream)]/50">Founder — Atelier des Petits, Milan</div>
            </div>
            <div className="ml-auto flex items-end gap-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="block w-[3px] bg-[color:var(--copper)]/70"
                  style={{ height: `${8 + Math.sin(i) * 10 + (i % 5) * 6}px`, opacity: 0.4 + (i % 4) * 0.15 }} />
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
  return (
    <section id="contact" className="relative overflow-hidden py-40">
      <img src={reception} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-[color:var(--background)]/70" />
      <div className="godrays absolute inset-0" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--copper)]">Commission · 008</p>
        <h2 className="mt-4 font-display text-6xl leading-[0.9] tracking-tight md:text-[10vw]">
          <span className="italic">Begin</span> a<br />conversation.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--foreground)]/80">
              Guild Services accepts a small number of commissions each year. If you are building — or rebuilding — a preschool, we would like to hear the story before the brief.
            </p>
            <div className="mt-10 space-y-4 font-mono text-[11px] uppercase tracking-[0.28em]">
              <div>studio@guildservices.co</div>
              <div>+91 · 22 · 4000 · 1900</div>
              <div>Mumbai — Bengaluru — Milan</div>
            </div>
          </div>
          <form className="space-y-6 md:col-span-6 md:col-start-7">
            {[
              { p: "Your name", n: "name" },
              { p: "Your institution", n: "org" },
              { p: "Email address", n: "email" },
            ].map((f) => (
              <input key={f.n} placeholder={f.p} className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-4 font-display text-2xl outline-none placeholder:text-[color:var(--ink)]/30 focus:border-[color:var(--copper)]" />
            ))}
            <textarea placeholder="Tell us about the school" rows={3}
              className="w-full border-b border-[color:var(--ink)]/30 bg-transparent py-4 font-display text-2xl outline-none placeholder:text-[color:var(--ink)]/30 focus:border-[color:var(--copper)]" />
            <button type="button" data-cursor="link" data-cursor-label="send"
              className="group relative mt-4 inline-flex items-center gap-4 overflow-hidden border border-[color:var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em]">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[color:var(--cream)]">Send request</span>
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[color:var(--cream)]">→</span>
              <span className="absolute inset-0 -translate-x-full bg-[color:var(--ink)] transition-transform duration-700 group-hover:translate-x-0" />
            </button>
          </form>
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
        <span>© MMXXVI Guild Services</span>
        <span className="italic font-display text-lg not-italic">A house built for children.</span>
        <span>Est. 2015 · Mumbai</span>
      </div>
    </footer>
  );
}

