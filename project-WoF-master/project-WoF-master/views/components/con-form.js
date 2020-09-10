import { stopClick } from '../../stopClick.js';
import {createCon} from '../../controller/chat.js'
import {setScreen} from '../../index.js'
class ConForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("conversationForm").content.cloneNode(true)
    );
    this.$form = this._shadowRoot.querySelector('form');
    this.$backBtn = this._shadowRoot.querySelector('#backBtn');
    this.$backBtn.addEventListener('click', ()=>{
      setScreen('lobby')
    })
    // this.$closeBtn = this._shadowRoot.querySelector('#closeBtn');
    // this.$closeBtn.addEventListener('click',()=>{

    // })
    this.$nameInput = this._shadowRoot.querySelector('form-input[name="name"]')
    this.$memberInput = this._shadowRoot.querySelector("form-input[name='member']")
    this.$form.addEventListener('submit', (event)=> {
      event.preventDefault();
      const name = this.$nameInput.value;
      const member = this.$memberInput.value;
      createCon (name,member);
      setScreen('lobby')
    })
  }
  connectedCallback(){
    stopClick(this._shadowRoot);
  }
}
customElements.define("con-form", ConForm);
