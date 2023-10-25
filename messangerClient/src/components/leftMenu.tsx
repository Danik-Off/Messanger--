import { useContext, useState } from "react";
import Dialogs from "./dialogs";
import "./leftMenu.scss";

const leftMenuShow = false;
interface ILeftMenu{
onClickClose:()=>void
}


function LeftNavigation(props:ILeftMenu) {
  function onShowOrHide() {
    // setShow(!isShow);
  }
  return (
    <>
      <header>
        {/* <Avatar></Avatar> */}
        <label>Фамилия Имя</label>
      </header>

      <ul>
        <Dialogs></Dialogs>
      </ul>

      <footer>
        {/* <ButtonWithImg img="/src/assets/1630709.svg" text="Настройки"/> */}
        <button className="hiddeBtn" onClick={()=>props.onClickClose()}>Скрыть</button>
        {/* <label>v:0.0.1</label> */}
      </footer>
    </>
  );
}

export default LeftNavigation;
