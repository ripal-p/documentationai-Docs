<script>
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector('nav[data-component="PageNavigation"]');
  if (!nav) return;

  const siblingDiv = nav.nextElementSibling;
  if (!siblingDiv) return;

  const spans = siblingDiv.querySelectorAll('a span');

  spans.forEach(span => {
    if (span.textContent.toLowerCase().includes("documentation.ai")) {
      siblingDiv.style.display = "none";
    }
  });
});
</script>