import { useState, useEffect } from "react";
import "./attachmentItem.scss";
import fileImg from "../assets/file.png";


function AttachmentItem({
  selectedFile,
  onRemoveAttachment,
  onLoad,
}: {
  selectedFile: File | null;
  onRemoveAttachment: () => void;
  onLoad: (file: any) => void;
}) {
  const [progress, setProgress] = useState(0);


  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop()?.toLowerCase();
  };

  function truncateFileNameWithExtension(fileName: string) {
    const maxLength = 8;
    if (fileName.length <= maxLength) {
      return fileName;
    }

    const fileNameWithoutExtension = fileName.slice(
      0,
      fileName.lastIndexOf(".")
    );

    const extension = fileName.slice(fileName.lastIndexOf("."));

    if (fileNameWithoutExtension.length > maxLength) {
      return fileNameWithoutExtension.slice(0, maxLength) + "..." + extension;
    }

    return fileName;
  }

  useEffect(() => {
    // Check if a selected file exists and initiate the upload process
    if (selectedFile) {
      if (selectedFile) {
 
        const formData = new FormData();
        formData.append("userfile", selectedFile);

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setProgress(progress);
          }
        };

        xhr.open("POST", "/api/upload.php", true);

        xhr.onload = () => {
          if (xhr.status === 200) {
            onLoad(xhr.responseText);
            console.log(xhr.responseText);
          } else {
            // Handle the error response here
            console.error("File upload failed");
          }
        };

        xhr.send(formData);
      }
    }
  }, [selectedFile]);

  const renderAttachment = () => {
    if (selectedFile) {
      const fileExtension = getFileExtension(selectedFile.name);

      if (fileExtension === "jpg" || fileExtension === "png") {
        return (
          <>
            <img src={URL.createObjectURL(selectedFile)} alt="Attachment" />
            <span className="title">
              {truncateFileNameWithExtension(selectedFile.name)}
            </span>
          </>
        );
      } else {
        return (
          <>
            <img src={fileImg} alt="File Icon" className="file-icon" />
            <span className="title">
              {truncateFileNameWithExtension(selectedFile.name)}
            </span>
          </>
        );
      }
    }
    return null;
  };

  return (
    <div className="attachment">
      {renderAttachment()}
      <button className="delete-icon" onClick={onRemoveAttachment}>
        &#x2716; {/* Close or "x" icon */}
      </button>
      <div
        className="progress-bar"
        style={{ display: progress > 0 ? "block" : "none" }}
      >
        <div style={{ width: `${progress}%` }} className="bar"></div>
      </div>
      {progress === 100 && (
        <div className="check-icon">
          &#x2714; {/* Check or "tick" icon */}
        </div>
      )}
    </div>
  );
}

export default AttachmentItem;
