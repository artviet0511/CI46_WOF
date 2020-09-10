import "./models/auth.js";
import "./controller/auth.js";
import "./controller/chat.js";
import "./views/components/form-input.js";
import "./views/components/con-form.js";
import "./views/components/con-item.js";
import "./views/components/con-list.js";
import "./views/components/answer.js";
import "./views/components/player.js";
import "./views/components/text-form.js";
import "./views//components/message.js";
import "./views/components/rotate.js";
import "./views/screens/register.js";
import "./views/screens/login.js";
import "./views/screens/lobby.js";
import "./views/screens/chat-box.js";
import "./views/screens/room.js";
import "./views/screens/form-gameplay.js";


const screen = {
  login: "<login-screen></login-screen>",
  register: "<register-screen></register-screen>",
  lobby: "<lobby-screen></lobby-screen>",
  room: "<room-screen></room-screen>",
  gameplay: "<form-game></form-game>",
};
export function setScreen(screenName) {
  document.getElementById("game").innerHTML = screen[screenName];
}

setScreen("login");
