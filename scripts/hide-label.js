<script>
(function () {
  function nukeDocAI() {
    const allElements = document.querySelectorAll('*');

    allElements.forEach(el => {
      if (
        el.textContent &&
        el.textContent.toLowerCase().includes('documentation.ai')
      ) {
        // Try to remove a reasonably high-level container
        let parent = el;

        for (let i = 0; i < 5; i++) {
          if (!parent.parentElement) break;
          parent = parent.parentElement;
        }

        parent.remove();
      }
    });
  }

  // Run repeatedly for a short period to beat re-renders
  let attempts = 0;
  const interval = setInterval(() => {
    nukeDocAI();
    attempts++;

    if (attempts > 20) {
      clearInterval(interval);
    }
  }, 300);
})();
</script>