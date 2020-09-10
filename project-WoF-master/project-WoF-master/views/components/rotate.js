class Rotate extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(document.getElementById("rotate").content.cloneNode(true));
        this.$imgItem = this._shadowRoot.querySelector("#imgItem");
        this._shadowRoot.querySelector("#start")
            .addEventListener("click", () => {
                this.startRotate()
            });
    }

    static data = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 'mat luot', 'them luot', 'mat diem', 'nhan doi', 'chia doi', 'may man'];
    static result = 0;
    static get observedAttributes() {
        return ["src"];
    }

    get value() {
        return this.$imgItem.value;
    }


    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.$imgItem.src = this.getAttribute('src');
    }

    startRotate() {
        this.$imgItem.classList.add("run-rotation")
        this.timeout();
    }
    timeout() {
        setTimeout(() => {
            Rotate.result = Math.floor(Math.random() * Rotate.data.length);
            console.log(Rotate.result);
            switch (Rotate.data[Rotate.result]) {
                case 100:
                    alert(`ban nhan duoc 100 diem`);
                    break;
                case 200:
                    alert(`ban nhan duoc 200 diem`);
                    break;
                case 300:
                    alert(`ban nhan duoc 300 diem`);
                    break;
                case 400:
                    alert(`ban nhan duoc 400 diem`);
                    break;
                case 500:
                    alert(`ban nhan duoc 500 diem`);
                    break;
                case 600:
                    alert(`ban nhan duoc 600 diem`);
                    break;
                case 700:
                    alert(`ban nhan duoc 700 diem`);
                    break;
                case 800:
                    alert(`ban nhan duoc 800 diem`);
                    break;
                case 900:
                    alert(`ban nhan duoc 900 diem`);
                    break;
                case 1000:
                    alert(`ban nhan duoc 1000 diem`);
                    break;
                case 2000:
                    alert(`ban nhan duoc 2000 diem`);
                    break;
                case "mat luot":
                    alert("ban mat luot choi nay");
                    break;
                case "them luot":
                    alert("ban duoc them 1 luot choi nua");
                    break;
                case "mat diem":
                    alert("ban khong co diem nao");
                    break;
                case "nhan doi":
                    alert("ban duoc nhan doi so diem");
                    break;
                case "chia doi":
                    alert("ban chia doi so diemr");
                    break;
                case "may man":
                    alert("ban duoc mo 1 o bat ky");
                    break;
            }
            this.$imgItem.classList.remove("run-rotation");
        }, 5000);
    }



}
customElements.define('rotate-item', Rotate)