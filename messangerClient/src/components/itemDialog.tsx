import { useSelector } from "react-redux";
import { selectActiveDialog } from "../features/dialogs/dialogSlice";

import "./itemDialog.scss";

interface DialogProps{
  peer_id:number;
  title:string|undefined;
  onClick:any;
}
function ItemDialog(props:DialogProps) {
  
  const actualDialog =  useSelector(selectActiveDialog);
  const click =  props.onClick;
  return (
    <div
    key={props.peer_id}
     className={
       "dialog " + ((props.peer_id === actualDialog?.peer_id) ? "active" : "")
     }
     onClick={click}
   >
     {props.title}
   </div>
  )
}

export default ItemDialog