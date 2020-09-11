class ConList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(
            document.getElementById("List").content
                .cloneNode(true));

        this.$btnCreateCon = this._shadowRoot.querySelector("#btnCreateCon");
        this.$conList = this._shadowRoot.querySelector("#conList");
        this.$CreateBook = this._shadowRoot.querySelector('#CreateBook')
        this.$btnCreateCon.addEventListener('click', () => {
            this.$CreateBook.classList.add("visible")
            this.CreateBook();
        });
        this.$CreateBook.addEventListener('click', () => {
            this.$CreateBook.classList.remove("visible");
        });
        this.render();

    }

    CreateBook() {
        const conItem = document.createElement('con-form');
        this.$CreateBook.appendChild(conItem);
    }
    render() {
        db.collection("books")
            .onSnapshot((querySnapshot) => {
                this.$conList.innerHTML = "";
                querySnapshot.forEach((doc) => {
                    this.item = doc.data();
                    this.addCon(this.item.book, this.item.tacgia, this.item.archive);
                });
            });
    };
    addCon(name, noOfMems, archive) {
        const conItem = document.createElement('con-item');
        conItem.name = name;
        conItem.noOfMems = noOfMems;
        conItem.archive = archive;
        this.$conList.appendChild(conItem);
    }

}

customElements.define('con-list', ConList);