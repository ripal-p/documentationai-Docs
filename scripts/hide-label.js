<script>
(function () {
  function removeBranding() {
    const link = document.querySelector('a[href*="documentation.ai"]');
    if (!link) return false;

    // This is the correct wrapper based on your HTML
    const footer = link.closest('div[class*="mt-8"]');

    if (footer) {
      footer.remove();
      return true;
    }

    // fallback: remove a few levels up
    let el = link;
    for (let i = 0; i < 4; i++) {
      if (!el.parentElement) break;
      el = el.parentElement;
    }
    el.remove();
    return true;
  }

  // Keep trying until it succeeds
  const interval = setInterval(() => {
    const done = removeBranding();
    if (done) clearInterval(interval);
  }, 200);
})();
</script>