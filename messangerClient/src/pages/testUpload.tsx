import  { ChangeEvent, Component } from 'react';

interface FileUploadWithProgressBarState {
  selectedFile: File | null;
  progress: number;
}

class FileUploadWithProgressBar extends Component<object, FileUploadWithProgressBarState> {
  constructor(props:object) {
    super(props);
    this.state = {
      selectedFile: null,
      progress: 0,
    };
  }

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      this.setState({
        selectedFile: event.target.files[0],
      });
    }
  };

  handleUpload = () => {
    const { selectedFile } = this.state;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('userfile', selectedFile);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          this.setState({ progress });
        }
      };

      xhr.open('POST', '/api/upload.php', true);

      xhr.onload = () => {
        if (xhr.status === 200) {
          // Handle the successful response here
          console.log('File uploaded successfully');
        } else {
          // Handle the error response here
          console.error('File upload failed');
        }
      };

      xhr.send(formData);
    }
  };

  render() {
    const { progress } = this.state;

    return (
      <div>
        <h1>Загрузка файла</h1>
        <input
          type="file"
          name="userfile"
          onChange={this.handleFileChange}
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .txt"
        />
        <br />
        <button onClick={this.handleUpload}>Загрузить файл</button>
        <div style={{ display: progress > 0 ? 'block' : 'none' }}>
          <div style={{ border: '1px solid #ccc', width: '100px' }}>
            <div
              style={{
                backgroundColor: 'blue',
                width: `${progress}%`,
                color: 'white',
              }}
            >
              {progress.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploadWithProgressBar;
