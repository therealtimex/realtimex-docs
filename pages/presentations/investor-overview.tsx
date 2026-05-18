import PresentationDeck from "../../components/presentations/PresentationDeck";

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
        <div className="panel-title">What matters</div>
        <div className="metric-stack">
          <div className="metric-card fragment fade-up" data-fragment-index={1}>
            <span className="metric-number">1</span>
            <span className="metric-label">
              operational layer between models and team workflows
            </span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={2}>
            <span className="metric-number">3</span>
            <span className="metric-label">
              deployment paths: local, hosted, hybrid
            </span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={3}>
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
            "Become part of the customer's day-to-day AI operating layer rather than a lightweight assistant add-on.",
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
  return (
    <PresentationDeck
      pageTitle="Investor Overview | RealTimeX Presentation"
      pageDescription="A hidden presentation route for investor-facing RealTimeX overview decks."
      pagePath="/presentations/investor-overview/"
      slides={slides}
      renderSlide={(slide) => {
        if (slide.id === "hero") return <HeroSlide />;
        if (slide.id === "category") return <CategorySlide />;
        if (slide.id === "problem") return <ProblemSlide />;
        if (slide.id === "product") return <ProductSlide />;
        if (slide.id === "why-win") return <WhyWinSlide />;
        if (slide.id === "distribution") return <DistributionSlide />;
        if (slide.id === "compounding") return <CompoundingSlide />;
        if (slide.id === "business") return <BusinessSlide />;
        if (slide.id === "close") return <CloseSlide />;
        return null;
      }}
    />
  );
}
