(() => {
  const content = window.SiteContent;
  if (!content) return;

  const adConfig = content.accessibility?.audioDescription;
  if (!adConfig) return;

  const adButton = document.getElementById("ad-toggle");
  if (!adButton) return;

  const srDesc = document.getElementById("video-ad-text");
  const isApplyPage = !!document.querySelector(".apply-hero");
  const description = isApplyPage ? adConfig.applyVideo : adConfig.homeVideo;

  if (srDesc) srDesc.textContent = description;

  if (!("speechSynthesis" in window)) {
    adButton.style.display = "none";
    return;
  }

  let speaking = false;
  let utterance = null;

  const setActive = (active) => {
    speaking = active;
    adButton.setAttribute("aria-pressed", String(active));
    adButton.classList.toggle("is-active", active);
    const icon = adButton.querySelector(".ad-icon");
    if (icon) icon.textContent = active ? "AD ■" : "AD ▶";
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setActive(false);
  };

  const startSpeaking = () => {
    window.speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(description);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    utterance.onend = () => setActive(false);
    utterance.onerror = () => setActive(false);

    setActive(true);
    window.speechSynthesis.speak(utterance);
  };

  adButton.addEventListener("click", () => {
    if (speaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  });

  // Chrome pauses long utterances; keep-alive workaround
  const keepAlive = () => {
    if (speaking && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  };
  setInterval(keepAlive, 10000);

  window.addEventListener("beforeunload", () => {
    window.speechSynthesis.cancel();
  });
})();
