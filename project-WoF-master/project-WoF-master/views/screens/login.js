import { setScreen } from "../../index.js";
import { login } from "../../controller/auth.js";
class LoginScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("LoginScreen").content.cloneNode(true)
    );
    this._shadowRoot
      .querySelector("#LinkToRegister")
      .addEventListener("click", () => {
        setScreen('register');
      });
    this._shadowRoot
      .querySelector("#formLogin")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.login();
      });
      this._shadowRoot.querySelector("#ForgotPassword").addEventListener('click', () => {
        $forgotPassword = prompt("Nhập email của bạn ở đây")
        auth.sendPasswordResetEmail($forgotPassword);
      })
    this.$form = this._shadowRoot.querySelector("#formLogin");
    this.$email = this.$form.querySelector('form-input[name="email"]');
    this.$password = this.$form.querySelector('form-input[name="password"]');
  }
  login() {
    const email = this.$email.value;
    const password = this.$password.value;
    const result = login(email, password);
    console.log(result);
    if (result.hasError) {
      this.$email.error = result.error.email;
      this.$password.error = result.error.password;
    } else {
      this.$email.error = "";
      this.$password.error = "";
    }
  }
}

customElements.define("login-screen", LoginScreen);
