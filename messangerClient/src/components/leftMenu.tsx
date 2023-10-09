import Avatar from "./avatar";
import ButtonWithImg from "./buttonWithImg";

import "./leftMenu.scss"

function LeftNavigation() {
  return (
    <div className="left-menu">
      <div className="back"><button>&#8656;</button></div>
      <header>
        <Avatar></Avatar>
        <label>Фамилия Имя</label>
      </header>
      <hr/>
      <ul>
      {/* <ButtonWithImg img="/src/assets/1630709.svg" text="Настройки"/> */}
      </ul>
      <hr/>
      <footer>
        <ButtonWithImg img="/src/assets/1630709.svg" text="Настройки"/>
        <ButtonWithImg img="" text="О приложении"/>
        <label>v:0.0.1</label>
      </footer>
    </div>
  );
}

export default LeftNavigation;