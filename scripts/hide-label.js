<script>
(function () {
  function removeDocAI() {
    const link = document.querySelector('a[href*="documentation.ai"]');
    if (!link) return;

    // Remove the nearest meaningful container
    let el = link;
    while (el && el !== document.body) {
      // This is the footer wrapper in your HTML
      if (el.classList && el.classList.contains('mt-8')) {
        el.remove();
        return;
      }
      el = el.parentElement;
    }

    // fallback: just remove the link if wrapper not found
    link.remove();
  }

  // Run repeatedly until removed
  const interval = setInterval(() => {
    removeDocAI();

    // Stop once it's gone
    if (!document.querySelector('a[href*="documentation.ai"]')) {
      clearInterval(interval);
    }
  }, 300);

})();
</script>