
import { useSelector } from "react-redux";
import { selectLeftMenu } from "../features/counter/counterSlice";
import Dialogs from "./dialogs";
import "./leftMenu.scss"

const leftMenuShow = false;

function LeftNavigation() {
  return (
    <div className="left-menu" style={(leftMenuShow)?{display:"block"}:undefined}>
     
      <header>
        {/* <Avatar></Avatar> */}
        <label>Фамилия Имя</label>
      </header>
      
      <ul>
      <Dialogs></Dialogs>
      </ul>
     
      <footer>
        {/* <ButtonWithImg img="/src/assets/1630709.svg" text="Настройки"/> */}
        <button>Назад</button>
        {/* <label>v:0.0.1</label> */}
      </footer>
    </div>
  );
}

export default LeftNavigation;