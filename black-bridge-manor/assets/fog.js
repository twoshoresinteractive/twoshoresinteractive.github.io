// Pause the decorative CSS drift while the page is in a background tab.
(() => {
  const syncVisibility = () => document.documentElement.classList.toggle('page-hidden', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility);
  syncVisibility();
})();
