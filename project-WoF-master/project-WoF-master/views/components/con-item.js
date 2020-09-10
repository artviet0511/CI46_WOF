import { setScreen } from "../../index.js";

class ConItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("conversationItem").content.cloneNode(true)
    );
    this.$noOfMems = this._shadowRoot.querySelector("#no-of-mems");
    this.$name = this._shadowRoot.querySelector("#name");
    this.$container = this._shadowRoot.querySelector("#container");
    this.$container.addEventListener('click', ()=>{
      setScreen('room')
    })
  }
  static get observedAttributes() {
    return ["name", "no-of-mems", 'con-id', 'active'];
  }
  set active(newVal) {
    this.setAttribute('active', newVal)
  }
  get active() {
    return this.getAttribute('active');
  }
  set conId(newVal) {
    this.setAttribute('con-id', newVal)
  }

  get conId() {
    return this.getAttribute('con-id');
  }
  set name(newVal) {
    this.setAttribute("name", newVal);
  }
  get name() {
    return this.getAttribute("name");
  }
  set noOfMems(newVal) {
    this.setAttribute("no-of-mems", newVal);
  }
  get noOfMems() {
    return this.getAttribute("no-of-mems");
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'active') {
      if (newVal) {
        this.$container.classList.add('active')
      }
      else {
        this.$container.classList.remove('active')
      }
    }

    this.$name.innerHTML = "Phòng của " + this.name;

    this.$noOfMems.innerHTML = this.noOfMems + '/3';
  }
  connectedCallback() {
    this.$container.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent('changeActiveCon', {
        composed: true,
        detail: {
          id: this.conId,
        }
      }));
    });
  }
}
customElements.define("con-item", ConItem);
