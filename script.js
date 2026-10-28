(() => {
  "use strict";

  const finder = document.getElementById("finder");
  if (!finder) return;

  const state = {
    step: 1,
    goal: "",
    challenge: "",
    stage: "",
    investment: "",
    error: "",
    copied: false
  };

  const goals = [
    {
      id: "automation",
      icon: "✳",
      title: "Automate a business process",
      detail: "Reduce repetitive work with AI, agents, or connected workflows."
    },
    {
      id: "product",
      icon: "⌘",
      title: "Build a digital product",
      detail: "Create a website, application, platform, or SaaS product."
    },
    {
      id: "scale",
      icon: "⌁",
      title: "Improve or scale technology",
      detail: "Strengthen backend systems, cloud infrastructure, or an existing product."
    },
    {
      id: "growth",
      icon: "↗",
      title: "Improve digital growth",
      detail: "Get found online, improve conversion, or make marketing more effective."
    }
  ];

  const challenges = {
    automation: [
      {
        id: "manual",
        title: "Too much manual work",
        detail: "People repeat the same tasks, updates, or data entry."
      },
      {
        id: "support",
        title: "Slow customer response",
        detail: "Leads or customer questions need faster handling."
      },
      {
        id: "documents",
        title: "Documents and information",
        detail: "Extract, classify, or move information between systems."
      },
      {
        id: "connect",
        title: "Disconnected tools",
        detail: "Systems do not share data or trigger the right actions."
      }
    ],

    product: [
      {
        id: "idea",
        title: "Turn an idea into a first release",
        detail: "Validate the core experience before expanding features."
      },
      {
        id: "webapp",
        title: "Build a website or web app",
        detail: "Create a digital experience for customers or teams."
      },
      {
        id: "saas",
        title: "Launch a SaaS platform",
        detail: "Build accounts, workflows, dashboards, and product foundations."
      },
      {
        id: "modernize",
        title: "Improve an existing product",
        detail: "Fix usability gaps or add new capabilities to a live product."
      }
    ],

    scale: [
      {
        id: "performance",
        title: "Performance or reliability",
        detail: "Improve speed, uptime, monitoring, or resilience."
      },
      {
        id: "cloud",
        title: "Cloud and deployment",
        detail: "Plan infrastructure, deployment, or cloud migration."
      },
      {
        id: "backend",
        title: "Backend or API foundations",
        detail: "Design reliable data models, APIs, and integrations."
      },
      {
        id: "legacy",
        title: "Modernize older systems",
        detail: "Reduce technical debt and make systems easier to evolve."
      }
    ],

    growth: [
      {
        id: "seo",
        title: "Improve search visibility",
        detail: "Address technical SEO and organic discovery."
      },
      {
        id: "leads",
        title: "Generate better leads",
        detail: "Improve campaign performance and lead capture."
      },
      {
        id: "conversion",
        title: "Convert more visitors",
        detail: "Improve landing pages, funnels, and user journeys."
      },
      {
        id: "crm",
        title: "Follow up consistently",
        detail: "Connect CRM workflows and nurture interested prospects."
      }
    ]
  };

  const serviceMap = {
    automation: {
      name: "AI & Workflow Automation",
      summary:
        "Start by choosing one repetitive process and defining how success will be measured. Cynbit describes work across autonomous agents, LLM automation, AI voice agents, and AI stack integration.",
      url: "https://www.cynbit.in/services",
      next: [
        "Map the current process and its hand-offs.",
        "Identify the data and tools the workflow depends on.",
        "Choose a small, measurable first automation and define human review points."
      ],
      challengeTips: {
        manual:
          "Prioritize a high-volume task with clear inputs and outputs.",
        support:
          "Map the most common enquiries and decide when a human should take over.",
        documents:
          "Start with a small, representative document set and verify extraction accuracy.",
        connect:
          "List the systems, triggers, and data that need to move between them."
      }
    },

    product: {
      name: "Custom Software & Product Development",
      summary:
        "Begin with the user problem, the smallest useful feature set, and a release plan. Cynbit lists full-stack web and mobile platforms, backend systems, and custom software among its capabilities.",
      url: "https://www.cynbit.in/services",
      next: [
        "Define the primary user and the problem they need solved.",
        "Separate must-have launch features from later enhancements.",
        "Agree on a first-release scope, success measure, and technical foundations."
      ],
      challengeTips: {
        idea:
          "Write a one-sentence problem statement and test the riskiest assumption first.",
        webapp:
          "Sketch the main user journey and the screens needed to complete it.",
        saas:
          "Define roles, core workflows, data ownership, and the first use case.",
        modernize:
          "Review user feedback and usage friction before choosing new features."
      }
    },

    scale: {
      name: "Backend, Cloud & Infrastructure",
      summary:
        "Start with the current architecture and the biggest operational risk. Cynbit lists backend systems, AWS/Azure cloud infrastructure, and legacy modernization among its capabilities.",
      url: "https://www.cynbit.in/services",
      next: [
        "Document the current system, dependencies, and critical user journeys.",
        "Identify the bottleneck using logs, metrics, or a focused technical audit.",
        "Prioritize a low-risk change with clear reliability or performance criteria."
      ],
      challengeTips: {
        performance:
          "Measure current response times and error rates before changing architecture.",
        cloud:
          "Inventory workloads, access controls, backup needs, and deployment steps.",
        backend:
          "Map key entities, API consumers, validation rules, and failure states.",
        legacy:
          "Identify the highest-risk dependency and modernize incrementally."
      }
    },

    growth: {
      name: "Digital Growth & Technical SEO",
      summary:
        "Start by identifying the funnel stage that is underperforming and how you will measure it. Cynbit lists technical SEO, performance ads, CRM automation, and funnel optimization among its services.",
      url: "https://www.cynbit.in/services",
      next: [
        "Define the audience and the conversion action that matters.",
        "Review current traffic, search visibility, or lead-conversion data.",
        "Choose one experiment and track a baseline before measuring change."
      ],
      challengeTips: {
        seo:
          "Review crawlability, indexing, page structure, and technical performance.",
        leads:
          "Define a qualified lead and review source, cost, and conversion quality.",
        conversion:
          "Find where users abandon the journey and test one focused improvement.",
        crm:
          "Map lead stages, ownership, follow-up timing, and hand-off rules."
      }
    }
  };

  const stageLabels = {
    idea: "Idea / planning",
    early: "Early-stage business",
    established: "Established business",
    enterprise: "Larger team / enterprise"
  };

  const investmentLabels = {
    lean: "Lean first step",
    moderate: "Defined project",
    scale: "Larger implementation",
    unsure: "Need help scoping"
  };

  function goalById(id) {
    return goals.find((item) => item.id === id);
  }

  function challengeById() {
    return (challenges[state.goal] || []).find(
      (item) => item.id === state.challenge
    );
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function progress() {
    const labels = [
      "Choose your goal",
      "Pinpoint the challenge",
      "Your starting plan"
    ];

    return `
      <div class="step-meta">
        <span><strong>STEP 0${state.step} OF 03</strong></span>
        <span>${labels[state.step - 1]}</span>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        aria-label="Questionnaire progress"
        aria-valuemin="1"
        aria-valuemax="3"
        aria-valuenow="${state.step}"
      >
        <div
          class="progress-fill"
          style="width:${state.step / 3 * 100}%"
        ></div>
      </div>
    `;
  }

  function choiceMarkup(items, selected, action) {
    return `
      <div class="choice-grid">
        ${items.map((item) => `
          <button
            type="button"
            class="choice"
            data-action="${action}"
            data-value="${item.id}"
            aria-pressed="${selected === item.id}"
          >
            <span class="choice-icon" aria-hidden="true">
              ${item.icon || "◇"}
            </span>

            <span class="choice-copy">
              <strong>${escapeHTML(item.title)}</strong>
              <small>${escapeHTML(item.detail)}</small>
            </span>

            <span class="choice-check" aria-hidden="true">✓</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function errorMarkup() {
    return state.error
      ? `<p class="field-error" role="alert">${escapeHTML(state.error)}</p>`
      : "";
  }

  function renderGoal() {
    return `
      ${progress()}

      <h3 class="question-title">
        What are you trying to achieve?
      </h3>

      <p class="question-help">
        Choose the outcome closest to what you need.
        You can refine it in the next step.
      </p>

      ${choiceMarkup(goals, state.goal, "goal")}

      ${errorMarkup()}

      <div class="wizard-actions">
        <span class="step-footnote">
          Choose one option to continue.
        </span>

        <div class="button-group">
          <button
            class="primary-button"
            type="button"
            data-action="next"
            ${state.goal ? "" : "disabled"}
          >
            Continue <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderChallenge() {
    const currentGoal = goalById(state.goal);

    const icons = {
      manual: "↻",
      support: "◌",
      documents: "▤",
      connect: "⌘",
      idea: "✳",
      webapp: "▣",
      saas: "▦",
      modernize: "↗",
      performance: "ϟ",
      cloud: "☁",
      backend: "⌘",
      legacy: "◫",
      seo: "⌕",
      leads: "↗",
      conversion: "◎",
      crm: "⇄"
    };

    const items = (challenges[state.goal] || []).map((item) => ({
      ...item,
      icon: icons[item.id]
    }));

    return `
      ${progress()}

      <h3 class="question-title">
        What is the main challenge?
      </h3>

      <p class="question-help">
        For <strong>${escapeHTML(currentGoal.title.toLowerCase())}</strong>,
        pick the issue you most want to solve first.
      </p>

      ${choiceMarkup(items, state.challenge, "challenge")}

      <div class="field-grid" style="margin-top:22px">
        <div class="field-group">
          <label for="stage">Where is your business today?</label>
          <p class="field-description">This helps size the first step.</p>

          <select id="stage">
            <option value="">Choose a stage</option>
            ${Object.entries(stageLabels).map(([value, label]) => `
              <option
                value="${value}"
                ${state.stage === value ? "selected" : ""}
              >${label}</option>
            `).join("")}
          </select>
        </div>

        <div class="field-group">
          <label for="investment">How would you like to approach it?</label>
          <p class="field-description">No exact budget needed.</p>

          <select id="investment">
            <option value="">Choose an approach</option>
            ${Object.entries(investmentLabels).map(([value, label]) => `
              <option
                value="${value}"
                ${state.investment === value ? "selected" : ""}
              >${label}</option>
            `).join("")}
          </select>
        </div>
      </div>

      ${errorMarkup()}

      <div class="wizard-actions">
        <button
          class="secondary-button"
          type="button"
          data-action="back"
        >
          ← Back
        </button>

        <div class="button-group">
          <button
            class="primary-button"
            type="button"
            data-action="result"
          >
            Build my starting plan <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    `;
  }

  function adaptNextSteps(service) {
    const steps = [...service.next];
    const challenge = challengeById();

    if (challenge && service.challengeTips[state.challenge]) {
      steps[0] = service.challengeTips[state.challenge];
    }

    if (state.investment === "lean") {
      steps[2] =
        "Keep the first step narrow: validate one workflow or user journey before expanding scope.";
    }

    if (state.investment === "moderate") {
      steps[2] =
        "Turn the agreed scope into milestones, owners, acceptance criteria, and a delivery plan.";
    }

    if (state.investment === "scale") {
      steps[2] =
        "Plan for integration, security, observability, ownership, and staged rollout from the beginning.";
    }

    if (state.investment === "unsure") {
      steps[2] =
        "Use a discovery conversation to estimate complexity and compare phased options before setting a budget.";
    }

    if (state.stage === "idea") {
      steps[1] =
        "Validate the core assumption with a small proof of value before committing to a larger build.";
    }

    if (state.stage === "enterprise") {
      steps[1] =
        "Include stakeholders, existing systems, security requirements, and change management in discovery.";
    }

    return steps;
  }

  function makeBrief() {
    const goal = goalById(state.goal);
    const challenge = challengeById();
    const service = serviceMap[state.goal];

    return [
      "CYNBIT — PROJECT DISCOVERY BRIEF",
      "=================================",
      `Goal: ${goal.title}`,
      `Primary challenge: ${challenge ? challenge.title : "Not specified"}`,
      `Business stage: ${stageLabels[state.stage]}`,
      `Preferred approach: ${investmentLabels[state.investment]}`,
      `Suggested service area: ${service.name}`,
      "",
      "Suggested first steps:",
      ...adaptNextSteps(service).map(
        (step, index) => `${index + 1}. ${step}`
      ),
      "",
      "Note: This is a preliminary direction based on the answers provided, not a quote or commitment to deliver a specific service.",
      "Prepared with Cynbit Solution Finder"
    ].join("\n");
  }

  function renderResult() {
    const goal = goalById(state.goal);
    const challenge = challengeById();
    const service = serviceMap[state.goal];
    const steps = adaptNextSteps(service);

    return `
      ${progress()}

      <div class="result-intro">
        <div class="result-icon" aria-hidden="true">✳</div>

        <div>
          <p class="result-kicker">YOUR SUGGESTED DIRECTION</p>
          <h3 class="result-title">${escapeHTML(service.name)}</h3>
          <p class="result-summary">${escapeHTML(service.summary)}</p>
        </div>
      </div>

      <span class="match-tag">
        <span aria-hidden="true">✓</span>
        Matched to your selected challenge
      </span>

      <div class="result-columns">
        <section class="result-panel">
          <p class="panel-label">Why this direction</p>
          <h3>${escapeHTML(challenge ? challenge.title : goal.title)}</h3>
          <p>
            ${escapeHTML(
              service.challengeTips[state.challenge] ||
              "Start by defining the outcome you want to improve and the evidence that will show progress."
            )}
          </p>
        </section>

        <section class="result-panel">
          <p class="panel-label">Your recommended first steps</p>

          <ul class="result-list">
            ${steps.map((step) => `
              <li>${escapeHTML(step)}</li>
            `).join("")}
          </ul>
        </section>
      </div>

      <div class="result-meta">
        <div class="meta-item">
          <span>Your goal</span>
          <strong>${escapeHTML(goal.title)}</strong>
        </div>

        <div class="meta-item">
          <span>Business stage</span>
          <strong>${escapeHTML(stageLabels[state.stage])}</strong>
        </div>

        <div class="meta-item">
          <span>Preferred approach</span>
          <strong>${escapeHTML(investmentLabels[state.investment])}</strong>
        </div>
      </div>

      <div class="result-actions">
        <button
          class="primary-button"
          type="button"
          data-action="copy"
        >
          Copy project brief ↗
        </button>

        <a
          class="secondary-button"
          style="display:inline-flex;align-items:center;text-decoration:none"
          href="${service.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore service details ↗
        </a>

        <a
          class="secondary-button"
          style="display:inline-flex;align-items:center;text-decoration:none"
          href="${makeContactUrl()}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email project brief ↗
        </a>

        <button
          class="secondary-button"
          type="button"
          data-action="edit"
        >
          Edit answers
        </button>
      </div>

      <p id="copy-status" class="status-message" role="status">
        ${state.copied ? "Project brief copied to clipboard." : ""}
      </p>

      <details class="brief-details">
        <summary>Preview your project brief</summary>
        <pre class="brief-preview">${escapeHTML(makeBrief())}</pre>
      </details>

      <p class="question-help" style="margin:16px 0 0">
        This is an initial direction, not a quote or guarantee of service
        availability. Confirm the scope with Cynbit before making project decisions.
      </p>
    `;
  }

  function makeContactUrl() {
    const goal = goalById(state.goal);

    const subject = encodeURIComponent(
      "Project discovery — " + (goal?.title || "Cynbit Solution Finder")
    );

    const body = encodeURIComponent(makeBrief());

    return `mailto:opportunities@cynbit.in?subject=${subject}&body=${body}`;
  }

  function render() {
    const focusTarget =
      state.step === 1
        ? ".question-title"
        : state.step === 2
          ? ".question-title"
          : ".result-title";

    finder.innerHTML =
      state.step === 1
        ? renderGoal()
        : state.step === 2
          ? renderChallenge()
          : renderResult();

    const target = finder.querySelector(focusTarget);

    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }

  finder.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    state.error = "";
    state.copied = false;

    if (action === "goal") {
      state.goal = button.dataset.value;
      state.challenge = "";
      render();
      return;
    }

    if (action === "challenge") {
      state.challenge = button.dataset.value;
      render();
      return;
    }

    if (action === "next") {
      if (!state.goal) {
        state.error =
          "Choose the goal that best matches your needs to continue.";
        render();
        return;
      }

      state.step = 2;
      render();
      return;
    }

    if (action === "back") {
      state.step = Math.max(1, state.step - 1);
      render();
      return;
    }

    if (action === "result") {
      state.stage = document.getElementById("stage")?.value || "";
      state.investment =
        document.getElementById("investment")?.value || "";

      if (!state.challenge || !state.stage || !state.investment) {
        state.error = !state.challenge
          ? "Choose the main challenge, then complete both fields below."
          : "Please choose a business stage and an approach so the plan can be tailored.";

        render();
        return;
      }

      state.step = 3;
      render();
      return;
    }

    if (action === "edit") {
      state.step = 2;
      render();
      return;
    }

    if (action === "copy") {
      const brief = makeBrief();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(brief);
        } else {
          const textArea = document.createElement("textarea");

          textArea.value = brief;
          textArea.setAttribute("readonly", "");
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";

          document.body.appendChild(textArea);
          textArea.select();

          const successful = document.execCommand("copy");
          textArea.remove();

          if (!successful) {
            throw new Error("Copy unavailable");
          }
        }

        state.copied = true;

        const status = document.getElementById("copy-status");

        if (status) {
          status.textContent =
            "Project brief copied. You can paste it into your notes or message to Cynbit.";
        }
      } catch (_) {
        const status = document.getElementById("copy-status");

        if (status) {
          status.textContent =
            "Copy was blocked by this browser. Open the brief preview below and copy the text manually.";
        }
      }
    }
  });

  render();
})();