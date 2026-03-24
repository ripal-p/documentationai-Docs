<script>
(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    a[href*="documentation.ai"] {
      display: none !important;
    }

    a[href*="documentation.ai"] * {
      display: none !important;
    }

    /* Hide the whole footer wrapper */
    div:has(a[href*="documentation.ai"]) {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();
</script>