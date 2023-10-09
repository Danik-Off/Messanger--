import "./dialogs.scss"

function Dialogs() {
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
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
      <div className="dialog">Dialog 1</div>
      <div className="dialog">Dialog 2</div>
      <div className="dialog">Dialog 3</div>
    </div>
  );
}

export default Dialogs;
