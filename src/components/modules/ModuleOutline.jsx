

const ModuleOutline = ({modules,activeModuleId,onSelect})=>{
    return(
        <div className="module-outline">
          {modules.map((module)=> (
            <div key={module.id} className={`outline-item ${activeModuleId === module.id ? 'active':''}`} onClick={()=> onSelect(module.id)}>
             {module.name}
            </div>
          ))}
        </div>
    )
}

export default ModuleOutline