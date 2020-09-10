class TextForm extends HTMLElement {
    constructor() {
        super();
        this._ShadowRoot = this.attachShadow({ mode: "open" });
        this._ShadowRoot.appendChild(document.getElementById("text-form").content.cloneNode(true));
        this.$text = this._ShadowRoot.querySelector("#text");
    }
    static get observedAttributes() {
        return ["name"];
    };
    set name(newVal) {
        this.setAttribute("name", newVal);
    }
    get name() {
        return this.getAttribute("name");
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "name") {
            this.$text.innerHTML = newVal;
        }

    };
}
window.customElements.define("text-form", TextForm);