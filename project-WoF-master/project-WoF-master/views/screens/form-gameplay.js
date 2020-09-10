import { answers } from "../components/answer.js";
import { nameRoom } from "../components/answer.js";
import { setScreen } from "../../index.js";

class Form_Gameplay extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(document.getElementById("form-gameplay").content.cloneNode(true));
        this.$show = this._shadowRoot.getElementById("show");
        this.$btn = this._shadowRoot.getElementById("enter");
        this.$returnToRoom = this._shadowRoot.querySelector('#returnToRoom')
        this.$returnToRoom.addEventListener('click', () => {
            setScreen('lobby')
        })
        this.$players = this._shadowRoot.getElementById("players");
        this.input = this._shadowRoot.getElementById("input");
        this.$texts = this._shadowRoot.getElementById("texts");
        this.$rotation = this._shadowRoot.querySelector("#rotation");
        this.$imgItem = this._shadowRoot.querySelector("#imgItem");
        this.$valRotate = this._shadowRoot.querySelector("#val-rotate");

        this.i = Math.floor(Math.random() * answers.length);
        this.arrrandom = [];
        this.arrrandom.push(this.i);
        this.show(answers[this.i]);
        this.key = 1;
        this.data = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 'mat luot', 'them luot', 'mat diem', 'nhan doi', 'chia doi', 'may man'];
        this.render();
    }
    render() {
        db.collection("conversations")
            .where("name", "==", nameRoom)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.item = doc.data();
                    this._shadowRoot.querySelector("#room").innerHTML += this.item.name;
                    for (let i = 0; i < this.item.members.length; i++) {
                        this._shadowRoot.querySelector(`#player${i + 1}`).innerHTML = `<form-player img="data:image/jpeg;base64,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" name="${this.item.members[i]}" point="0" key="${i + 1}"class="flex-1"></form-player>`;
                    };
                    this.$texts.name = answers[this.i].answer;
                    this.gameplays();

                });
            });
    };

    gameplays() {
        this.abc(this.key);
        this._shadowRoot.querySelector("#start")
            .addEventListener("click", () => {
                this.startRotate()
            });

        let loop = [[], [], []];
        let round = 1;
        let miss = "";
        let temp = 0;

        this.$btn.addEventListener("click", () => {
            let a = this.Searchs(this.input.value, answers[this.i].quen.toLowerCase());
            if (a[0] == "win") {
                for (let j = 0; j < answers[this.i].quen.length; j++) {

                    if (answers[this.i].quen.split("")[j] !== "") {
                        this._shadowRoot.getElementById(`${j}`).style.color = "black";
                        this._shadowRoot.getElementById(`${j}`).innerHTML = answers[this.i].quen.split("")[j];
                    }
                }
                alert("You Win");
                this.timeout();
                loop = [[], [], []];
                miss = "";
                round = +1;
                if (round > 3) {
                    alert("game ket thuc");
                }
                this.key = round;
            } else {
                if (a.length == 0) {
                    alert(`ko co chu cai ${this.input.value} nao`);
                    loop[this.key - 1].push("x");
                    if (loop[this.key - 1].length == 3) {
                        alert("ban da mat luot choi vong nay");
                        miss += `${this.key}`;
                        if (miss.length == 3) {
                            alert(`khong ai tra loi dc vong ${round}`)
                            this.timeout();
                            loop = [[], [], []];
                            miss = "";
                            round += 1;
                            if (round > 3) {
                                alert("game ket thuc");
                            }
                        }
                    }
                    this.key += 1;

                    if (miss.length > 0) {
                        if (this.key > 3) {
                            this.key = 1;
                        };
                        while (miss.indexOf(this.key) != -1) {
                            if (this.key > 3) {
                                this.key = 1;
                            };
                            this.key += 1
                        }
                    } else {
                        if (this.key > 3) {
                            this.key = 1;
                        };
                    }
                } else {
                    alert(`co ${a.length} chu cai ${this.input.value}`)
                    for (let key = 0; key < a.length; key++) {
                        this._shadowRoot.getElementById(`${a[key]}`).style.color = "black";
                        this._shadowRoot.getElementById(`${a[key]}`).innerHTML = this.input.value;
                    }
                    loop[this.key - 1] = [];
                    if (this.data[this.result] == "nhan doi") {
                        temp = Number(this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point) * 2;
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    } else if (this.data[this.result] == "chia doi") {
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    } else if (this.data[this.result] == "mat diem") {
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    } else if (this.data[this.result] == "them luoi") {
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    } else if (this.data[this.result] == "may man") {
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    } else {
                        temp = Number(this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point) + (Number(a.length) * Number(this.data[this.result]));
                        this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = temp;
                    }
                }
            }
            this.abc(this.key);
        });

    }
    startRotate() {
        this.$imgItem.classList.add("run-rotation")

        this.timeoutRadius();
    }
    timeoutRadius() {
        setTimeout(() => {
            this.$imgItem.classList.remove("run-rotation");
            this.result = Math.floor(Math.random() * this.data.length);
            if (this.data[this.result].length < 5) {
                alert(`bạn quay vào ô ${this.data[this.result]} điểm`)
            }
            else {
                alert(`bạn quay vào ô ${this.data[this.result]}`)
            }
            if (this.data[this.result] == "mat luot") {
                this.key += 1;
                if (this.key > 3) {
                    this.key = 1;
                };
                this.abc(this.key)
            }
            if (this.data[this.result] == "chia doi") {
                this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point /= 2;
            }
            if (this.data[this.result] == "mat diem") {
                this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point = 0;
            }

        }, 5000);
    }

    Searchs(input, answer) {
        let arr = [];
        if (input === answer) {
            arr.push("win")
        } else {
            if (input.length == 1) {
                let search = this.clead(answer).indexOf(input);
                while (search != -1) {
                    arr.push(search);
                    search = this.clead(answer).indexOf(input, search + 1);
                };
            };
        }
        return arr;
    }
    abc(key) {
        switch (key) {
            case 1:
                this._shadowRoot.querySelector("#player1").classList.add("borderred");
                this._shadowRoot.querySelector("#player2").classList.remove("borderred");
                this._shadowRoot.querySelector("#player3").classList.remove("borderred");
                break;
            case 2:
                this._shadowRoot.querySelector("#player1").classList.remove("borderred");
                this._shadowRoot.querySelector("#player2").classList.add("borderred");
                this._shadowRoot.querySelector("#player3").classList.remove("borderred");
                break;
            case 3:
                this._shadowRoot.querySelector("#player1").classList.remove("borderred");
                this._shadowRoot.querySelector("#player2").classList.remove("borderred");
                this._shadowRoot.querySelector("#player3").classList.add("borderred");
                break;
            default:
                break;
        };
    };
    show(answers) {
        let arr_answer = answers.quen.split("");
        this.$show.innerHTML = "";
        for (let i = 0; i < arr_answer.length; i++) {
            if (arr_answer[i] == " ") {
                this.$show.innerHTML += `<div id="${i}" class="show-answer hide flex-1">.</div>`
            } else {
                this.$show.innerHTML += `<div id="${i}" class="show-answer flex-1">.</div>`;
            };
        };
    };

    clead(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }
    timeout() {
        setTimeout(() => {
            while (this.arrrandom.indexOf(this.i) != -1) {
                console.log("a");
                this.i = Math.floor(Math.random() * answers.length);
            }
            this.$texts.name = answers[this.i].answer;
            this.show(answers[this.i]);
        }, 5000);
    }
    static get observedAttributes() {
        return ["src", "val-rotate"];
    }
    get value() {
        return this.$imgItem.value;
    }
    set valRotate(newVal) {
        this.setAttribute('val-rotate', newVal)
    }
    get valRotate() {
        return this.getAttribute('val-rotate');
    }
    attributeChangedCallback() {
        this.renderImg();
    }
    renderImg() {
        this.$imgItem.src = this.getAttribute('src');
    }

    // time(loop) {
    //     this._shadowRoot.querySelector("#time").innerHTML = 30;
    //     let time = setInterval(() => {
    //         if (loop === 0) {
    //             clearInterval(time);
    //         } else {
    //             this._shadowRoot.querySelector("#time").innerHTML -= 1;
    //             console.log(this._shadowRoot.querySelector("#time").innerHTML);
    //             if (this._shadowRoot.querySelector("#time").innerHTML == 0) {
    //                 this._shadowRoot.querySelector("#time").innerHTML = 30;
    //             }
    //         }
    //     }, 1000);
    // }

};
window.customElements.define("form-game", Form_Gameplay);