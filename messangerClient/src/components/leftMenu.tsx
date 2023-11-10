import React from "react";
import Dialogs from "./dialogs";
import "./leftMenu.scss";
import settingsImg from "../assets/icons8-настройки-50.png";


interface ILeftMenu {
  onClickClose: () => void;
}

// Assuming you have an Avatar component
const Avatar = () => (
  <div className="avatar">
    {/* Your avatar content or image */}
    <img src="path/to/avatar.jpg" alt="Avatar" />
  </div>
);

function LeftNavigation(props: ILeftMenu) {
  return (
    <div className="navigation">
 
      <header className="navigation-header">
      <div className="header-buttons">
        {/* <button className="hide-btn" onClick={props.onClickClose}>
         <img src={backImg}></img>
        </button> */}
        </div>
        <div className="profile-info">
          {/* <Avatar  s/> */}
          <div className="user-details">
            <label className="user-name">Фамилия Имя</label>
            <label className="user-role">Роль пользователя</label>
          </div>
        </div>
      </header>

      <nav className="navigation-content">
        <Dialogs />
      </nav>

      <footer className="navigation-footer">
        
      <button><img src={settingsImg} onClick={()=>{}} />Настройки</button>
        <label>v:0.0.1</label>
       
      </footer>
    </div>
  );
}

export default LeftNavigation;
