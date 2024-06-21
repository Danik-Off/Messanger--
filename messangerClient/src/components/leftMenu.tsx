import React, { useEffect, useState } from "react";
import Dialogs from "./dialogs";
import "./leftMenu.scss";
import settingsImg from "../assets/icons8-настройки-50.png";
import axios from "axios";
import { GetUSer } from "../routes/routes";
import router from "../routes/router";


interface ILeftMenu {
  onClickClose: () => void;
}



function LeftNavigation(props: ILeftMenu) {
 const [user,setUser] = useState<User>();
  useEffect(()=>{
    axios.get(GetUSer()).then((response)=>{
      console.log(response.data);
      setUser(response.data)
     });
  },[])
  
  return (
    <div className="navigation">
 
      <header className="navigation-header">
      <div className="header-buttons">
        </div>
        <div className="profile-info">
      
          <div className="user-details">
          <label className="user-role">Вы вошли как: {user?.type}</label>
            <label className="user-name">{user?.fio}</label>
           
          </div>
        </div>
      </header>

      <nav className="navigation-content">
        <Dialogs />
      </nav>

      <footer className="navigation-footer">
        
      {/* <button onClick={()=>{router.navigate("/settings")}}><img src={settingsImg}  />Настройки</button> */}
        <label>v:0.0.1</label>
       
      </footer>
    </div>
  );
}

export default LeftNavigation;
