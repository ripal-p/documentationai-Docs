(function () {
    'use strict';

    const BLOCK_TEXT = 'Documentation.AI';
    const BLOCK_DOMAIN = 'documentation.ai';

    function kill() {
        const links = document.getElementsByTagName('a');

        for (let i = links.length - 1; i >= 0; i--) {
            const el = links[i];

            const href = (el.getAttribute('href') || '').toLowerCase();
            const text = (el.textContent || '').toLowerCase();

            if (
                href.includes(BLOCK_DOMAIN) ||
                text.includes(BLOCK_TEXT.toLowerCase())
            ) {
                // destroy visually
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('opacity', '0', 'important');
                el.style.setProperty('height', '0', 'important');
                el.style.setProperty('width', '0', 'important');
                el.style.setProperty('pointer-events', 'none', 'important');

                // remove completely
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        }
    }

    // Hijack DOM insertion methods
    const methods = [
        'appendChild',
        'insertBefore',
        'replaceChild'
    ];

    methods.forEach(method => {
        const original = Node.prototype[method];

        Node.prototype[method] = function () {
            const node = arguments[0];

            try {
                if (node && node.tagName === 'A') {
                    const href = (node.getAttribute('href') || '').toLowerCase();
                    const text = (node.textContent || '').toLowerCase();

                    if (
                        href.includes(BLOCK_DOMAIN) ||
                        text.includes(BLOCK_TEXT.toLowerCase())
                    ) {
                        return node;
                    }
                }
            } catch (e) {}

            return original.apply(this, arguments);
        };
    });

    // Observe ALL DOM mutations
    const observer = new MutationObserver(() => {
        kill();
    });

    function start() {
        kill();

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });

        // brutal fallback
        setInterval(kill, 50);
    }

    // Start immediately
    if (document.documentElement) {
        start();
    } else {
        window.addEventListener('DOMContentLoaded', start);
    }

})();