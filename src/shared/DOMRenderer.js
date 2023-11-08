import { Component } from "./Component.js";
import { DOMSpec } from "./DOMSpec.js";
import { VDOM } from "./VDOM.js";
import { createDebug } from "./debug.js";

const debug = createDebug("Renderer");

export class DOMRenderer {

    // 루트 요소를 렌더링한다.
    renderRoot(domSpec, $root) {
        new VDOM(domSpec, null, $root);
    }

    /**
     * @param {DOMSpec} domSpec 
     * @returns {HTMLElement}
     */
    makeDOM(domSpec) {
        const $target = this.#createHTMLElement(domSpec.type);
        this.#attachProperties($target, domSpec);
        return $target;
    }

    /**
     * @param {HTMLElement} $target 
     * @param {DOMSpec} oldSpec 
     * @param {DOMSpec} nextSpec
     */
    updateDOM($target, oldSpec, nextSpec) {
        this.#removeProperties($target, oldSpec);
        this.#attachProperties($target, nextSpec);
    }

    #createHTMLElement(type) {
        if (type === "__TEXT") {
            return document.createTextNode("");
        }

        try {
            return document.createElement(type);
        } catch (e) {
            debug(`[${type}]는 브라우저에서 지원하지 않는 태그입니다.`);
        }
    };
    
    #attachProperties($target, domSpec) {
        const { props: { className, ...props } } = domSpec;

        // Text는 set/removeAttribute가 없다.
        if ($target instanceof Text) {
            $target.nodeValue = props.nodeValue;
            return;
        }
    
        // className 타입에 따라 다르게
        if (typeof className === "string" && className.length > 0) {
            $target.className = className;
        }
    
        if (className instanceof Array) {
            $target.className = className.join(" ");
        }
    
        // property 설정대로 추가
        for (const property of Object.keys(props)) {
            const isEventHandler = typeof props[property] === "function";
            if (isEventHandler) {
                $target[property] = props[property];
                debug($target, "에", property, " 이벤트 핸들러로 ", props[property], "를 등록함");
                continue;
            }
            $target.setAttribute(property, props[property]);
        }
    };

    #removeProperties($target, props) {
        // Text는 set/removeAttribute가 없다.
        if ($target instanceof Text) {
            $target.nodeValue = null;
            return;
        }

        for (const property of Object.keys(props)) {

            // 이벤트 핸들러는 property 방식으로 등록
            const isEventHandler = typeof props[property] === "function";
            if (isEventHandler) {
                delete $target[property];
                continue;
            }

            // 그 외는 attribute 방식으로 등록
            $target.removeAttribute(property);
        }
    };
}
