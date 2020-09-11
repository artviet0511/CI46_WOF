import { stopClick } from "../stopClick.js";
import {checkError} from "../controller/auth.js";

class ConForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(
            document.getElementById("conversationForm")
                .content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector("#form");
        this.$bookInput = this._shadowRoot.querySelector('form-input[name="book"]');
        this.$tacgiaInput = this._shadowRoot.querySelector('form-input[name="tacgia"]');

        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const book = this.$bookInput.value;
            const tacgia = this.$tacgiaInput.value;
            const result=checkError(book,tacgia)
            if(result.hasError){
                this.$bookInput.error=result.error.book;
                this.$tacgiaInput.error=result.error.tacgia
            }else{
                this.$bookInput.error="";
                this.$tacgiaInput.error=""
                this.createCon(book, tacgia)
                console.log(book,tacgia);
            }
        });
    }
    createCon(name, tacgia) {
        const conDoc = {
            book: name,
            tacgia: tacgia,
            archive: "Chưa đọc",
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection("books").doc(`${name}`).set(conDoc);
    }
    connectedCallback() {
        stopClick(this._shadowRoot);
    }
}

customElements.define('con-form', ConForm);