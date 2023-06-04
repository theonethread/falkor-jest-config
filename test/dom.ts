/** @jest-environment @falkor/falkor-jest-config/env/dom.ts */

// side-effect: extend global 'expect' with custom DOM matchers
import "@testing-library/jest-dom";

describe("[S] dom", () => {
    test("[T] window", () => {
        expect(window).toBeDefined();
    });

    test("[T] document", () => {
        expect(document).toBeDefined();
    });

    test("[T] document.createElement", () => {
        const element = document.createElement("div");
        expect(element).toBeEmptyDOMElement();
    });

    test("[T] document.body.appendChild", () => {
        const element = document.createElement("div");
        document.body.appendChild(element);
        expect(element).toBeInTheDocument();
    });
});
