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
  return (
    <PresentationDeck
      pageTitle="Partner Overview | RealTimeX Presentation"
      pageDescription="A hidden presentation route for distribution partner-facing RealTimeX overview decks."
      slides={slides}
      renderSlide={(slide) => {
        if (slide.id === "hero") return <HeroSlide />;
        if (slide.id === "why-partner") return <WhyPartnerSlide />;
        if (slide.id === "what-you-sell") return <WhatYouSellSlide />;
        if (slide.id === "ideal-customers") return <IdealCustomersSlide />;
        if (slide.id === "delivery-model") return <DeliveryModelSlide />;
        if (slide.id === "differentiation") return <DifferentiationSlide />;
        if (slide.id === "revenue") return <RevenueSlide />;
        if (slide.id === "joint-rollout") return <JointRolloutSlide />;
        if (slide.id === "close") return <CloseSlide />;
        return null;
      }}
    />
  );
}
