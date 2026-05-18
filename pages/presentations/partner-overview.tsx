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
    eyebrow: "Partner Overview",
    title: "RealTimeX gives distribution partners an AI platform they can sell, deliver, and expand.",
    accent: "coral",
  },
  {
    id: "why-partner",
    eyebrow: "Why Partner",
    title: "The strongest partner motion is not reselling chat. It is solving operational AI adoption for customers.",
    accent: "blue",
  },
  {
    id: "what-you-sell",
    eyebrow: "What Partners Sell",
    title: "Partners can package RealTimeX as software, implementation, governance, and workflow rollout.",
    accent: "mint",
  },
  {
    id: "ideal-customers",
    eyebrow: "Ideal Customers",
    title: "The best-fit accounts already have AI interest, fragmented workflows, and real operational complexity.",
    accent: "gold",
  },
  {
    id: "delivery-model",
    eyebrow: "Delivery Model",
    title: "Partners can start small, prove value fast, and expand into deeper rollout without changing platforms.",
    accent: "violet",
  },
  {
    id: "differentiation",
    eyebrow: "Why RealTimeX",
    title: "RealTimeX creates partner leverage through deployment flexibility, integration depth, and operator control.",
    accent: "coral",
  },
  {
    id: "revenue",
    eyebrow: "Revenue Expansion",
    title: "The product supports recurring software revenue and follow-on services instead of a one-time pilot only.",
    accent: "blue",
  },
  {
    id: "joint-rollout",
    eyebrow: "Joint Rollout",
    title: "A first customer engagement can move from discovery to working proof in a compact delivery cycle.",
    accent: "mint",
  },
  {
    id: "close",
    eyebrow: "Bottom Line",
    title: "RealTimeX gives partners a credible AI operating platform they can take into real customer environments now.",
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
        <div className="eyebrow">Partner Overview</div>
        <h1>
          RealTimeX gives distribution partners an AI platform they can sell,
          deliver, and expand.
        </h1>
        <p className="hero-summary">
          It creates a practical partner story across pilots, rollouts,
          governance, local deployment, meetings, agents, and operational AI.
        </p>
        <div className="hero-tags">
          {[
            "Software + Services",
            "Desktop + Cloud + Hybrid",
            "Operational AI Rollouts",
            "Meetings + Runtime + Channels",
            "Governance + Admin Controls",
            "Expandable Account Story",
          ].map((tag) => (
            <span key={tag} className="deck-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-title">What partners get</div>
        <div className="metric-stack">
          <div className="metric-card">
            <span className="metric-number">1</span>
            <span className="metric-label">
              platform that spans pilots to operational rollout
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-number">3</span>
            <span className="metric-label">
              delivery paths: desktop, cloud, hybrid
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-number">6+</span>
            <span className="metric-label">
              expansion surfaces inside one customer account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyPartnerSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Why Partner</div>
        <h2>
          The strongest partner motion is not reselling chat. It is solving
          operational AI adoption for customers.
        </h2>
        <p className="slide-copy">
          Customers need more than prompt access. They need a usable system for
          knowledge, meetings, agents, channels, governance, and real execution.
        </p>
      </div>
      <div className="card-grid">
        {[
          [
            "Customers need help shipping",
            "Many accounts have AI interest but no stable operating model for real workflows.",
          ],
          [
            "Pilots need a path forward",
            "Point solutions often stall after a demo because they do not connect to the rest of the customer environment.",
          ],
          [
            "Services can attach naturally",
            "Deployment, prompt design, agent configuration, integrations, and governance all create service opportunities.",
          ],
          [
            "Platform breadth matters",
            "A partner can solve multiple customer problems without stitching together separate vendors for each layer.",
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

function WhatYouSellSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">What Partners Sell</div>
        <h2>
          Partners can package RealTimeX as software, implementation,
          governance, and workflow rollout.
        </h2>
        <p className="slide-copy">
          The partner story is broader than licenses alone. The product supports
          an account strategy built around working deployment.
        </p>
      </div>
      <div className="feature-columns">
        {[
          {
            title: "Pilot package",
            points: [
              "Launch one workspace around a concrete customer workflow.",
              "Connect documents, meetings, and one execution surface.",
              "Show measurable value without a long implementation cycle.",
            ],
          },
          {
            title: "Operational rollout",
            points: [
              "Expand into workspaces, users, agents, channels, and admin policy.",
              "Configure system prompts, slash commands, plugins, and credentials.",
              "Build repeatable internal operating patterns for customer teams.",
            ],
          },
          {
            title: "Managed services",
            points: [
              "Offer support around deployment model selection and provider setup.",
              "Own governance, workflow optimization, and agent behavior tuning.",
              "Use the platform to create recurring advisory and administration work.",
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

function IdealCustomersSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Ideal Customers</div>
        <h2>
          The best-fit accounts already have AI interest, fragmented workflows,
          and real operational complexity.
        </h2>
      </div>
      <div className="use-case-list">
        {[
          [
            "Service-heavy teams",
            "Customer success, support, internal enablement, and operations groups where knowledge and follow-through matter.",
          ],
          [
            "Meeting-dense organizations",
            "Teams that depend on meeting capture, synthesis, task extraction, and calendar-linked preparation.",
          ],
          [
            "Security- or control-sensitive buyers",
            "Accounts that care about local deployment, hybrid setup, approval flows, and operator-level control.",
          ],
          [
            "Transformation programs",
            "Organizations looking for a platform that can start with one team and expand into broader AI operating patterns.",
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

function DeliveryModelSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Delivery Model</div>
        <h2>
          Partners can start small, prove value fast, and expand into deeper
          rollout without changing platforms.
        </h2>
        <p className="slide-copy">
          The product supports early validation and later standardization in
          the same account.
        </p>
      </div>
      <div className="comparison-panel">
        <div className="comparison-card">
          <span className="comparison-label">Early phase</span>
          <ul>
            <li>Desktop or small shared deployment</li>
            <li>One team, one workflow, one visible problem</li>
            <li>Fast time-to-value with real data and meetings</li>
            <li>Low-friction introduction to operational AI</li>
          </ul>
        </div>
        <div className="comparison-card featured">
          <span className="comparison-label">Expansion phase</span>
          <ul>
            <li>Shared workspaces, roles, admin controls, and audit surfaces</li>
            <li>Channels, plugins, agent runtime, prompts, and integrations</li>
            <li>Deployment flexibility for cloud, local, or hybrid adoption</li>
            <li>Room for ongoing partner services and account growth</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DifferentiationSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Why RealTimeX</div>
        <h2>
          RealTimeX creates partner leverage through deployment flexibility,
          integration depth, and operator control.
        </h2>
      </div>
      <div className="platform-grid">
        {[
          [
            "Deployment flexibility",
            "Partners can meet customers where they are today instead of forcing one architecture too early.",
          ],
          [
            "Platform breadth",
            "Meetings, chat, goals, runtime execution, channels, and knowledge live in one sellable system.",
          ],
          [
            "Admin control",
            "Users, workspaces, security, credentials, plugins, prompts, and logs support real enterprise rollout work.",
          ],
          [
            "Execution story",
            "Agent runtime, MCP, browser flows, and agentic CLIs make the platform more than a question-answer surface.",
          ],
          [
            "Services attach points",
            "Partners can add setup, migration, governance, workflow design, and support around the core product.",
          ],
          [
            "Expansion path",
            "A single win can naturally grow into more teams, more workflows, and more operational dependency.",
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

function RevenueSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Revenue Expansion</div>
        <h2>
          The product supports recurring software revenue and follow-on services
          instead of a one-time pilot only.
        </h2>
      </div>
      <div className="deployment-grid">
        {[
          [
            "Initial software sale",
            "Start with a focused use case and a defined team or workspace footprint.",
          ],
          [
            "Implementation services",
            "Add onboarding, provider setup, prompt systems, plugin configuration, and workflow design.",
          ],
          [
            "Managed operations",
            "Offer ongoing admin, governance, optimization, and rollout support as adoption grows.",
          ],
          [
            "Account expansion",
            "Expand into channels, meetings, runtime tools, local models, and more teams over time.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="deck-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="deck-banner">
        The strongest partner motion is land with one operational workflow,
        then expand as the customer trusts the platform and standardizes on it.
      </div>
    </div>
  );
}

function JointRolloutSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Joint Rollout</div>
        <h2>
          A first customer engagement can move from discovery to working proof
          in a compact delivery cycle.
        </h2>
      </div>
      <div className="timeline">
        {[
          [
            "Step 1",
            "Choose one target team with a real operational problem, not a generic AI curiosity project.",
          ],
          [
            "Step 2",
            "Load customer context such as documents, notes, meetings, or existing channel flows.",
          ],
          [
            "Step 3",
            "Connect one execution layer such as meetings, calendar, channels, or agent runtime.",
          ],
          [
            "Step 4",
            "Demonstrate one repeatable before-and-after workflow that the customer can adopt immediately.",
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
          RealTimeX gives partners a credible AI operating platform they can
          take into real customer environments now.
        </h2>
        <p className="hero-summary">
          It supports software revenue, implementation work, governance
          services, and account expansion without forcing partners into a
          narrow single-use-case story.
        </p>
      </div>
      <div className="close-actions">
        <a className="primary-link" href="/presentations/customer-overview/">
          Open customer deck
        </a>
        <a className="secondary-link" href="/features/all-features/">
          Explore product surface
        </a>
      </div>
    </div>
  );
}

export default function PartnerOverviewPresentation() {
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
        <title>Partner Overview | RealTimeX Presentation</title>
        <meta
          name="description"
          content="A hidden presentation route for distribution partner-facing RealTimeX overview decks."
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
                {slide.id === "why-partner" && <WhyPartnerSlide />}
                {slide.id === "what-you-sell" && <WhatYouSellSlide />}
                {slide.id === "ideal-customers" && <IdealCustomersSlide />}
                {slide.id === "delivery-model" && <DeliveryModelSlide />}
                {slide.id === "differentiation" && <DifferentiationSlide />}
                {slide.id === "revenue" && <RevenueSlide />}
                {slide.id === "joint-rollout" && <JointRolloutSlide />}
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
