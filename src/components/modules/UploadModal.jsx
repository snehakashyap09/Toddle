import { useEffect, useState } from 'react';

const UploadModal = ({ isOpen, onClose, onSave, moduleId ,item}) => {
  const [fileTitle, setFileTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

useEffect(()=>{
  if(isOpen && item){
    setFileTitle(item.title);
    setSelectedFile(null);
  }
  else if(isOpen){
    setFileTitle('');
    setSelectedFile(null)
  }
},[isOpen,item])

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const handleSubmit = e => {
    e.preventDefault();

    if(!fileTitle.trim())  return;

    // In a real app, you would upload the file to a server
    // Here we just create a mock file entry
    onSave({
      id: item ? item.id: Date.now().toString(),
      moduleId,
      type: 'file',
      title: fileTitle.trim(),
      fileName: selectedFile?.name || item.fileName || '',
      fileSize: selectedFile?.size || item.fileSize || 0,
      fileType: selectedFile?.type || item.fileType || '',
    });
    setFileTitle('');
    setSelectedFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{item ? "Rename file" :"Upload file"}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="file-title">File title</label>
              <input
                id="file-title"
                type="text"
                value={fileTitle}
                onChange={e => setFileTitle(e.target.value)}
                placeholder="File title"
                className="form-input"
                autoFocus
              />
            </div>

          {!item &&( <div className="form-group">
              <label htmlFor="file-upload">Select file</label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="file-input"
              />
              {selectedFile && (
                <div className="selected-file">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-size">
                    ({Math.round(selectedFile.size / 1024)} KB)
                  </span>
                </div>
              )}
            </div>)}
           

          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-create"
              disabled={!fileTitle.trim() || !selectedFile && !item}
            >
              {item ? "Save changes" : "Upload file"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
