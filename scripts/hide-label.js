(function () {
    'use strict';

    const BLOCK = 'documentation.ai';

    // ---------- INJECT CSS ----------
    function injectCSS() {
        const style = document.createElement('style');

        style.innerHTML = `
            a[href*="documentation.ai"],
            a[href*="Documentation.AI"],
            a[href*="documentation.ai"] *,
            a:has(span),
            footer a {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                pointer-events: none !important;
            }

            table {
                width: 100% !important;
                display: table !important;
            }
        `;

        document.documentElement.appendChild(style);
    }

    // ---------- REMOVE ----------
    function destroy() {
        const elements = document.querySelectorAll('*');

        elements.forEach(el => {
            try {
                const html = el.outerHTML || '';
                const text = el.textContent || '';

                if (
                    html.toLowerCase().includes(BLOCK) ||
                    text.toLowerCase().includes(BLOCK)
                ) {
                    el.remove();
                }
            } catch (e) {}
        });
    }

    // ---------- PATCH innerHTML ----------
    const descriptor = Object.getOwnPropertyDescriptor(
        Element.prototype,
        'innerHTML'
    );

    if (descriptor && descriptor.set) {
        Object.defineProperty(Element.prototype, 'innerHTML', {
            get: descriptor.get,
            set: function (value) {
                if (typeof value === 'string') {
                    value = value.replace(
                        /<a[^>]*documentation\.ai[\s\S]*?<\/a>/gi,
                        ''
                    );
                }

                return descriptor.set.call(this, value);
            }
        });
    }

    // ---------- PATCH insertAdjacentHTML ----------
    const oldInsertAdjacentHTML =
        Element.prototype.insertAdjacentHTML;

    Element.prototype.insertAdjacentHTML = function (
        position,
        html
    ) {
        if (typeof html === 'string') {
            html = html.replace(
                /<a[^>]*documentation\.ai[\s\S]*?<\/a>/gi,
                ''
            );
        }

        return oldInsertAdjacentHTML.call(
            this,
            position,
            html
        );
    };

    // ---------- PATCH FETCH ----------
    const oldFetch = window.fetch;

    window.fetch = async function (...args) {
        const response = await oldFetch.apply(this, args);

        try {
            const clone = response.clone();

            const text = await clone.text();

            if (text.includes(BLOCK)) {
                const cleaned = text.replace(
                    /<a[^>]*documentation\.ai[\s\S]*?<\/a>/gi,
                    ''
                );

                return new Response(cleaned, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            }
        } catch (e) {}

        return response;
    };

    // ---------- OBSERVER ----------
    const observer = new MutationObserver(() => {
        destroy();
    });

    function start() {
        injectCSS();
        destroy();

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });

        setInterval(destroy, 25);
    }

    start();

})();