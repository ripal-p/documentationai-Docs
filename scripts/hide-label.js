<script>
(function () {
  function hideFooter() {
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
          wrapper.style.display = 'none';
        }
      }
    });
  }

  // Run once immediately
  hideFooter();

  // Observe DOM changes (for SSR / dynamic rendering)
  const observer = new MutationObserver(() => {
    hideFooter();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>