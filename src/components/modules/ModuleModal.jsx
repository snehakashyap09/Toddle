import { useEffect, useState } from 'react';

const ModuleModal = ({ isOpen, onClose, onSave, module = null,existingModules = [] }) => {
  const [moduleName, setModuleName] = useState(module ? module.name : '');

useEffect(()=>{
if(isOpen ){
  setModuleName(module ? module.name :'')
}

},[isOpen])

 const handleSubmit = e => {
  e.preventDefault();

  const trimmedName = moduleName.trim();

  if (!trimmedName) return;

  const isDuplicate = existingModules.some(
    m =>
      m.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
      (!module || m.id !== module.id) 
  );

  if (isDuplicate) {
    alert("A module with this name already exists.");
    return;
  }

  onSave({
    id: module ? module.id : Date.now().toString(),
    name: trimmedName,
  });

  setModuleName('');
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{module ? 'Edit module' : 'Create new module'}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="module-name">Module name</label>
              <input
                id="module-name"
                type="text"
                value={moduleName}
                onChange={e => setModuleName(e.target.value)}
                placeholder="Introduction to Trigonometry"
                className="form-input"
                autoFocus
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              {module ? 'Save changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal;
