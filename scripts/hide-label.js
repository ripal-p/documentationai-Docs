(function () {
    'use strict';

    const SELECTOR = 'a[href*="documentation.ai"]';

    // Remove matching elements
    function removeBlockedElements() {
        try {
            document.querySelectorAll(SELECTOR).forEach(el => {
                el.remove();
            });
        } catch (e) {}
    }

    // Prevent insertion into DOM
    function patchDomMethods() {
        const methods = [
            'appendChild',
            'insertBefore',
            'replaceChild'
        ];

        methods.forEach(method => {
            const original = Node.prototype[method];

            Node.prototype[method] = function (...args) {
                const node = args[0];

                try {
                    if (
                        node &&
                        node.nodeType === 1 &&
                        (
                            (node.matches && node.matches(SELECTOR)) ||
                            (node.querySelector && node.querySelector(SELECTOR))
                        )
                    ) {
                        return node;
                    }
                } catch (e) {}

                return original.apply(this, args);
            };
        });
    }

    // Observe future DOM mutations
    function startObserver() {
        const observer = new MutationObserver(() => {
            removeBlockedElements();
        });

        observer.observe(document.documentElement || document, {
            childList: true,
            subtree: true
        });
    }

    // Run ASAP
    patchDomMethods();
    removeBlockedElements();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeBlockedElements);
    } else {
        removeBlockedElements();
    }

    window.addEventListener('load', removeBlockedElements);

    startObserver();

    // Continuous fallback
    setInterval(removeBlockedElements, 500);
})();