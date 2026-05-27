<script>
(function () {
    const blockedHref = "https://documentation.ai/?utm_campaign=footer&utm_medium=referral&utm_source=motion-rental";

    function removeElement() {
        document.querySelectorAll('a[href*="documentation.ai"]').forEach(el => {
            el.remove();
        });
    }

    // Run immediately
    removeElement();

    // Observe future DOM changes
    const observer = new MutationObserver(() => {
        removeElement();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Extra protection after full load
    window.addEventListener("load", removeElement);
})();
</script>