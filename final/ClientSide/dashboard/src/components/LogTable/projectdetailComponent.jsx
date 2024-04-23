import Nav from "../Nav"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect, useReducer } from "react"
import LogTableComponent from "./logTableComponent"


const ProjectDetailComponent = ({ pid }) => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname , urole ; 
  if( auth != null ){
     uname = auth.result.uname
     urole = auth.result.urole
  }

  const navigate = useNavigate()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  function parentFunction() {
    console.log('hey in parent')
    forceUpdate()
  }

  const [logdata, setlogData] = useState();
  useEffect(() => {
    const fetchLogdata = async () => {

      try {

        const logResponse = await axios.get(`http://localhost:7007/project-details-log/${pid}`)
        setlogData(logResponse.data.result[0])
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };
    fetchLogdata();
  }, []);


  const HandleLogStatus = async (lid, pid, str) => {
    parentFunction()
    try {
      let response = await axios.get(`http://localhost:8000/update/log/${lid}?wtd=${str}`);
      console.log(response.data);

      navigate(`/project/${pid}`)
    } catch (error) {
      console.error('Error updating log status:', error);
      // Handle error gracefully, if needed
    }
  };

  const handleViewLogDetails = (e) =>{
    navigate(`/project/${pid}/tasks/logs/0`)
  }

  return (
    <>
     <div className="project_h"><h2 style={{ textAlign: 'center' }}> Recent Logs</h2><h5 onClick={handleViewLogDetails} style={{textDecoration:'underline'}}>view logs in detail</h5></div>
      {
        logdata ? <>   <div class="adjust-table" >
          <table class="table table-dark table-hover" style={{height:'55vh', minHeight :'55vh', minWidth:'40vw', backgroundColor:'#212529', overflowY:'visible'}}>
            <thead>
              <tr>
                <th>Task Code</th>
                <th>Task</th>
                <th>Task Desc</th>
                <th>Log Data</th>
                <th>Log Date</th>
                <th>Log By</th>
                <th>Log Status</th>
               {urole == 3 ? <th>Log Updated on</th> : <th>Options</th>} 
              </tr>
            </thead>
            <tbody  >
              {logdata.tasks.map((task) => (
                <LogTableComponent item={task} parentFunction={parentFunction} />
              ))}

            </tbody>
          
          </table>
         
        </div> </> : <>no data</>

      }
    </>



  )

}
export default ProjectDetailComponent