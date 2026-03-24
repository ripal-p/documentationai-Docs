<script>
(function () {
  function removeFooter() {
    const nav = document.querySelector('nav[data-component="PageNavigation"]');
    if (!nav) return;

    const container = nav.parentElement;
    if (!container) return;

    const links = container.querySelectorAll('a');

    links.forEach(link => {
      const span = link.querySelector('span');
      if (
        span &&
        span.textContent &&
        span.textContent.toLowerCase().includes('documentation.ai')
      ) {
        const wrapper = link.closest('div');
        if (wrapper) {
          wrapper.remove(); // 🔥 completely removes it
        }
      }
    });
  }

  // Run immediately
  removeFooter();

  // Keep watching for dynamically added content
  const observer = new MutationObserver(() => {
    removeFooter();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>