import Avatar from "./avatar";
import ButtonWithImg from "./buttonWithImg";
import Dialogs from "./dialogs";

import "./leftMenu.scss"

function LeftNavigation() {
  return (
    <div className="left-menu">
     
      <header>
        {/* <Avatar></Avatar> */}
        <label>Фамилия Имя</label>
      </header>
      <hr/>
      <ul>
      <Dialogs></Dialogs>
      </ul>
     
      <footer>
        {/* <ButtonWithImg img="/src/assets/1630709.svg" text="Настройки"/> */}
        <ButtonWithImg img="" text="Назад"/>
        {/* <label>v:0.0.1</label> */}
      </footer>
    </div>
  );
}

export default LeftNavigation;