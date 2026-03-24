<script>
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector('nav[data-component="PageNavigation"]');
  
  if (nav) {
    const siblingDiv = nav.nextElementSibling;
    
    if (siblingDiv) {
      siblingDiv.style.display = "none";
    }
  }
});
</script>