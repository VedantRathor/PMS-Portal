import axios from "axios"
AddProject
import { useEffect, useState } from "react"
import { useAsyncError, useNavigate, useSearchParams } from "react-router-dom"
import { MdDriveFileRenameOutline } from "react-icons/md";
import Sidebar from "../../Sidebar/Sidebar";
import { RxSize } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";

const localhost = 'http://localhost:7007'
function AddProject() {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState('')
  const [project_name, setPname] = useState()
  const [project_details, setPdesc] = useState()
  const [managerData, setManagerData] = useState()

  useEffect(() => {
    const getProjectManagers = async () => {
      try {
        let resposne = await axios.get(`${localhost}/manager`)
        let result = await resposne.data
        console.log(result)
        if (result.status == 'unsuccess') {
          alert('Manager Data unavailable')
          navigate('/Project')
        } else {
          setManagerData(result.result)
        }

      } catch (error) {
        console.log(error)
      }
    }
    getProjectManagers()
  }, [])

  const handleProjectName = (e) => { setPname(e.target.value) }
  const handleDescription = (e) => { setPdesc(e.target.value) }

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      if (selectedValue == '') {
        alert('Please Select Manager')
      } else {
        let resposne = await axios.post(`${localhost}/add-new-project`,
          {
            project_name : project_name ,
            project_details : project_details ,
            manager_id : selectedValue
          }
          , {
            headers : {'Authorization':`Bearer ${auth.result.token}`}
          })
          let result = await resposne.data 
          if( result.status == 'unsuccess'){
            alert('Failed to add project,try again!')
            navigate('/Project')
          }else{
            alert('Project Added Succesfully')
            navigate('/Project')
          }
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  return (
    <div className="addproject-container">
    <div className="overlay"></div>
      <div className="form-container2">
      <h1 style={{ color: 'white',zIndex:'1' }}>Add New Project</h1>
      <form onSubmit={handleForm} class=" row g-3 myform2 bg-dark text-light">
        <div class="col-12">
          <label class="form-label">Project Name</label><  MdDriveFileRenameOutline size={21} color="yellow" style={{marginLeft:'1%'}}/>
          <input onChange={handleProjectName} class="form-control" />
        </div>
        <div class="col-12 mt-3">
          <label class="form-label">Description</label><  TbFileDescription size={21} color="yellow" style={{marginLeft:'1%'}}/>
          <textarea type="text" style={{height:'100%'}} onChange={handleDescription} class="form-control" />
        </div>

        <div  className="col-12 mt-5">
          <label class="form-label">Add a manager</label><  IoMdPerson size={21} color="yellow" style={{marginLeft:'1%'}}/>
          <select style={{ zIndex: 'auto', padding: '1%', width: '100%', height: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={selectedValue} onChange={handleChange}>
            <option className="dropdown-item " value=''>Pick Manager</option>
            {managerData ? managerData.map((item) => (
              <option className="dropdown-item " value={item.user_id}>{item.name}</option>
            ))
              : <option className="dropdown-item " value="">No Managers</option>
            }
          </select>
        </div>

        <div  class="col-12 mt-5">
          <button style={{width:'28%',float:'right'}}  type="submit" class="btn btn-primary d-flex justify-content-center align-items-center gap-1">Add < IoMdAddCircle size={20}/></button>
        </div>
      </form>
    </div>
    </div>
  )
}
export default AddProject