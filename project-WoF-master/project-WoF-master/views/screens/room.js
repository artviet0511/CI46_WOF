import { setScreen } from "../../index.js";
import {nameRoom} from "../components/answer.js";
class roomScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("roomScreen").content.cloneNode(true)
    );
    this.$backLobby = this._shadowRoot.querySelector("#backLobby");
    this.$backLobby.addEventListener("click", () => {
      setScreen("lobby");
    });
    this.$input = this._shadowRoot.querySelector("#playGame");
    this.$input.addEventListener("click", function () {
      setScreen("gameplay");
    });
    this._shadowRoot.querySelector("#nameRoom").innerHTML+=nameRoom;
    this.render();
  }
  render(){
    db.collection("conversations")
    .where("name","==",nameRoom)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.item = doc.data();
            // for (let i = 0; i < this.item.members.length; i++) {
            //     this._shadowRoot.querySelector(`#roomPlayers`).innerHTML += `<form-player img="data:image/jpeg;base64,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" name="${this.item.members[i]}" ></form-player>`;
            // };
            
        });
    });
  }

}
customElements.define("room-screen", roomScreen);
