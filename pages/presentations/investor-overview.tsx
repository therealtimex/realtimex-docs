import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
};

const slides: Slide[] = [
  {
    id: "hero",
    eyebrow: "Investor Overview",
    title: "RealTimeX is building the AI work operating system for teams that need more than chat.",
    accent: "coral",
  },
  {
    id: "category",
    eyebrow: "Category Thesis",
    title: "The opportunity is not another chatbot. It is the operating layer that connects AI to real work.",
    accent: "blue",
  },
  {
    id: "problem",
    eyebrow: "Problem",
    title: "Teams do not struggle to access models. They struggle to operationalize AI across knowledge, meetings, tools, and execution.",
    accent: "mint",
  },
  {
    id: "product",
    eyebrow: "Product",
    title: "RealTimeX unifies chat, retrieval, meetings, agents, runtime execution, channels, and admin control in one system.",
    accent: "gold",
  },
  {
    id: "why-win",
    eyebrow: "Why It Can Win",
    title: "The product is positioned where deployment flexibility, operational breadth, and execution depth matter together.",
    accent: "violet",
  },
  {
    id: "distribution",
    eyebrow: "Distribution",
    title: "The platform supports multiple entry points into an account instead of depending on a single narrow use case.",
    accent: "coral",
  },
  {
    id: "compounding",
    eyebrow: "Compounding Advantage",
    title: "The system gets more valuable as customer context, workflows, integrations, and operating patterns accumulate.",
    accent: "blue",
  },
  {
    id: "business",
    eyebrow: "Business Model Shape",
    title: "The product supports software revenue with natural expansion into more teams, workflows, control surfaces, and deployment depth.",
    accent: "mint",
  },
  {
    id: "close",
    eyebrow: "Bottom Line",
    title: "If AI moves from novelty to operational infrastructure, RealTimeX is positioned in the layer where durable value forms.",
    accent: "gold",
  },
];

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
  slides: Slide[];
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

