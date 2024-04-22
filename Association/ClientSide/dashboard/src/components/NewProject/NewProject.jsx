import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

function NewProject() {
 const navigate = useNavigate() 
  const [selectedValue,setSelectedValue] = useState('')

 const handleForm = () =>{

 }
 const handleChange = () =>{

 }
 return(
    <div className="form-container">
    <h1 style={{color:'black'}}>Add New Project</h1>
        <form onSubmit={handleForm} class=" g-3 myform">
  <div class="col-12">
    <label class="form-label">Project Name</label>
    <input class="form-control"/>
  </div>
  <div class="col-12 mt-3">
    <label class="form-label">Description</label>
    <input   class="form-control" />
  </div>
  
  <div className="col-12 mt-3">
  <label class="form-label">Add a manager</label>
  <select className="dropdown dropdown-menu dropdown-menu-light " style={{zIndex:'auto', padding: '10px', width: '100px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={selectedValue} onChange={handleChange}>
              <option className="dropdown-item " value="">All logs</option>
              <option className="dropdown-item " value="pending">Pending</option>
              <option className="dropdown-item " value="approved">Approved</option>
              <option className="dropdown-item " value="rejected">Rejected</option>
            </select>
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary">Register</button>
  </div>
</form>
    </div>
 )
}
export default NewProject