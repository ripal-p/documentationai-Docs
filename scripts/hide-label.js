(function () {
    'use strict';

    const BLOCK_MATCH = /documentation\.ai/i;

    // ---------- REMOVE ELEMENTS ----------
    function removeLinks(root = document) {
        try {
            const all = root.querySelectorAll('*');

            for (const el of all) {
                try {
                    const html = el.outerHTML || '';
                    const text = el.textContent || '';

                    if (
                        BLOCK_MATCH.test(html) ||
                        BLOCK_MATCH.test(text)
                    ) {
                        el.remove();
                    }
                } catch (e) {}
            }
        } catch (e) {}
    }

    // ---------- BLOCK innerHTML ----------
    const innerHTML = Object.getOwnPropertyDescriptor(
        Element.prototype,
        'innerHTML'
    );

    Object.defineProperty(Element.prototype, 'innerHTML', {
        set(value) {
            if (
                typeof value === 'string' &&
                BLOCK_MATCH.test(value)
            ) {
                value = value.replace(
                    /<a\b[^>]*documentation\.ai[\s\S]*?<\/a>/gi,
                    ''
                );
            }

            return innerHTML.set.call(this, value);
        },
        get: innerHTML.get
    });

    // ---------- BLOCK insertAdjacentHTML ----------
    const originalInsertAdjacentHTML =
        Element.prototype.insertAdjacentHTML;

    Element.prototype.insertAdjacentHTML = function (
        position,
        html
    ) {
        if (
            typeof html === 'string' &&
            BLOCK_MATCH.test(html)
        ) {
            html = html.replace(
                /<a\b[^>]*documentation\.ai[\s\S]*?<\/a>/gi,
                ''
            );
        }

        return originalInsertAdjacentHTML.call(
            this,
            position,
            html
        );
    };

    // ---------- BLOCK appendChild ----------
    const originalAppendChild = Node.prototype.appendChild;

    Node.prototype.appendChild = function (node) {
        try {
            if (
                node &&
                node.outerHTML &&
                BLOCK_MATCH.test(node.outerHTML)
            ) {
                return node;
            }
        } catch (e) {}

        return originalAppendChild.call(this, node);
    };

    // ---------- SHADOW DOM ----------
    const originalAttachShadow = Element.prototype.attachShadow;

    Element.prototype.attachShadow = function (init) {
        const shadow = originalAttachShadow.call(this, init);

        setInterval(() => {
            removeLinks(shadow);
        }, 50);

        return shadow;
    };

    // ---------- INITIAL CLEAN ----------
    function start() {
        removeLinks(document);

        const observer = new MutationObserver(() => {
            removeLinks(document);
        });

        observer.observe(document, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true
        });

        setInterval(() => {
            removeLinks(document);
        }, 50);
    }

    start();

})();