(() => {
  const content = window.SiteContent;
  if (!content) return;

  const getCssVar = (name, fallback) => {
    const value = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return value || fallback;
  };

  const navLinks = document.getElementById("nav-links");
  const mobileDock = document.getElementById("mobile-dock");

  const buildImageLink = (href, src, label, className = "img-link") => {
    const link = document.createElement("a");
    link.href = href;
    link.className = className;
    link.setAttribute("aria-label", label);
    const img = document.createElement("img");
    img.src = src;
    img.alt = label;
    link.appendChild(img);
    return link;
  };

  const buildTextLink = (href, label, className = "nav-pill") => {
    const link = document.createElement("a");
    link.href = href;
    link.className = className;
    link.textContent = label;
    link.setAttribute("aria-label", label);
    return link;
  };

  content.nav.forEach((item) => {
    const href = item.href.startsWith("#") ? `index.html${item.href}` : item.href;
    const link = buildTextLink(href, item.label, "nav-pill");
    if (item.id === "apply") link.classList.add("is-primary");
    navLinks.appendChild(link);
    const dockLink = buildTextLink(href, item.label, "nav-pill");
    if (item.id === "apply") dockLink.classList.add("is-primary");
    mobileDock.appendChild(dockLink);
  });

  const brandLink = document.querySelector("nav.top-nav a.img-link");
  const brandImg = document.querySelector(".brand-mark");
  if (brandLink) brandLink.setAttribute("aria-label", content.accessibility.homeLabel);
  if (brandImg) brandImg.alt = content.brand.name;
  const fixedApply = document.querySelector(".fixed-apply");
  if (fixedApply) {
    fixedApply.setAttribute("aria-label", content.accessibility.applyNowLabel);
    const img = fixedApply.querySelector("img");
    if (img) img.alt = content.finalCta.applyLabel;
  }

  document.getElementById("apply-headline").textContent = content.apply.headline;
  document.getElementById("apply-subhead").textContent = content.apply.sentence;
  document.getElementById("apply-note").textContent = content.apply.note;

  const form = document.getElementById("apply-form");
  const formPlane = document.getElementById("form-plane");
  const stepPills = document.getElementById("wizard-steps");

  const state = {
    stepIndex: 0,
    values: {
      role: "",
      spotifyNotLive: false,
      mediaTypes: [],
      interests: [],
      labelAffiliation: "No",
      billingOption: "",
    },
    errors: {},
    sending: false,
    submitted: false,
  };

  const updateStepPills = () => {
    stepPills.innerHTML = "";
    const focusRing = getCssVar("--focus-ring", "rgba(95, 214, 230, 0.6)");
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Application steps");
    content.apply.steps.forEach((step, index) => {
      const pill = document.createElement("div");
      pill.className = "glass-plane step-pill";
      pill.textContent = `${index + 1}. ${step.title}`;
      if (index === state.stepIndex) {
        pill.style.borderColor = focusRing;
        pill.setAttribute("aria-current", "step");
      }
      nav.appendChild(pill);
    });
    stepPills.appendChild(nav);
  };

  const createField = ({ id, label, type, required = false, value = "" }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = label;
    const input = document.createElement("input");
    input.id = id;
    input.name = id;
    input.type = type;
    input.value = value || "";
    input.required = required;
    if (required) input.setAttribute("aria-required", "true");
    const errId = `err-${id}`;
    input.setAttribute("aria-describedby", errId);
    if (state.errors[id]) input.setAttribute("aria-invalid", "true");
    input.addEventListener("input", () => {
      state.values[id] = input.value.trim();
      state.errors[id] = "";
      error.textContent = "";
      input.removeAttribute("aria-invalid");
    });
    const error = document.createElement("div");
    error.id = errId;
    error.className = "error-text";
    error.textContent = state.errors[id] || "";
    wrapper.appendChild(labelEl);
    wrapper.appendChild(input);
    wrapper.appendChild(error);
    return wrapper;
  };

  const createSelect = ({ id, label, options, required = false, value = "" }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = label;
    const select = document.createElement("select");
    select.id = id;
    select.name = id;
    select.required = required;
    if (required) select.setAttribute("aria-required", "true");
    const errId = `err-${id}`;
    select.setAttribute("aria-describedby", errId);
    if (state.errors[id]) select.setAttribute("aria-invalid", "true");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select";
    select.appendChild(placeholder);
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      if (option === value) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      state.values[id] = select.value;
      state.errors[id] = "";
      error.textContent = "";
      select.removeAttribute("aria-invalid");
    });
    const error = document.createElement("div");
    error.id = errId;
    error.className = "error-text";
    error.textContent = state.errors[id] || "";
    wrapper.appendChild(labelEl);
    wrapper.appendChild(select);
    wrapper.appendChild(error);
    return wrapper;
  };

  const createTextarea = ({ id, label, maxLength }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = label;
    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.name = id;
    if (maxLength) textarea.maxLength = maxLength;
    textarea.value = state.values[id] || "";
    const errId = `err-${id}`;
    textarea.setAttribute("aria-describedby", errId);
    if (state.errors[id]) textarea.setAttribute("aria-invalid", "true");
    textarea.addEventListener("input", () => {
      state.values[id] = textarea.value.trim();
      state.errors[id] = "";
      error.textContent = "";
      textarea.removeAttribute("aria-invalid");
    });
    const error = document.createElement("div");
    error.id = errId;
    error.className = "error-text";
    error.textContent = state.errors[id] || "";
    wrapper.appendChild(labelEl);
    wrapper.appendChild(textarea);
    wrapper.appendChild(error);
    return wrapper;
  };

  const createCheckbox = ({ id, label, checked = false, reRender = false }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const group = document.createElement("div");
    group.className = "inline-options";
    const item = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.checked = checked;
    input.addEventListener("change", () => {
      state.values[id] = input.checked;
      state.errors[id] = "";
      error.textContent = "";
      if (reRender) renderStep();
    });
    const span = document.createElement("span");
    span.textContent = label;
    item.appendChild(input);
    item.appendChild(span);
    group.appendChild(item);
    const error = document.createElement("div");
    error.className = "error-text";
    error.textContent = state.errors[id] || "";
    wrapper.appendChild(group);
    wrapper.appendChild(error);
    return wrapper;
  };

  const createCheckboxGroup = ({ id, label, options }) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "field field-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    fieldset.appendChild(legend);
    const group = document.createElement("div");
    group.className = "inline-options";
    const selected = new Set(state.values[id] || []);
    options.forEach((option, optIndex) => {
      const optId = `${id}-${optIndex}`;
      const item = document.createElement("label");
      item.setAttribute("for", optId);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = optId;
      input.checked = selected.has(option);
      input.addEventListener("change", () => {
        if (input.checked) {
          selected.add(option);
        } else {
          selected.delete(option);
        }
        state.values[id] = Array.from(selected);
      });
      const span = document.createElement("span");
      span.textContent = option;
      item.appendChild(input);
      item.appendChild(span);
      group.appendChild(item);
    });
    fieldset.appendChild(group);
    return fieldset;
  };

  const createRadioGroup = ({ id, label, options }) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "field field-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    fieldset.appendChild(legend);
    const group = document.createElement("div");
    group.className = "inline-options";
    options.forEach((option, optIndex) => {
      const optId = `${id}-${optIndex}`;
      const item = document.createElement("label");
      item.setAttribute("for", optId);
      const input = document.createElement("input");
      input.type = "radio";
      input.id = optId;
      input.name = id;
      input.value = option;
      input.checked = state.values[id] === option;
      input.addEventListener("change", () => {
        state.values[id] = option;
        state.errors[id] = "";
        error.textContent = "";
      });
      const span = document.createElement("span");
      span.textContent = option;
      item.appendChild(input);
      item.appendChild(span);
      group.appendChild(item);
    });
    const error = document.createElement("div");
    error.className = "error-text";
    error.textContent = state.errors[id] || "";
    fieldset.appendChild(group);
    fieldset.appendChild(error);
    return fieldset;
  };

  const createHoneypot = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "hidden";
    wrapper.setAttribute("aria-hidden", "true");
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", "website");
    labelEl.textContent = "Leave this field empty";
    const input = document.createElement("input");
    input.type = "text";
    input.name = "website";
    input.id = "website";
    input.autocomplete = "off";
    wrapper.appendChild(labelEl);
    wrapper.appendChild(input);
    return wrapper;
  };

  const validateStep = (step) => {
    const errors = {};
    if (step.id === "identity") {
      step.fields.forEach((field) => {
        if (field.required && !state.values[field.id]) {
          errors[field.id] = "Required";
        }
      });
      if (!state.values.role) {
        errors.role = "Required";
      }
    }
    if (step.id === "presence") {
      if (!state.values.youtube) errors.youtube = "Required";
      if (!state.values.tiktok) errors.tiktok = "Required";
    }
    if (step.id === "rights") {
      if (!state.values.rightsCheck) errors.rightsCheck = "Required";
      if (state.values.labelAffiliation === "Yes" && !state.values.labelName) {
        errors.labelName = "Required";
      }
      if (!state.values.billingOption) errors.billingOption = "Required";
    }
    state.errors = { ...state.errors, ...errors };
    return Object.keys(errors).length === 0;
  };

  const renderStep = () => {
    updateStepPills();
    const step = content.apply.steps[state.stepIndex];
    formPlane.innerHTML = "";

    const header = document.createElement("h2");
    header.textContent = step.title;
    header.tabIndex = -1;
    formPlane.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "form-grid";

    if (step.id === "identity") {
      step.fields.forEach((field) => {
        grid.appendChild(
          createField({
            ...field,
            value: state.values[field.id],
          })
        );
      });
      grid.appendChild(
        createSelect({
          id: "role",
          label: step.role.label,
          options: step.role.options,
          required: true,
          value: state.values.role,
        })
      );
      formPlane.appendChild(grid);
    }

    if (step.id === "presence") {
      step.fields.forEach((field) => {
        if (field.id === "spotify") {
          const wrapper = createField({
            ...field,
            required: false,
            value: state.values.spotify,
          });
          const input = wrapper.querySelector("input");
          input.disabled = state.values.spotifyNotLive;
          grid.appendChild(wrapper);
          return;
        }
        grid.appendChild(
          createField({
            ...field,
            value: state.values[field.id],
          })
        );
      });
      formPlane.appendChild(grid);
      formPlane.appendChild(
        createCheckbox({
          id: step.spotifyNotLive.id,
          label: step.spotifyNotLive.label,
          checked: state.values.spotifyNotLive,
          reRender: true,
        })
      );
      formPlane.appendChild(
        createTextarea({
          id: step.bio.id,
          label: step.bio.label,
          maxLength: step.bio.maxLength,
        })
      );
      formPlane.appendChild(
        createTextarea({
          id: step.releases.id,
          label: step.releases.label,
        })
      );
    }

    if (step.id === "rights") {
      formPlane.appendChild(
        createCheckbox({
          id: step.rights.id,
          label: step.rights.label,
          checked: state.values.rightsCheck,
        })
      );
      formPlane.appendChild(
        createSelect({
          id: step.labelAffiliation.id,
          label: step.labelAffiliation.label,
          options: step.labelAffiliation.options,
          value: state.values.labelAffiliation,
        })
      );
      formPlane.appendChild(
        createField({
          id: step.labelName.id,
          label: step.labelName.label,
          type: "text",
          required: state.values.labelAffiliation === "Yes",
          value: state.values.labelName,
        })
      );
      formPlane.appendChild(
        createCheckboxGroup({
          id: step.mediaTypes.id,
          label: step.mediaTypes.label,
          options: step.mediaTypes.options,
        })
      );
      formPlane.appendChild(
        createCheckboxGroup({
          id: step.interests.id,
          label: step.interests.label,
          options: step.interests.options,
        })
      );
      if (step.billingOption) {
        formPlane.appendChild(
          createRadioGroup({
            id: step.billingOption.id,
            label: step.billingOption.label,
            options: step.billingOption.options,
          })
        );
      }
      formPlane.appendChild(
        createTextarea({
          id: step.goals.id,
          label: step.goals.label,
        })
      );
      formPlane.appendChild(
        createTextarea({
          id: step.notes.id,
          label: step.notes.label,
        })
      );
    }

    formPlane.appendChild(createHoneypot());

    const actions = document.createElement("div");
    actions.className = "wizard-actions";

    const status = document.createElement("div");
    status.className = "status-text";
    status.id = "status-text";
    status.setAttribute("aria-live", "polite");

    if (state.submitted) {
      status.classList.add("success-text");
      status.textContent = content.apply.actions.success;
    }

    if (state.stepIndex > 0) {
      const back = document.createElement("button");
      back.type = "button";
      back.className = "button-ghost";
      back.textContent = content.apply.actions.back;
      back.addEventListener("click", () => {
        state.stepIndex -= 1;
        renderStep();
      });
      actions.appendChild(back);
    }

    const next = document.createElement("button");
    next.type = "button";
    next.className = "button-primary";
    next.textContent =
      state.stepIndex === content.apply.steps.length - 1
        ? state.sending
          ? content.apply.actions.sending
          : content.apply.actions.submit
        : content.apply.actions.next;
    next.disabled = state.sending || state.submitted;
    next.addEventListener("click", async () => {
      const step = content.apply.steps[state.stepIndex];
      if (!validateStep(step)) {
        renderStep();
        return;
      }
      if (state.stepIndex < content.apply.steps.length - 1) {
        state.stepIndex += 1;
        renderStep();
        return;
      }

      const honeypot = form.querySelector("#website");
      if (honeypot && honeypot.value) {
        return;
      }

      const lastSubmit = Number(localStorage.getItem("artistsCafeLastSubmit") || 0);
      if (Date.now() - lastSubmit < 60000) {
        status.textContent = content.apply.actions.rateLimit;
        actions.appendChild(status);
        return;
      }

      state.sending = true;
      renderStep();

      const payload = {
        submittedAt: new Date().toISOString(),
        ...state.values,
      };

      try {
        await window.MailService.sendApplication(payload);
        localStorage.setItem("artistsCafeLastSubmit", String(Date.now()));
        state.submitted = true;
      } catch (error) {
        status.textContent = content.apply.actions.error;
      } finally {
        state.sending = false;
        renderStep();
      }
    });

    actions.appendChild(next);
    actions.appendChild(status);
    formPlane.appendChild(actions);

    const stepAnnouncement = document.getElementById("step-announcement");
    if (stepAnnouncement) {
      stepAnnouncement.textContent = `Step ${state.stepIndex + 1} of ${content.apply.steps.length}: ${step.title}`;
    }
    header.focus();

    if (state.submitted) {
      const nextSteps = document.createElement("div");
      nextSteps.className = "glass-plane";
      nextSteps.style.padding = "16px";
      const list = document.createElement("ul");
      content.apply.nextSteps.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
      nextSteps.appendChild(list);
      formPlane.appendChild(nextSteps);
    }
  };

  renderStep();

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  revealElements.forEach((el, index) => {
    const delay = (index % 6) * 80;
    el.style.transitionDelay = `${delay}ms`;
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  revealElements.forEach((el) => observer.observe(el));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.body.classList.add("reduced-motion");
    return;
  }

  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
  let pointerX = 0;
  let pointerY = 0;
  let rafId = null;

  const updateParallax = () => {
    const maxOffset = 6;
    const xOffset = (pointerX - window.innerWidth / 2) / (window.innerWidth / 2);
    const yOffset = (pointerY - window.innerHeight / 2) / (window.innerHeight / 2);
    parallaxItems.forEach((item, index) => {
      const depth = (index % 3) + 1;
      const x = xOffset * maxOffset * (depth / 3);
      const y = yOffset * maxOffset * (depth / 3);
      item.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      item.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
    rafId = null;
  };

  window.addEventListener("mousemove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!rafId) {
      rafId = window.requestAnimationFrame(updateParallax);
    }
  });

  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const particles = [];
    const stateCanvas = { width: 0, height: 0, pointerX: 0, pointerY: 0 };
    const particleColor = getCssVar("--particle-color", "rgba(95, 214, 230, 0.32)");

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      stateCanvas.width = innerWidth;
      stateCanvas.height = innerHeight;
      const count = Math.min(70, Math.floor(innerWidth / 16));
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          r: Math.random() * 1.6 + 0.6,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, stateCanvas.width, stateCanvas.height);
      ctx.fillStyle = particleColor;
      particles.forEach((p) => {
        const dx = (stateCanvas.pointerX - p.x) * 0.0008;
        const dy = (stateCanvas.pointerY - p.y) * 0.0008;
        p.x += p.vx + dx;
        p.y += p.vy + dy;
        if (p.x < 0) p.x = stateCanvas.width;
        if (p.x > stateCanvas.width) p.x = 0;
        if (p.y < 0) p.y = stateCanvas.height;
        if (p.y > stateCanvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (event) => {
      stateCanvas.pointerX = event.clientX;
      stateCanvas.pointerY = event.clientY;
    });
    window.addEventListener("scroll", () => {
      stateCanvas.pointerY = window.scrollY % stateCanvas.height;
    });

    resize();
    draw();
  }
})();
