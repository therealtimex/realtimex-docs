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
    eyebrow: "Product Demo Flow",
    title: "Demo RealTimeX as one connected workflow, not a long feature tour.",
    accent: "coral",
  },
  {
    id: "setup",
    eyebrow: "Before The Demo",
    title: "Prepare one workspace with real context, one visible workflow, and one live proof point.",
    accent: "blue",
  },
  {
    id: "opening",
    eyebrow: "Step 1",
    title: "Start in chat with a grounded question that proves RealTimeX understands real context.",
    accent: "mint",
  },
  {
    id: "meetings",
    eyebrow: "Step 2",
    title: "Show meetings and follow-up because they make the product feel attached to operational work.",
    accent: "gold",
  },
  {
    id: "goals",
    eyebrow: "Step 3",
    title: "Promote work into goals and ambient follow-up so the story moves beyond one-off prompting.",
    accent: "violet",
  },
  {
    id: "runtime",
    eyebrow: "Step 4",
    title: "Show controlled execution with agent runtime, browser tasks, or MCP when action is the differentiator.",
    accent: "coral",
  },
  {
    id: "governance",
    eyebrow: "Step 5",
    title: "Land the control story with prompts, credentials, plugins, channels, and admin surfaces.",
    accent: "blue",
  },
  {
    id: "deployment",
    eyebrow: "Step 6",
    title: "Match the deployment model to the buyer instead of forcing a single architecture story.",
    accent: "mint",
  },
  {
    id: "close",
    eyebrow: "Close",
    title: "End with one pilot workflow, one deployment path, and one concrete next step.",
    accent: "gold",
  },
];

