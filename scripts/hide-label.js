<script>
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector('nav[data-component="PageNavigation"]');
  if (!nav) return;

  const container = nav.parentElement;
  if (!container) return;

  const links = container.querySelectorAll('a');

  links.forEach(link => {
    const span = link.querySelector('span');
    if (span && span.textContent.toLowerCase().includes('documentation.ai')) {
      // Hide the outer div that wraps this footer section
      const wrapper = link.closest('div.mt-8');
      if (wrapper) {
        wrapper.style.display = 'none';
      }
    }
  });
});
</script>