import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  summary?: string;
  accent?: string;
};

const slides: Slide[] = [
  {
    id: "hero",
    eyebrow: "Customer Overview",
    title: "RealTimeX is the AI work operating system for teams that need more than chat.",
    summary:
      "One platform for knowledge, meetings, agents, runtime execution, channels, and local or cloud deployment.",
    accent: "coral",
  },
  {
    id: "problem",
    eyebrow: "The Problem",
    title: "Most AI products answer questions. Real teams need AI that can stay connected to the work.",
    summary:
      "Knowledge lives in documents. Action lives in chats, meetings, calendars, channels, tools, and local systems. Fragmented AI stacks break at the handoff.",
    accent: "blue",
  },
  {
    id: "solution",
    eyebrow: "What RealTimeX Solves",
    title: "RealTimeX turns scattered context into one operational AI surface.",
    summary:
      "It gives teams one place to ask, automate, capture, route, and follow through without stitching together five separate products.",
    accent: "mint",
  },
  {
    id: "platform",
    eyebrow: "Platform Surface",
    title: "Customers get one product that covers the full path from context to execution.",
    summary:
      "Chat, agents, meetings, runtime tools, channels, plugins, local models, and cloud providers live in the same system.",
    accent: "gold",
  },
  {
    id: "use-cases",
    eyebrow: "Common Use Cases",
    title: "The strongest fit is teams with repeatable operational work, not just one-off prompting.",
    summary:
      "Customer success, internal operations, support, meeting-heavy teams, and AI rollout programs all benefit from a unified surface.",
    accent: "violet",
  },
  {
    id: "why-now",
    eyebrow: "Why Customers Choose It",
    title: "RealTimeX is differentiated by integration depth, deployment flexibility, and operator control.",
    summary:
      "Customers can stay local, go cloud, mix providers, connect runtime tools, and keep humans in control of how AI behaves.",
    accent: "coral",
  },
  {
    id: "deployment",
    eyebrow: "Deployment Models",
    title: "Start where the customer is today, not where the vendor wants them to be.",
    summary:
      "Desktop, local models, hosted collaboration, or hybrid adoption paths all fit into the same product story.",
    accent: "blue",
  },
  {
    id: "evaluation",
    eyebrow: "Evaluation Path",
    title: "A fast evaluation can move from overview to working proof in a single session.",
    summary:
      "Customers do not need to imagine the value. They can connect real context and see execution, meetings, and follow-up flows immediately.",
    accent: "mint",
  },
  {
    id: "close",
    eyebrow: "Bottom Line",
    title: "If a customer needs AI that can read, reason, act, and stay connected to real operations, RealTimeX is the shortest path.",
    summary:
      "This is not another chat wrapper. It is the execution layer for teams adopting AI across real workflows.",
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
        <div className="eyebrow">Customer Overview</div>
        <h1>
          RealTimeX is the AI work operating system for teams that need more than chat.
        </h1>
        <p className="hero-summary">
          One platform for knowledge, meetings, agents, runtime execution,
          channels, and local or cloud deployment.
        </p>
        <div className="hero-tags">
          {[
            "Knowledge + Retrieval",
            "Agent Runtime",
            "Meeting Minutes",
            "Calendar + Goals",
            "Channels + Plugins",
            "Local or Cloud Models",
          ].map((tag) => (
            <span key={tag} className="deck-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-title">What customers actually buy</div>
        <div className="metric-stack">
          <div className="metric-card">
            <span className="metric-number">1</span>
            <span className="metric-label">AI surface for context and action</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">3</span>
            <span className="metric-label">adoption paths: local, cloud, hybrid</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">5+</span>
            <span className="metric-label">work layers unified in one product</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">The Problem</div>
        <h2>Most AI products answer questions. Real teams need AI that can stay connected to the work.</h2>
        <p className="slide-copy">
          Knowledge lives in documents. Action lives in chats, meetings,
          calendars, channels, tools, and local systems. Fragmented AI stacks
          break at the handoff.
        </p>
      </div>
      <div className="card-grid">
        {[
          ["Knowledge is isolated", "Documents and notes are separate from the place where decisions happen."],
          ["Meetings are lost", "Audio, transcripts, action items, and follow-up often live in different tools."],
          ["Automation is brittle", "Workflows depend on disconnected bots, scripts, and provider-specific glue."],
          ["Governance is weak", "Teams struggle to control what AI can access, where it runs, and who owns the setup."],
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

function SolutionSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">What RealTimeX Solves</div>
        <h2>RealTimeX turns scattered context into one operational AI surface.</h2>
        <p className="slide-copy">
          It gives teams one place to ask, automate, capture, route, and
          follow through without stitching together five separate products.
        </p>
      </div>
      <div className="feature-columns">
        {[
          {
            title: "Make knowledge usable",
            points: [
              "Bring in documents, notes, and workspace knowledge.",
              "Control retrieval, chunking, embeddings, and vector back ends.",
              "Keep reference material close to the workflows that depend on it.",
            ],
          },
          {
            title: "Turn chat into execution",
            points: [
              "Move from asking to acting with agents, runtime tools, MCP, and browser workflows.",
              "Use slash commands, prompts, personalities, and reusable behaviors.",
              "Track goals and ambient follow-up across workspaces.",
            ],
          },
          {
            title: "Keep humans in control",
            points: [
              "Choose what runs locally, what runs in the cloud, and what needs approval.",
              "Configure roles, credentials, plugins, channels, and integrations centrally.",
              "Keep operations visible through logs, dashboards, and audit surfaces.",
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

function PlatformSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Platform Surface</div>
        <h2>Customers get one product that covers the full path from context to execution.</h2>
      </div>
      <div className="platform-grid">
        {[
          ["Chat + Query", "Workspace chat, citations, reusable commands, voice, and guided user interaction."],
          ["Agents + Runtime", "Agent runtime, agentic CLIs, working directories, browser sessions, and operator controls."],
          ["Meetings + Calendar", "Meeting Minutes, Calendar Integration, live capture, imports, prep, and follow-up."],
          ["Channels + Extensions", "Slack, Telegram, Discord, WhatsApp, Zalo, plugins, and marketplace assets."],
          ["Local + Cloud AI", "Local models, hosted providers, embeddings, vector databases, and provider flexibility."],
          ["Admin + Governance", "Users, workspaces, credentials, logs, security, and setup surfaces for rollout."],
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

function UseCasesSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Common Use Cases</div>
        <h2>The strongest fit is teams with repeatable operational work, not just one-off prompting.</h2>
      </div>
      <div className="use-case-list">
        {[
          [
            "Customer success and account teams",
            "Capture meetings, generate follow-up, prep for the next call, and keep knowledge close to the account workflow.",
          ],
          [
            "Operations and internal enablement",
            "Turn SOPs, prompts, tools, and runtime actions into governed AI workflows that teams can actually use.",
          ],
          [
            "Support and service desks",
            "Bring together channels, knowledge, agent behavior, and escalation logic instead of relying on isolated bots.",
          ],
          [
            "AI transformation programs",
            "Start with desktop and local adoption, then grow into shared workspaces, governance, and operational rollout.",
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

function WhyNowSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Why Customers Choose It</div>
        <h2>RealTimeX is differentiated by integration depth, deployment flexibility, and operator control.</h2>
        <p className="slide-copy">
          Customers can stay local, go cloud, mix providers, connect runtime
          tools, and keep humans in control of how AI behaves.
        </p>
      </div>
      <div className="comparison-panel">
        <div className="comparison-card">
          <span className="comparison-label">Most AI tools</span>
          <ul>
            <li>Strong on chat</li>
            <li>Weak on operations</li>
            <li>Limited deployment choice</li>
            <li>Disconnected meeting and runtime story</li>
          </ul>
        </div>
        <div className="comparison-card featured">
          <span className="comparison-label">RealTimeX</span>
          <ul>
            <li>Chat, retrieval, meetings, agents, and execution in one system</li>
            <li>Local, hosted, and hybrid model strategy</li>
            <li>Channels, plugins, marketplace, and admin controls built in</li>
            <li>Designed for real operating workflows, not prompt demos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DeploymentSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Deployment Models</div>
        <h2>Start where the customer is today, not where the vendor wants them to be.</h2>
      </div>
      <div className="deployment-grid">
        {[
          ["Desktop-first", "Best for fast pilot adoption, local files, local models, and operator-driven rollout."],
          ["Cloud collaboration", "Best for shared workspaces, broader team access, and centralized operations."],
          ["Hybrid", "Best when the customer wants shared workflows but keeps sensitive execution or models local."],
        ].map(([title, body]) => (
          <div key={title} className="deck-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="deck-banner">
        The deployment story is a selling advantage: customers can start local,
        prove value quickly, and expand without switching products.
      </div>
    </div>
  );
}

function EvaluationSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Evaluation Path</div>
        <h2>A fast evaluation can move from overview to working proof in a single session.</h2>
      </div>
      <div className="timeline">
        {[
          ["Step 1", "Create one workspace around a real team problem."],
          ["Step 2", "Load documents, notes, or meeting evidence that team already uses."],
          ["Step 3", "Connect one operational surface such as Calendar, a channel, or an agent runtime tool."],
          ["Step 4", "Show one repeatable workflow from context to output or action."],
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
          If a customer needs AI that can read, reason, act, and stay connected
          to real operations, RealTimeX is the shortest path.
        </h2>
        <p className="hero-summary">
          This is not another chat wrapper. It is the execution layer for teams
          adopting AI across real workflows.
        </p>
      </div>
      <div className="close-actions">
        <a className="primary-link" href="/features/all-features">
          Explore product surface
        </a>
        <a className="secondary-link" href="/agent-runtime">
          See agent execution story
        </a>
      </div>
    </div>
  );
}

export default function CustomerOverviewPresentation() {
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
  }, [activeIndex, slideRefs]);

  return (
    <>
      <Head>
        <title>Customer Overview | RealTimeX Presentation</title>
        <meta
          name="description"
          content="A hidden presentation route for customer-facing RealTimeX overview decks."
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
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
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
                {slide.id === "problem" && <ProblemSlide />}
                {slide.id === "solution" && <SolutionSlide />}
                {slide.id === "platform" && <PlatformSlide />}
                {slide.id === "use-cases" && <UseCasesSlide />}
                {slide.id === "why-now" && <WhyNowSlide />}
                {slide.id === "deployment" && <DeploymentSlide />}
                {slide.id === "evaluation" && <EvaluationSlide />}
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
            radial-gradient(circle at top left, rgba(255, 142, 114, 0.18), transparent 28%),
            radial-gradient(circle at 85% 18%, rgba(93, 185, 255, 0.2), transparent 30%),
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
          background: linear-gradient(135deg, var(--deck-coral), var(--deck-gold));
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
          transition: transform 0.16s ease, background 0.16s ease, border-color 0.16s ease;
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
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
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
            linear-gradient(160deg, rgba(93, 185, 255, 0.08), rgba(255, 142, 114, 0.06)),
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
            linear-gradient(160deg, rgba(176, 141, 255, 0.12), rgba(112, 239, 194, 0.08)),
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
          background: linear-gradient(135deg, var(--deck-coral), var(--deck-gold));
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
