import PresentationDeck from "../../components/presentations/PresentationDeck";

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
          ].map((tag, index) => (
            <span
              key={tag}
              className="deck-chip fragment fade-up"
              data-fragment-index={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-panel">
        <div className="panel-title">What customers actually buy</div>
        <div className="metric-stack">
          <div className="metric-card fragment fade-up" data-fragment-index={1}>
            <span className="metric-number">1</span>
            <span className="metric-label">AI surface for context and action</span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={2}>
            <span className="metric-number">3</span>
            <span className="metric-label">adoption paths: local, cloud, hybrid</span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={3}>
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
  return (
    <PresentationDeck
      pageTitle="Customer Overview | RealTimeX Presentation"
      pageDescription="A hidden presentation route for customer-facing RealTimeX overview decks."
      pagePath="/presentations/customer-overview/"
      slides={slides}
      renderSlide={(slide) => {
        if (slide.id === "hero") return <HeroSlide />;
        if (slide.id === "problem") return <ProblemSlide />;
        if (slide.id === "solution") return <SolutionSlide />;
        if (slide.id === "platform") return <PlatformSlide />;
        if (slide.id === "use-cases") return <UseCasesSlide />;
        if (slide.id === "why-now") return <WhyNowSlide />;
        if (slide.id === "deployment") return <DeploymentSlide />;
        if (slide.id === "evaluation") return <EvaluationSlide />;
        if (slide.id === "close") return <CloseSlide />;
        return null;
      }}
    />
  );
}
