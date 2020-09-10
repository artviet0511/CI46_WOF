import { setScreen } from "../../index.js";
class LobbyScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("LobbyScreen").content.cloneNode(true)
    );
    this.$LogOut = this._shadowRoot.querySelector("#LogOut");
    this.$placeHolder = this._shadowRoot.querySelector("#placeHold");
    this.$myModal = this._shadowRoot.querySelector("#myModal");

    this.$createRoom = this._shadowRoot.querySelector('#createRoom');
    this.$createRoom.addEventListener('click', ()=>{
      this.$myModal.style.display = "block";
      const $form = document.createElement('con-form');
    this.$placeHolder.innerHTML = "";

    this.$placeHolder.appendChild($form);

    })
    // this.$currentUsers = this._shadowRoot.querySelector("#currentPlayers");
    this.$LogOut.addEventListener("click", () => {
      const answer = confirm("Bạn có muốn đăng xuất?");
      if (answer) {
        firebase.auth().signOut();
        alert("Đăng xuất thành công");
      } else {
        return;
      }
    });
    let users = firebase.auth().currentUser;
    let name = users.displayName;
    // this.$currentUsers.innerHTML = name;

    firebase
      .database()
      .ref("messages")
      .on("child_added", function (snapshot) {
        var html = "";
        html += "<li id='message-" + snapshot.key + "'>";
        html += snapshot.val().sender + ": " + snapshot.val().message;
        html += "</li>";

        document.getElementById("messages").innerHTML += html;
      });
    this.$listRoom = this._shadowRoot.querySelector("#listRoom");
    this.render()
    this.conList=[];
    const $conList = document.createElement("con-list");
    $conList.list = JSON.stringify(this.conList);
    $conList.addEventListener("changeActiveCon", (event) => {
      // this.activeCon = event.detail.id;
      // const selected = this.conList.find((con) => con.id === this.activeCon);
      // this.$txtTitle.innerHTML = selected.name;
      // $conList.activeId = this.activeCon;
      // this.$messageList.innerHTML = "";
      // this.ListenMessage();
    });
  }

  render() {
    db.collection("conversations")
      .onSnapshot((querySnapshot) => {
        this.$listRoom.innerHTML = "";
        querySnapshot.forEach((doc) => {
          this.item = doc.data();
          this.addCon(this.item.name, this.item.members.length)
        });
      });
  };
  addCon(name, noOfMems) {
    const conItem = document.createElement('con-item');
    conItem.name = name;
    conItem.noOfMems = noOfMems;
    this.$listRoom.appendChild(conItem);
  }
  
}

customElements.define("lobby-screen", LobbyScreen);
