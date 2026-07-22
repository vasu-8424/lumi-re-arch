import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (label.current) label.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll<HTMLElement>("[data-cursor]");
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      ring.current?.setAttribute("data-mode", el.dataset.cursor || "hover");
      if (label.current) label.current.textContent = el.dataset.cursorLabel || "";
    };
    const leave = () => {
      ring.current?.setAttribute("data-mode", "");
      if (label.current) label.current.textContent = "";
    };
    targets.forEach((t) => { t.addEventListener("mouseenter", enter); t.addEventListener("mouseleave", leave); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      targets.forEach((t) => { t.removeEventListener("mouseenter", enter); t.removeEventListener("mouseleave", leave); });
    };
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ marginLeft: -22, marginTop: -22 }}>
        <div className="cursor-ring h-11 w-11 rounded-full border border-[color:var(--ink)]/50 mix-blend-difference transition-[width,height,border-radius,background,opacity] duration-300"
          data-mode="" />
      </div>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[101] hidden md:block"
        style={{ marginLeft: -3, marginTop: -3 }}>
        <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--copper)]" />
      </div>
      <div ref={label} className="pointer-events-none fixed left-0 top-0 z-[102] hidden md:block text-[10px] font-mono uppercase tracking-[0.2em] text-[color:var(--cream)]"
        style={{ marginLeft: 22, marginTop: 22 }} />
      <style>{`
        .cursor-ring[data-mode="view"] { width: 88px; height: 88px; margin-left: -44px; margin-top: -44px; background: color-mix(in oklch, var(--ink) 88%, transparent); border-color: transparent; }
        .cursor-ring[data-mode="drag"] { width: 108px; height: 108px; margin-left: -54px; margin-top: -54px; background: color-mix(in oklch, var(--copper) 82%, transparent); border-color: transparent; }
        .cursor-ring[data-mode="link"] { width: 64px; height: 64px; margin-left: -32px; margin-top: -32px; border-color: var(--copper); background: color-mix(in oklch, var(--copper) 15%, transparent); }
      `}</style>
    </>
  );
}
