import { useEffect, useState } from "react";
import "./dialogs.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs, selectDialogs, selectDialogsState, setActiveDialogPeer  } from "../features/dialogs/dialogSlice";

function Dialogs() {
 
  const [selectedDialog, setSelectedDialog] = useState(2);
  const dispatch = useDispatch();
  const dialogsState = useSelector(selectDialogsState)
  const dialogs = useSelector(selectDialogs) as Dialog[];
  
  

  


  useEffect(() => {
    dispatch(fetchDialogs() as any);
    setActiveDialog(dialogsState.active_peer);
  }, []);
 
  
  function setActiveDialog(id: number) {
    setSelectedDialog(id);
    setActiveDialogPeer(id);
    console.log(dialogsState.active_peer)
  }

  return (
    <div className="dialogs">
      
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
     
      { 
     dialogs.map((dialog: Dialog) => (
        <div
         key={dialog.peer_id}
          className={
            "dialog " + ((dialog.peer_id === selectedDialog) ? "active" : "")
          }
          onClick={() => setActiveDialog(dialog.peer_id)}
        >
          {dialog.title}
        </div>
      )) }
    </div>
  );
}

export default Dialogs;