function HeroSlide() {
  return (
    <div className="slide-grid hero-grid">
      <div className="hero-copy">
        <div className="eyebrow">Investor Overview</div>
        <h1>
          RealTimeX is building the AI work operating system for teams that
          need more than chat.
        </h1>
        <p className="hero-summary">
          The product sits at the point where models, knowledge, meetings,
          workflows, agents, and execution need to work together inside one
          operating surface.
        </p>
        <div className="hero-tags">
          {[
            "AI Work OS",
            "Chat + Retrieval + Meetings",
            "Runtime Execution",
            "Local + Cloud + Hybrid",
            "Channels + Plugins + MCP",
            "Operator-Controlled AI",
          ].map((tag) => (
            <span key={tag} className="deck-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-title">What matters</div>
        <div className="metric-stack">
          <div className="metric-card">
            <span className="metric-number">1</span>
            <span className="metric-label">
              operational layer between models and team workflows
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-number">3</span>
            <span className="metric-label">
              deployment paths: local, hosted, hybrid
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-number">6+</span>
            <span className="metric-label">
              product surfaces that create account expansion paths
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Category Thesis</div>
        <h2>
          The opportunity is not another chatbot. It is the operating layer
          that connects AI to real work.
        </h2>
        <p className="slide-copy">
          Model access is becoming abundant. The scarce layer is the system that
          helps teams deploy AI into meetings, documents, tools, channels,
          workflows, and governed execution.
        </p>
      </div>
      <div className="card-grid">
        {[
          [
            "Models commoditize",
            "Access to model intelligence keeps widening, which shifts value upward into orchestration and operating context.",
          ],
          [
            "Work remains fragmented",
            "The real bottleneck is not generating answers. It is joining knowledge, follow-up, systems, and execution.",
          ],
          [
            "Control becomes strategic",
            "Customers want provider choice, local options, admin visibility, and safer operational behavior.",
          ],
          [
            "Workflow depth wins",
            "The platform that stays close to real working patterns can capture more durable product value.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="deck-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Problem</div>
        <h2>
          Teams do not struggle to access models. They struggle to
          operationalize AI across knowledge, meetings, tools, and execution.
        </h2>
        <p className="slide-copy">
          The current stack is usually fragmented: one product for chat, one
          for notes, another for meetings, another for automation, and too much
          glue in between.
        </p>
      </div>
      <div className="feature-columns">
        {[
          {
            title: "Context is scattered",
            points: [
              "Documents, notes, meeting records, and workspace knowledge live in different systems.",
              "Teams waste time moving information back into AI manually.",
              "Reference value drops when context is not attached to execution.",
            ],
          },
          {
            title: "Execution breaks down",
            points: [
              "Answering a question is easy; taking action safely across tools is much harder.",
              "Brittle handoffs create low trust in automation.",
              "Most AI stacks stall before they become dependable operating systems.",
            ],
          },
          {
            title: "Governance is weak",
            points: [
              "Customers need roles, credentials, logs, approvals, and deployment choice.",
              "Many tools treat these as afterthoughts.",
              "Operational adoption depends on control as much as intelligence.",
            ],
          },
        ].map((column) => (
          <div key={column.title} className="deck-card column-card">
            <h3>{column.title}</h3>
            <ul>
              {column.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Product</div>
        <h2>
          RealTimeX unifies chat, retrieval, meetings, agents, runtime
          execution, channels, and admin control in one system.
        </h2>
      </div>
      <div className="platform-grid">
        {[
          [
            "Knowledge layer",
            "Documents, notes, embeddings, vector databases, chunking, and retrieval controls.",
          ],
          [
            "Work surface",
            "Chat UI, query flows, voice, slash commands, system prompts, and personality layers.",
          ],
          [
            "Meetings layer",
            "Meeting Minutes, calendar integration, capture, imports, synthesis, and follow-up.",
          ],
          [
            "Execution layer",
            "Agent runtime, agentic CLIs, browser sessions, MCP servers, and controlled tool access.",
          ],
          [
            "Extension layer",
            "Plugins, channels, marketplace assets, and provider integrations.",
          ],
          [
            "Operator layer",
            "Users, workspaces, credentials, logs, security, prompts, mobile devices, and admin setup.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="platform-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyWinSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Why It Can Win</div>
        <h2>
          The product is positioned where deployment flexibility, operational
          breadth, and execution depth matter together.
        </h2>
        <p className="slide-copy">
          That combination is difficult to fake with a narrow wrapper product
          or a single-point AI feature.
        </p>
      </div>
      <div className="comparison-panel">
        <div className="comparison-card">
          <span className="comparison-label">Common pattern</span>
          <ul>
            <li>Strong demo around chat or one workflow</li>
            <li>Weak control over deployment and operations</li>
            <li>Limited path from context to execution</li>
            <li>Thin room for deeper account standardization</li>
          </ul>
        </div>
        <div className="comparison-card featured">
          <span className="comparison-label">RealTimeX position</span>
          <ul>
            <li>Multi-surface system instead of a single narrow wedge</li>
            <li>Local, hosted, and hybrid deployment story</li>
            <li>Operational AI behavior shaped by prompts, plugins, runtime, and governance</li>
            <li>More ways to become embedded in how a team actually works</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DistributionSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Distribution</div>
        <h2>
          The platform supports multiple entry points into an account instead of
          depending on a single narrow use case.
        </h2>
      </div>
      <div className="use-case-list">
        {[
          [
            "Team workflow entry",
            "Start with support, customer success, enablement, or operations where knowledge and follow-through already matter.",
          ],
          [
            "Meetings entry",
            "Use meeting capture, synthesis, and calendar-linked preparation as a visible first wedge.",
          ],
          [
            "Agent execution entry",
            "Lead with runtime workflows, browser tasks, MCP, or controlled tool use where action matters.",
          ],
          [
            "Governance entry",
            "Win with customers that need local deployment, provider flexibility, and operator oversight from day one.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="use-case-row">
            <div className="use-case-title">{title}</div>
            <div className="use-case-body">{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompoundingSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Compounding Advantage</div>
        <h2>
          The system gets more valuable as customer context, workflows,
          integrations, and operating patterns accumulate.
        </h2>
      </div>
      <div className="deployment-grid">
        {[
          [
            "Knowledge compounds",
            "Imported documents, notes, and workspace memory increase retrieval value over time.",
          ],
          [
            "Behavior compounds",
            "Prompts, slash commands, plugins, personality files, and agent configuration become reusable operating assets.",
          ],
          [
            "Workflow compounds",
            "Meeting flows, channel behavior, goals, and runtime actions become embedded in day-to-day use.",
          ],
          [
            "Control compounds",
            "Admin setup, credentials, workspaces, approvals, and provider choices create organizational fit that is harder to replace.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="deck-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="deck-banner">
        The compounding value is not only model output quality. It is the
        operating configuration a team builds on top of the platform.
      </div>
    </div>
  );
}

function BusinessSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Business Model Shape</div>
        <h2>
          The product supports software revenue with natural expansion into more
          teams, workflows, control surfaces, and deployment depth.
        </h2>
      </div>
      <div className="timeline">
        {[
          [
            "Stage 1",
            "Land with one visible workflow or operational team where fast value can be shown.",
          ],
          [
            "Stage 2",
            "Expand into additional workspaces, users, meetings, prompts, channels, or runtime use cases.",
          ],
          [
            "Stage 3",
            "Deepen the account through governance, local deployment, integrations, and standard operating patterns.",
          ],
          [
            "Stage 4",
            "Become part of the customer’s day-to-day AI operating layer rather than a lightweight assistant add-on.",
          ],
        ].map(([step, body]) => (
          <div key={step} className="timeline-item">
            <div className="timeline-step">{step}</div>
            <div className="timeline-body">{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CloseSlide() {
  return (
    <div className="slide-grid close-grid">
      <div>
        <div className="eyebrow">Bottom Line</div>
        <h2>
          If AI moves from novelty to operational infrastructure, RealTimeX is
          positioned in the layer where durable value forms.
        </h2>
        <p className="hero-summary">
          The product is not limited to inference access. It is aimed at the
          system customers use to operationalize AI across real work.
        </p>
      </div>
      <div className="close-actions">
        <a className="primary-link" href="/presentations/customer-overview/">
          Open customer deck
        </a>
        <a className="secondary-link" href="/presentations/partner-overview/">
          Open partner deck
        </a>
      </div>
    </div>
  );
}

export default function InvestorOverviewPresentation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideRefs = useMemo(
    () => slides.map(() => ({ current: null as HTMLElement | null })),
    []
  );

  const scrollToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(slides.length - 1, index));
    slideRefs[safeIndex]?.current?.scrollIntoView({
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
  }, []);

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
  }, [activeIndex]);

  return (
    <>
      <Head>
        <title>Investor Overview | RealTimeX Presentation</title>
        <meta
          name="description"
          content="A hidden presentation route for investor-facing RealTimeX overview decks."
        />
      </Head>

      <div className="deck-shell">
        <div className="deck-header">
          <a href="/" className="brand-lockup">
            <span className="brand-mark" />
            <span className="brand-copy">RealTimeX Presentation</span>
          </a>
          <div className="deck-status">
            <span className="deck-status-pill">Hidden route</span>
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
                slideRefs[index].current = node;
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

                {slide.id === "hero" && <HeroSlide />}
                {slide.id === "category" && <CategorySlide />}
                {slide.id === "problem" && <ProblemSlide />}
                {slide.id === "product" && <ProductSlide />}
                {slide.id === "why-win" && <WhyWinSlide />}
                {slide.id === "distribution" && <DistributionSlide />}
                {slide.id === "compounding" && <CompoundingSlide />}
                {slide.id === "business" && <BusinessSlide />}
                {slide.id === "close" && <CloseSlide />}
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
