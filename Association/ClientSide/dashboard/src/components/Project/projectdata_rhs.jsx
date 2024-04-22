import axios from "axios"
import { useEffect, useState , useReducer} from "react"

function ProjectData_rhs({pid}) {
  const[projectData , setProjectData] = useState()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  function parentFunction() {
    console.log('hey in parent')
    forceUpdate()
  }

  useEffect( ()=>{
    const getProjectByPid = async() => {
      let response = await axios.get(`http://localhost:7007/project-details-project/${pid}`)
      setProjectData(await response.data.result[0])
      console.log(projectData)
    } 
    getProjectByPid()
  },[])

  return (<>
    {
      projectData ? <div  className="projectDetails2">
    <h2 style={{textAlign:'center'}}>Project Details</h2>
      <ul className="list-group pul" >
        <li className="list-group-item active " style={{backgroundColor:'#212529'}}><b>{projectData.pname}</b></li>
        <li className="list-group-item"><b>Project Description : </b>{projectData.pdesc}</li>
        <li className="list-group-item"><b>Assigned By : </b>Admin</li>
        <li className="list-group-item"><b>Assigned To : </b>{projectData.userinfo.uname}</li>
        <li className="list-group-item"><b>Starting Date : </b>{projectData.createdAt.split('T')[0]}</li>
      </ul>
    </div> : <div>Loading....</div>
    }
    
  </>   

  )
}
export default ProjectData_rhs