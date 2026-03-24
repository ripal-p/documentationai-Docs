<script>
window.addEventListener("load", function () {
  setTimeout(() => {
    const nav = document.querySelector('nav[data-component="PageNavigation"]');
    if (!nav) return;

    const container = nav.parentElement;
    if (!container) return;

    const links = container.querySelectorAll('a');

    links.forEach(link => {
      const span = link.querySelector('span');
      if (span && span.textContent.toLowerCase().includes('documentation.ai')) {
        const wrapper = link.closest('div.mt-8');
        if (wrapper) {
          wrapper.style.display = 'none';
        }
      }
    });
  }, 500); // wait for render
});
</script>