import { useEffect, useState } from "react";
import Dialogs from "./dialogs";
import "./leftMenu.scss";
import axios from "axios";
import { GetUSer } from "../routes/routes";





const shortenFio = (fio:string=""):string => {
  if (!fio) return '';
  
  const parts = fio.split(' ');
  if (parts.length < 3) return fio;

  const [lastName, firstName, middleName] = parts;
  const shortFio = `${lastName} ${firstName[0]}. ${middleName[0]}.`;

  return shortFio;
};

function LeftNavigation() {
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
            <label className="user-name">{shortenFio(user?.fio)}</label>
           
          </div>
        </div>
      </header>

      <nav className="navigation-content">
        <Dialogs />
      </nav>

    
    </div>
  );
}

export default LeftNavigation;
