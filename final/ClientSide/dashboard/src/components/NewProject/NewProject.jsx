import axios from "axios"
import { useEffect, useState } from "react"
import { useAsyncError, useNavigate, useSearchParams } from "react-router-dom"
const localhost = 'http://localhost:7007'
function NewProject() {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState('')
  const [pname, setPname] = useState()
  const [pdesc, setPdesc] = useState()
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
            pname : pname ,
            pdesc : pdesc ,
            mid : selectedValue
          }
          , {
            headers : {Authorization:`Bearer ${auth.result.token}`}
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
    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
      <div className="form-container">
      <h1 style={{ color: 'black' }}>Add New Project</h1>
      <form onSubmit={handleForm} class=" row g-3 myform bg-dark text-light">
        <div class="col-12">
          <label class="form-label">Project Name</label>
          <input onChange={handleProjectName} class="form-control" />
        </div>
        <div class="col-12 mt-3">
          <label class="form-label">Description</label>
          <input onChange={handleDescription} class="form-control" />
        </div>

        <div className="col-12 mt-3">
          <label class="form-label">Add a manager</label>
          <select style={{ zIndex: 'auto', padding: '10px', width: '100px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={selectedValue} onChange={handleChange}>
            <option className="dropdown-item " value=''>Pick Manager</option>
            {managerData ? managerData.map((item) => (
              <option className="dropdown-item " value={item.uid}>{item.uname}</option>
            ))
              : <option className="dropdown-item " value="">No Managers</option>
            }
          </select>
        </div>

        <div class="col-6">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
    </div>
  )
}
export default NewProject