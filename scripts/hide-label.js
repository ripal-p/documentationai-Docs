<script>
(function () {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('a[href*="documentation.ai"]').forEach(link => {
      let el = link;
      while (el && el !== document.body) {
        if (el.classList && el.classList.contains('mt-8')) {
          el.remove();
          return;
        }
        el = el.parentElement;
      }
      link.remove();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>