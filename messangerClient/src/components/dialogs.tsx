import { useEffect, useState } from "react";
import "./dialogs.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs, selectActiveDialog, selectDialogs, selectDialogsState, setActiveDialogPeer  } from "../features/dialogs/dialogSlice";
import ItemDialog from "./itemDialog";

function Dialogs() {
 
  const [selectedDialog, setSelectedDialog] = useState(2);
  const dispatch = useDispatch();
  
  const dialogsState = useSelector(selectDialogsState)
  const dialogs = useSelector(selectDialogs) as Dialog[];
  
  

  
  useEffect(() => {
    dispatch(fetchDialogs() as any);
   
  }, []);
  
  useEffect(() => {
    setActiveDialog(dialogsState.active_peer);
  }, [dialogs]);

  
  function setActiveDialog(id: number) {
    setSelectedDialog(id);
    dispatch( setActiveDialogPeer(id));

  }

  return (
    <div className="dialogs">
      
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Найти диалог"
          type="search"
          name="q"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
     
      { 
     dialogs.map((dialog: Dialog) => (
       <ItemDialog
        title={dialog.title}
        peer_id={dialog.peer_id}
        onClick={()=>{setActiveDialog(dialog.peer_id)}}
        />
      )) }
    </div>
  );
}

export default Dialogs;
