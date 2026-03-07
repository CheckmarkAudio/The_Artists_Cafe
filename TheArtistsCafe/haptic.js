(() => {
  let audioCtx = null;

  const getCtx = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  };

  const playTone = (freq, duration, volume) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

  const haptic = (ms) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  // Profile: [freq Hz, duration s, volume 0–1, haptic ms]
  const profiles = {
    primary: [520, 0.09, 0.07, 10],
    ghost:   [360, 0.07, 0.05,  5],
    nav:     [480, 0.05, 0.04,  4],
    toggle:  [440, 0.05, 0.04,  5],
    arrow:   [400, 0.04, 0.04,  4],
    default: [420, 0.06, 0.05,  6],
  };

  const getProfile = (el) => {
    if (el.classList.contains("button-primary") || el.classList.contains("is-primary")) return profiles.primary;
    if (el.classList.contains("button-ghost"))    return profiles.ghost;
    if (el.classList.contains("nav-pill") || el.classList.contains("cta-button")) return profiles.nav;
    if (el.classList.contains("faq-toggle"))      return profiles.toggle;
    if (el.classList.contains("ad-arrow") || el.classList.contains("marquee-pause-btn")) return profiles.arrow;
    if (el.classList.contains("sidebar-toggle") || el.classList.contains("sidebar-close")) return profiles.toggle;
    return profiles.default;
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button, .nav-pill, .cta-button, .footer-tile");
    if (!btn) return;
    const [freq, duration, volume, ms] = getProfile(btn);
    haptic(ms);
    playTone(freq, duration, volume);
  }, { passive: true });
})();
