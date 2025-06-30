import React,{useEffect, useRef, useState } from 'react';

import EmptyState from '../ui/EmptyState';
import Header from '../ui/Header';
import ModuleItem from './ModuleItem';
import LinkModal from './LinkModal';
import ModuleCard from './ModuleCard';
import ModuleModal from './ModuleModal';
import UploadModal from './UploadModal';
import ModuleOutline from './ModuleOutline';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [items, setItems] = useState([]);
  const [currentItem,setCurrentItem] = useState(null);

  // Modal states
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Current items for editing
  const [currentModule, setCurrentModule] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);

  const moduleRefs = useRef({})
  const [activeModuleId,setActiveModuleId] = useState(null);


useEffect(()=>{
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        const visibleModuleId = entry.target.getAttribute('data-module-id');
        setActiveModuleId(visibleModuleId);
      }
    })
  },
  {
    threshold: 0.5,
  }
);

modules.forEach((module)=>{
  const ref = moduleRefs.current[module.id];
  if(ref && ref.current){
    observer.observe(ref.current)
  }
})

return()=>{
  observer.disconnect();
}
},[modules])


  const handleAddClick = type => {
    switch (type) {
      case 'module':
        setCurrentModule(null);
        setIsModuleModalOpen(true);
        break;
      case 'link':
        // This is handled through the module card now
        setCurrentModule(null);
         setIsLinkModalOpen(true);
        break;
      case 'upload':
        // This is handled through the module card now
        setCurrentModule(null);
        setIsUploadModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
    setCurrentItem(null);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
    setCurrentItem(null);
  };

  const handleSaveModule = module => {
    if (currentModule) {
      // Edit existing module
      setModules(modules.map(m => (m.id === module.id ? module : m)));
    } else {
      // Add new module
      setModules([...modules, module]);
    }
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleEditModule = module => {
    setCurrentModule(module);
    setIsModuleModalOpen(true);
  };

  const handleDeleteModule = moduleId => {
    setModules(modules.filter(module => module.id !== moduleId));
    // Also remove any items associated with this module
    setItems(items.filter(item => item.moduleId !== moduleId));
  };

  const handleAddItem = (moduleId, type) => {
    setCurrentModuleId(moduleId);
    if (type === 'link') {
      setIsLinkModalOpen(true);
    } else if (type === 'file') {
      setIsUploadModalOpen(true);
    }
  };


  const handleSaveLink = linkItem => {
    if(currentItem){
      setItems(items.map((item)=>(
        item.id === currentItem.id ? {...linkItem,id:currentItem.id} : item
      )))
    }
    else{
          setItems([...items, linkItem]);
    }

    setIsLinkModalOpen(false);
    setCurrentItem(null);
    setCurrentModuleId(null);
  };

  const handleSaveUpload = fileItem => {
    if(currentItem){
      setItems(items.map((item)=>(
        item.id === currentItem.id ? {...fileItem,id:currentItem.id} :item
      )))
    }

    else{
    setItems([...items, fileItem]);
    }


   
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
    setCurrentItem(null);
  };

  const handleDeleteItem = itemId => {
    setItems(items.filter(item => item.id !== itemId));
  };

const handleEditItem = (item)=>{
  setCurrentItem(item);
  setCurrentModuleId(item.moduleId);
  if(item.type === 'link'){
    setIsLinkModalOpen(true);
  }

  else if(item.type === 'file'){
    setIsUploadModalOpen(true);
  }
}

  const handleMoveItem = (itemId,toModuleId)=>{
    setItems((prevItems)=>
      prevItems.map((item)=>
        item.id === itemId ? {...item,moduleId:toModuleId} : item
      )
    )
  }

  const handleReorderItem = (moduleId,fromIndex,toIndex)=>{
    const moduleItems = items.filter(i => i.moduleId === moduleId);
    const reordered = [...moduleItems];
    const [movedItem] = reordered.splice(fromIndex,1);
    reordered.splice(toIndex,0,movedItem);

    const updatedItems = [
      ...items.filter(i => i.moduleId !== moduleId),
      ...reordered,
    ];
    setItems(updatedItems);
  }

  const handleReorderModule = (draggedId,targetId) => {
    const updatedModules = [...modules];
    const fromIndex = updatedModules.findIndex(m => m.id === draggedId);
    const toIndex = updatedModules.findIndex(m => m.id === targetId)

    if(fromIndex === -1 || toIndex === -1) return;

    const [moveModule] = updatedModules.splice(fromIndex,1);
    updatedModules.splice(toIndex,0,moveModule);

    setModules(updatedModules)
  }

const handleOutlineClick = (id)=>{
  const ref = moduleRefs.current[id];
  console.log('scrolling to:',id,ref?.current);
  
  if(ref && ref.current){
    ref.current.scrollIntoView({behavior : 'smooth', block : 'start'})
  }
}

  return (

    
    <div style={{display:'grid',gridTemplateColumns:'85% 5%',width:'100%'}}>
    <div className="course-builder">
    
         <Header onAddClick={handleAddClick} />
 
     <div className="builder-content" >
  {modules.length === 0 && items.filter(item => !item.moduleId).length === 0 ? (
    <EmptyState />
  ) : (
    <>
      
      <div className="module-list">
        {modules.map((module) => {

          if(!moduleRefs.current[module.id]){
            moduleRefs.current[module.id] = React.createRef();
          }

          return(
            <div key= {module.id} ref = {moduleRefs.current[module.id]} data-module-id = {module.id}>
  <ModuleCard
            
            module={module}
            items={items}
            onEdit={handleEditModule}
            onDelete={handleDeleteModule}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onReorderItem = {handleReorderItem}
            onReorderModule = {handleReorderModule}
          />
            </div>
        
          )
})}
      </div>

     
      {items.filter(item => !item.moduleId).length > 0 && (
        <div>
          <div className="module-items-list">
            {items
              .filter(item => !item.moduleId)
              .map(item => (
                <ModuleItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                  onEdit = {handleEditItem}
                />
              ))}
          </div>
        </div>
      )}
    </>
  )}

 

      {/* Module Modal */}
      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
        onSave={handleSaveModule}
        module={currentModule}
        existingModules = {modules}
      />

      {/* Link Modal */}
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleCloseLinkModal}
        onSave={handleSaveLink}
        moduleId={currentModuleId}
        item = {currentItem}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSave={handleSaveUpload}
        moduleId={currentModuleId}
        item = {currentItem}
      />
    </div>
    </div>

     <div style={{display:'flex', alignItems:'center'}} className='module-outline-container'><ModuleOutline modules={modules} activeModuleId={activeModuleId} onSelect={handleOutlineClick} /></div>
</div>
  );
};

export default CourseBuilder;
