import Head from "next/head";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type DeckSlide = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
};

type PresentationDeckProps = {
  pageTitle: string;
  pageDescription: string;
  slides: DeckSlide[];
  renderSlide: (slide: DeckSlide) => ReactNode;
  homeHref?: string;
  brandLabel?: string;
  statusLabel?: string;
};

const accentMap: Record<string, string> = {
  coral: "var(--deck-coral)",
  blue: "var(--deck-blue)",
  mint: "var(--deck-mint)",
  gold: "var(--deck-gold)",
  violet: "var(--deck-violet)",
};

function ScrollDots({
  slides,
  activeIndex,
  onSelect,
}: {
  slides: DeckSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="deck-dots" aria-label="Slide navigation">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          className={`deck-dot ${activeIndex === index ? "active" : ""}`}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
        />
      ))}
    </div>
  );
}

export default function PresentationDeck({
  pageTitle,
  pageDescription,
  slides,
  renderSlide,
  homeHref = "/",
  brandLabel = "RealTimeX Presentation",
  statusLabel = "Hidden route",
}: PresentationDeckProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(slides.length - 1, index));
    slideRefs.current[safeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nextIndex = Math.round(container.scrollTop / container.clientHeight);
      setActiveIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [slides.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        scrollToSlide(activeIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        scrollToSlide(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToSlide(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, slides.length]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <div className="deck-shell">
        <div className="deck-header">
          <a href={homeHref} className="brand-lockup">
            <span className="brand-mark" />
            <span className="brand-copy">{brandLabel}</span>
          </a>
          <div className="deck-status">
            <span className="deck-status-pill">{statusLabel}</span>
            <span className="deck-status-count">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <ScrollDots
          slides={slides}
          activeIndex={activeIndex}
          onSelect={scrollToSlide}
        />

        <div className="deck-controls">
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === slides.length - 1}
          >
            Next
          </button>
        </div>

        <div className="deck-container" ref={containerRef}>
          {slides.map((slide, index) => (
            <section
              key={slide.id}
              id={slide.id}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={`deck-slide accent-${slide.accent || "blue"}`}
            >
              <div className="slide-frame">
                <div
                  className="slide-accent"
                  style={{
                    background: accentMap[slide.accent || "blue"],
                  }}
                />
                {renderSlide(slide)}
              </div>
            </section>
          ))}
        </div>
      </div>

      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
          margin: 0;
          background: #09111f;
        }

        body {
          overflow: hidden;
          font-family: "Avenir Next", "IBM Plex Sans", "Segoe UI", sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        :global(:root) {
          --deck-bg: #09111f;
          --deck-panel: rgba(10, 22, 42, 0.84);
          --deck-panel-strong: rgba(18, 36, 68, 0.92);
          --deck-line: rgba(255, 255, 255, 0.08);
          --deck-text: #f4f7fb;
          --deck-muted: #b7c0d3;
          --deck-coral: #ff8e72;
          --deck-blue: #5db9ff;
          --deck-mint: #70efc2;
          --deck-gold: #ffcf66;
          --deck-violet: #b08dff;
        }

        .deck-shell {
          position: relative;
          height: 100%;
          background:
            radial-gradient(
              circle at top left,
              rgba(255, 142, 114, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 18%,
              rgba(93, 185, 255, 0.2),
              transparent 30%
            ),
            linear-gradient(180deg, #08101c 0%, #09111f 54%, #0c1628 100%);
          color: var(--deck-text);
        }

        .deck-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px;
          pointer-events: none;
        }

        .brand-lockup,
        .deck-controls,
        .deck-dots,
        .deck-status {
          pointer-events: auto;
        }

        .brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--deck-text);
          text-decoration: none;
        }

        .brand-mark {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(
            135deg,
            var(--deck-coral),
            var(--deck-gold)
          );
          box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.04);
        }

        .brand-copy {
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--deck-muted);
        }

        .deck-status {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .deck-status-pill,
        .deck-status-count,
        .deck-chip {
          border: 1px solid var(--deck-line);
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
        }

        .deck-status-pill,
        .deck-status-count {
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          color: var(--deck-muted);
        }

        .deck-dots {
          position: fixed;
          right: 22px;
          top: 50%;
          z-index: 30;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: translateY(-50%);
        }

        .deck-dot {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.1);
          transition:
            transform 0.16s ease,
            background 0.16s ease,
            border-color 0.16s ease;
          cursor: pointer;
        }

        .deck-dot.active {
          transform: scale(1.25);
          background: #ffffff;
          border-color: #ffffff;
        }

        .deck-controls {
          position: fixed;
          left: 28px;
          bottom: 24px;
          z-index: 30;
          display: flex;
          gap: 10px;
        }

        .deck-controls button {
          border: 1px solid var(--deck-line);
          background: rgba(255, 255, 255, 0.06);
          color: var(--deck-text);
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
        }

        .deck-controls button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .deck-container {
          height: 100%;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }

        .deck-slide {
          min-height: 100svh;
          scroll-snap-align: start;
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 92px 28px 72px;
        }

        .slide-frame {
          width: min(1320px, 100%);
          min-height: calc(100svh - 164px);
          border-radius: 28px;
          border: 1px solid var(--deck-line);
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.03),
              rgba(255, 255, 255, 0.01)
            ),
            var(--deck-panel);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
          position: relative;
          overflow: hidden;
          padding: 42px;
        }

        .slide-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
        }

        .slide-grid {
          height: 100%;
          display: grid;
          gap: 28px;
        }

        .hero-grid,
        .two-column-grid {
          grid-template-columns: 1.15fr 0.85fr;
        }

        .stacked-grid,
        .close-grid {
          grid-template-columns: 1fr;
          align-content: space-between;
        }

        .hero-copy,
        .hero-panel,
        .comparison-panel,
        .timeline,
        .use-case-list,
        .feature-columns,
        .platform-grid,
        .deployment-grid {
          align-self: stretch;
        }

        .eyebrow {
          display: inline-flex;
          margin-bottom: 16px;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--deck-muted);
        }

        h1,
        h2 {
          margin: 0;
          max-width: 16ch;
          font-family: "Iowan Old Style", "Palatino Linotype", serif;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.03em;
        }

        h1 {
          font-size: clamp(3rem, 7vw, 6rem);
        }

        h2 {
          font-size: clamp(2.2rem, 5vw, 4.3rem);
        }

        h3 {
          margin: 0 0 10px;
          font-size: 1.05rem;
          line-height: 1.2;
        }

        p,
        li {
          font-size: 1rem;
          line-height: 1.65;
          color: var(--deck-muted);
        }

        .hero-summary,
        .slide-copy {
          max-width: 44rem;
          margin: 22px 0 0;
          font-size: clamp(1.05rem, 1.8vw, 1.3rem);
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }

        .deck-chip {
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 13px;
          color: var(--deck-text);
        }

        .hero-panel,
        .comparison-card,
        .deck-card,
        .platform-card,
        .metric-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--deck-line);
          border-radius: 22px;
        }

        .hero-panel {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            linear-gradient(
              160deg,
              rgba(93, 185, 255, 0.08),
              rgba(255, 142, 114, 0.06)
            ),
            var(--deck-panel-strong);
        }

        .panel-title {
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--deck-muted);
        }

        .metric-stack {
          display: grid;
          gap: 16px;
          margin-top: 28px;
        }

        .metric-card {
          padding: 20px;
        }

        .metric-number {
          display: block;
          font-size: 2.7rem;
          font-family: "Iowan Old Style", "Palatino Linotype", serif;
          color: var(--deck-text);
        }

        .metric-label {
          display: block;
          margin-top: 6px;
          color: var(--deck-muted);
        }

        .card-grid,
        .feature-columns,
        .deployment-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .feature-columns {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .deck-card,
        .platform-card {
          padding: 22px;
        }

        .column-card ul,
        .comparison-card ul {
          margin: 0;
          padding-left: 18px;
        }

        .column-card li,
        .comparison-card li {
          margin: 0 0 10px;
        }

        .platform-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .platform-card {
          min-height: 180px;
        }

        .use-case-list {
          display: grid;
          gap: 14px;
        }

        .use-case-row {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 18px;
          align-items: start;
          padding: 20px 0;
          border-top: 1px solid var(--deck-line);
        }

        .use-case-row:first-child {
          border-top: 0;
        }

        .use-case-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--deck-text);
        }

        .comparison-panel {
          display: grid;
          gap: 18px;
        }

        .comparison-card {
          padding: 22px;
        }

        .comparison-card.featured {
          background:
            linear-gradient(
              160deg,
              rgba(176, 141, 255, 0.12),
              rgba(112, 239, 194, 0.08)
            ),
            rgba(255, 255, 255, 0.05);
        }

        .comparison-label {
          display: inline-flex;
          margin-bottom: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--deck-line);
          color: var(--deck-text);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .deck-banner {
          padding: 18px 22px;
          border-radius: 18px;
          border: 1px solid rgba(255, 207, 102, 0.22);
          background: rgba(255, 207, 102, 0.08);
          color: #ffe8b0;
          font-size: 1.02rem;
        }

        .timeline {
          display: grid;
          gap: 16px;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 18px;
          align-items: start;
          padding: 18px 0;
          border-top: 1px solid var(--deck-line);
        }

        .timeline-item:first-child {
          border-top: 0;
        }

        .timeline-step {
          color: var(--deck-text);
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .timeline-body {
          color: var(--deck-muted);
          font-size: 1rem;
          line-height: 1.7;
        }

        .close-grid {
          align-items: center;
        }

        .close-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }

        .primary-link,
        .secondary-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          padding: 14px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
        }

        .primary-link {
          background: linear-gradient(
            135deg,
            var(--deck-coral),
            var(--deck-gold)
          );
          color: #09111f;
        }

        .secondary-link {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--deck-line);
          color: var(--deck-text);
        }

        @media (max-width: 1100px) {
          .hero-grid,
          .two-column-grid {
            grid-template-columns: 1fr;
          }

          .feature-columns,
          .platform-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .deck-slide {
            padding: 84px 18px 88px;
          }

          .slide-frame {
            padding: 24px;
            min-height: calc(100svh - 172px);
          }

          .card-grid,
          .deployment-grid {
            grid-template-columns: 1fr;
          }

          .use-case-row,
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .deck-dots {
            display: none;
          }

          .deck-controls {
            left: 18px;
            right: 18px;
            justify-content: space-between;
          }

          .deck-controls button {
            flex: 1;
          }

          .deck-header {
            padding: 16px 18px;
          }

          .deck-status-pill {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