function HeroSlide() {
  return (
    <div className="slide-grid hero-grid">
      <div className="hero-copy">
        <div className="eyebrow">Product Demo Flow</div>
        <h1>
          Demo RealTimeX as one connected workflow, not a long feature tour.
        </h1>
        <p className="hero-summary">
          The strongest demo is a short path from real context to visible
          action, with one clear deployment story and one next step.
        </p>
        <div className="hero-tags">
          {[
            "15-minute flow",
            "One real problem",
            "One workspace",
            "One proof of execution",
            "One deployment fit",
            "One pilot ask",
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
        <div className="panel-title">Demo target</div>
        <div className="metric-stack">
          <div className="metric-card fragment fade-up" data-fragment-index={1}>
            <span className="metric-number">15</span>
            <span className="metric-label">minutes to show the full product story</span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={2}>
            <span className="metric-number">1</span>
            <span className="metric-label">connected workflow instead of a feature checklist</span>
          </div>
          <div className="metric-card fragment fade-up" data-fragment-index={3}>
            <span className="metric-number">1</span>
            <span className="metric-label">next step the buyer can say yes to</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetupSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Before The Demo</div>
        <h2>
          Prepare one workspace with real context, one visible workflow, and
          one live proof point.
        </h2>
        <p className="slide-copy">
          Do not demo against empty space. The product is strongest when the
          viewer can see real documents, meetings, goals, or execution surfaces
          connected in one place.
        </p>
      </div>
      <div className="card-grid">
        {[
          [
            "Use real context",
            "Load documents, notes, or meeting evidence that resembles the customer's actual working environment.",
          ],
          [
            "Pre-connect one live surface",
            "Calendar, Meeting Minutes, a channel, or one runtime tool is enough to make the story tangible.",
          ],
          [
            "Keep permissions ready",
            "Make sure credentials, plugins, prompts, or runtime approvals are already configured before the demo.",
          ],
          [
            "Avoid fake complexity",
            "It is better to show one crisp workflow well than six disconnected screens with no narrative.",
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

function OpeningSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Step 1</div>
        <h2>
          Start in chat with a grounded question that proves RealTimeX
          understands real context.
        </h2>
        <p className="slide-copy">
          Open with a question whose answer should depend on the uploaded
          context, not just general model knowledge. Then point at citations,
          follow-up suggestions, or linked materials.
        </p>
      </div>
      <div className="comparison-panel">
        <div className="comparison-card">
          <span className="comparison-label">Good opener</span>
          <ul>
            <li>Ask about a real document, account, project, or meeting</li>
            <li>Show citations and grounded retrieval</li>
            <li>Use the answer to transition into action</li>
          </ul>
        </div>
        <div className="comparison-card featured">
          <span className="comparison-label">Why it works</span>
          <ul>
            <li>It proves the system can read context, not just chat fluently</li>
            <li>It creates credibility before you show automation or agents</li>
            <li>It gives you a natural bridge into meetings, goals, or runtime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MeetingsSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Step 2</div>
        <h2>
          Show meetings and follow-up because they make the product feel
          attached to operational work.
        </h2>
      </div>
      <div className="use-case-list">
        {[
          [
            "Show the meeting artifact",
            "Open a Meeting Minutes record with transcript, synthesis, or extracted action items.",
          ],
          [
            "Show the before-and-after",
            "Explain how the meeting content becomes usable follow-up instead of staying trapped in notes or recordings.",
          ],
          [
            "Connect it to the next workflow",
            "Use the meeting output to prep the next call, answer a question, or create a goal.",
          ],
          [
            "Keep it concrete",
            "The viewer should leave understanding what happens after the meeting, not only that a transcript exists.",
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

function GoalsSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Step 3</div>
        <h2>
          Promote work into goals and ambient follow-up so the story moves
          beyond one-off prompting.
        </h2>
        <p className="slide-copy">
          This is where the demo shifts from "AI answered a question" to "AI is
          staying attached to a real piece of work over time."
        </p>
      </div>
      <div className="feature-columns">
        {[
          {
            title: "Thread to goal",
            points: [
              "Take a relevant thread and show how it becomes a tracked goal.",
              "Use a goal that obviously deserves follow-up, not an abstract task.",
              "Point out status, consultations, and linked context.",
            ],
          },
          {
            title: "Ambient dashboard",
            points: [
              "Open the Goals or Ambient view and show that work can be monitored, reviewed, and resumed.",
              "Emphasize continuity, not just creation.",
              "Use this to explain why RealTimeX is more than chat history.",
            ],
          },
          {
            title: "Operational narrative",
            points: [
              "Tie the goal back to meetings, notes, or a runtime task.",
              "Explain what the system should keep track of next.",
              "Leave the audience with a clear sense of ongoing assistance.",
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

function RuntimeSlide() {
  return (
    <div className="slide-grid two-column-grid">
      <div>
        <div className="eyebrow">Step 4</div>
        <h2>
          Show controlled execution with agent runtime, browser tasks, or MCP
          when action is the differentiator.
        </h2>
        <p className="slide-copy">
          Only show this if the buyer cares about execution. When it matters,
          it is one of the clearest differentiators in the product.
        </p>
      </div>
      <div className="card-grid">
        {[
          [
            "Use one action path",
            "Pick browser automation, MCP tools, or an agentic CLI. Do not stack all of them into one demo segment.",
          ],
          [
            "Keep it safe",
            "If approvals or moderation matter, call them out as control features rather than friction.",
          ],
          [
            "Stay outcome-focused",
            "Frame the execution step around a customer task the viewer recognizes immediately.",
          ],
          [
            "Return to narrative",
            "After the action, tie the result back into the workspace so the demo stays coherent.",
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

function GovernanceSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Step 5</div>
        <h2>
          Land the control story with prompts, credentials, plugins, channels,
          and admin surfaces.
        </h2>
      </div>
      <div className="platform-grid">
        {[
          ["Prompts and behavior", "Show slash commands, system prompts, or personality files when the buyer cares about standardized AI behavior."],
          ["Credentials and auth", "Explain that tool access, agent auth, and API setup can be managed instead of hidden in ad hoc scripts."],
          ["Plugins and channels", "Use them to show extensibility only when they support the customer story you opened with."],
          ["Users and workspaces", "Point out that the system is built for teams, not just one local operator window."],
          ["Security and logs", "Bring up controls, logs, and settings when governance or auditability is part of the buying criteria."],
          ["Admin confidence", "This segment tells buyers how they would actually operate the product after the pilot."],
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

function DeploymentSlide() {
  return (
    <div className="slide-grid stacked-grid">
      <div>
        <div className="eyebrow">Step 6</div>
        <h2>
          Match the deployment model to the buyer instead of forcing a single
          architecture story.
        </h2>
      </div>
      <div className="deployment-grid">
        {[
          ["Desktop-first", "Best when the buyer wants fast pilots, local context, or operator-led rollout."],
          ["Cloud collaboration", "Best when the buyer wants shared access, centralized management, and broader team adoption."],
          ["Hybrid path", "Best when the buyer wants shared workflows but needs local models, local execution, or stronger control boundaries."],
          ["Provider flexibility", "Call out local, hosted, and OpenAI-compatible provider choices when that matters in evaluation."],
        ].map(([title, body]) => (
          <div key={title} className="deck-card">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="deck-banner">
        The deployment story should feel like a fit for the buyer's reality,
        not a constraint they need to work around.
      </div>
    </div>
  );
}

function CloseSlide() {
  return (
    <div className="slide-grid close-grid">
      <div>
        <div className="eyebrow">Close</div>
        <h2>
          End with one pilot workflow, one deployment path, and one concrete
          next step.
        </h2>
        <p className="hero-summary">
          A strong close turns the demo into a defined evaluation plan instead
          of a generic "let us know what you think."
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

export default function ProductDemoFlowPresentation() {
  return (
    <PresentationDeck
      pageTitle="Product Demo Flow | RealTimeX Presentation"
      pageDescription="A hidden presentation route for internal or partner-led RealTimeX product demos."
      pagePath="/presentations/product-demo-flow/"
      slides={slides}
      renderSlide={(slide) => {
        if (slide.id === "hero") return <HeroSlide />;
        if (slide.id === "setup") return <SetupSlide />;
        if (slide.id === "opening") return <OpeningSlide />;
        if (slide.id === "meetings") return <MeetingsSlide />;
        if (slide.id === "goals") return <GoalsSlide />;
        if (slide.id === "runtime") return <RuntimeSlide />;
        if (slide.id === "governance") return <GovernanceSlide />;
        if (slide.id === "deployment") return <DeploymentSlide />;
        if (slide.id === "close") return <CloseSlide />;
        return null;
      }}
    />
  );
}
