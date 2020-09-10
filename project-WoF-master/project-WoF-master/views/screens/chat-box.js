import { sendMsg } from "../../controller/chat.js";
class ChatScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("chatScreen").content.cloneNode(true)
    );
    this.$btnShowCon = this._shadowRoot.querySelector("#btnShowCon");
    this.$btnShowMem = this._shadowRoot.querySelector("#btnShowMem");
    this.$placeHolder = this._shadowRoot.querySelector("#placeholder");
    this.$messageList = this._shadowRoot.querySelector("#messageList");
    this.$txtTitle = this._shadowRoot.querySelector("#txtTitle");
    this.$chatForm = this._shadowRoot.querySelector("#chatForm");
    this.$textInput = this._shadowRoot.querySelector("#textInput");
    this.$message = this._shadowRoot.querySelector(
      "form-input[name='message']"
    );
    // this.$btnShowCon.addEventListener("click", () => {
    //   this.$placeHolder.classList.add("visible");
    //   this.showListCon();
    // });
    // this.$placeHolder.addEventListener("click", () => {
    //   this.$placeHolder.classList.remove("visible");
    // });
    this.conList = [];
    this.activeCon = "";
    this.messageListener = null;
  }
  
  showListCon() {
    const $conList = document.createElement("con-list");
    $conList.list = JSON.stringify(this.conList);
    $conList.addEventListener("create-con", (e) => {
      this.showCreateConForm();
    });
    $conList.addEventListener("changeActiveCon", (event) => {
      this.activeCon = event.detail.id;
      const selected = this.conList.find((con) => con.id == this.activeCon);
      this.$txtTitle.innerHTML = selected.name;
      $conList.activeId = this.activeCon;
      this.ListenMessage();
      this.$messageList.innerHTML = "";
      
    });
    this.$placeHolder.appendChild($conList);
  }
  // set value (newVal) {
  //   return this.setAttribute('value',newVal);
  // }
  // get value (){
  //   return this.getAttribute("value");
  // }
  changeActiveCon(id) {}
  showCreateConForm() {
    this.$placeHolder.innerHTML = "";
    const $conForm = document.createElement("con-form");
    this.$placeHolder.appendChild($conForm);
  }
  ListenMessage (){
    if (this.messageListener) {
      this.messageListener();
    }
    this.messageListener =
    db.collection("messages")
      .where("conId", "==", this.activeCon)
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type !== "added") return;
          const data = change.doc.data();

          const myMsg = document.createElement("my-message");
          myMsg.content = data.content;
          myMsg.displayName = data.sender.displayName;
          if (data.sender.email === firebase.auth().currentUser.email) {
            myMsg.isMine = true;
          }
          this.$messageList.prepend(myMsg);
        });
      });
  }
  connectedCallback() {
    this.$chatForm.addEventListener("keyup",(event)=>{
      if (event.keyCode === 13) {
        event.preventDefault();
        sendMsg(this.$message.value, this.activeCon);
        console.log(this.$textInput.value);
        // this.$textInput.value = "";
      }
    })
    // this.$chatForm.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   sendMsg(this.$message.value, this.activeCon);
      // this.$textInput.value = "";
      
    // });
    this.addEventListener("changeActiveCon", (event) => {});
    db.collection("conversations").where('members', 'array-contains', firebase.auth().currentUser.email).onSnapshot((querySnapshot) => {
      this.conList = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;
        this.conList.push(item);
      });
    });
    this.ListenMessage();
    
  }
}
customElements.define("chat-screen", ChatScreen);
