import { useState } from "react";
import { useDrag,useDrop } from "react-dnd";
import { ItemTypes } from "../../constants/constants";

const ModuleItem = ({ index,item, onDelete,onEdit ,onReorderItem}) => {
  // Render different UI based on item type
 const [isOptionOpen,setIsoptionOpen] = useState(false);

const [{isDragging},dragRef] = useDrag({
  type: ItemTypes.ITEM,
  item: {
    id: item.id,
    moduleId: item.moduleId,
    index,
    type:item.type,
  },
  collect:(monitor)=>({
    isDragging: monitor.isDragging(),
  })
})

  const [{isOver},dropRef] = useDrop({
    accept: ItemTypes.ITEM,
    hover(draggedItem){
      if(draggedItem.id !== item.id && draggedItem.moduleId === item.moduleId)
    {
  onReorderItem(item.moduleId,draggedItem.index,index);
  draggedItem.index = index
    }
  }
  })

  const handleDelete = e => {
    e.stopPropagation();
    onDelete(item.id);
    setIsoptionOpen(false);
  };

const handleEdit = (e)=>{
  e.stopPropagation();
  onEdit(item);
  setIsoptionOpen(false);
}

  const toggleOptions =(e)=>{
     e.stopPropagation();
     setIsoptionOpen((prev)=> !prev);
  }

  if (item.type === 'link') {
    return (
      <div ref = {(node)=> dragRef(dropRef(node))} className="module-item link-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-link">🔗</span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <a
              href={item.url}
              className="item-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.url}
            </a>
          </div>
        </div>
        {/* <button className="item-delete" onClick={handleDelete}>
          <span className="delete-icon">🗑️</span>
        </button> */}

         <div className="module-actions">
          <button className="btn-options" onClick={toggleOptions}>
           <span className="options-icon">⋮</span>
          </button>

          {isOptionOpen && (
            <div className="options-menu">
             <button className="option-item" onClick={handleEdit}>
           <span className="option-icon">✏️</span> Edit link
             </button>
             <button className="option-item" onClick={handleDelete}>
              <span className="option-icon">🗑️</span> Delete link
             </button>
            </div>
          )}
         </div>

      </div>
    );
  }

  if (item.type === 'file') {
    return (
      <div ref = {(node)=> dragRef(dropRef(node))} className="module-item file-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-file">📄</span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <p className="item-details">
              {item.fileName} ({Math.round(item.fileSize / 1024)} KB)
            </p>
          </div>
        </div>
        {/* <button className="item-delete" onClick={handleDelete}>
          <span className="delete-icon">🗑️</span>
        </button> */}

         <div className="module-actions">
          <button className="btn-options" onClick={toggleOptions}>
           <span className="options-icon">⋮</span>
          </button>

          {isOptionOpen && (
            <div className="options-menu">
             <button className="option-item" onClick={handleEdit}>
           <span className="option-icon">✏️ </span> Edit File
             </button>
             <button className="option-item" onClick={handleDelete}>
              <span className="option-icon">🗑️</span> Delete File
             </button>
            </div>
          )}
         </div>

      </div>
    );
  }

  return null; // Fallback for unknown item types
};

export default ModuleItem;
