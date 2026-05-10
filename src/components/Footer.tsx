import MarqueeBar from "./ui/MarqueeBar";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 pt-16 pb-24 md:mt-0 md:pb-6 relative z-50" role="contentinfo">
      {/* Back to top */}
      <div className="flex justify-center mb-8">
        <button
          onClick={scrollToTop}
          className="font-mono text-[10px] tracking-[3px] text-chrome/40 border border-dark-border px-4 py-2 hover:border-lime hover:text-lime transition-all"
          aria-label="Scroll back to top"
        >
          ↑ TOP
        </button>
      </div>

      {/* Reverse Marquee */}
      <MarqueeBar
        text="BRENT JUSTINE BARBADILLO ✦ FRONTEND DEVELOPER ✦ REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦"
        reverse
      />

      {/* Bottom strip */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-4 text-center md:text-left">
        <span className="font-mono text-[10px] tracking-[2px] text-chrome/40">
          BRENT_JUSTINE_BARBADILLO © 2025
        </span>
        <span className="font-mono text-[10px] tracking-[2px] text-chrome/40">
          BUILT WITH NEXT.JS + ❤️
        </span>
      </div>
    </footer>
  );
}
