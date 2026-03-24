<script>
(function () {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('a[href*="documentation.ai"]').forEach(link => {
      const parent = link.closest('div');
      if (parent) parent.style.display = 'none';
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
</script>