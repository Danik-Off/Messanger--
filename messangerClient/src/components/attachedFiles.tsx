import "./attachedFiles.scss"

function AttachedFiles() {
  return (
    <div className="attached-files">
      <div className="attached-file">
        <span className="file-icon">📎</span>
        <a href="#">example_image.jpg</a>
      </div>
      <div className="attached-file">
        <span className="file-icon">📎</span>
        <a href="#">example_document.pdf</a>
      </div>
    </div>
  );
}

export default AttachedFiles;
