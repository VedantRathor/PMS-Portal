import React from 'react'
import { FaTasks } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function LogData({logData,parentFunctionDisplayData}) {
  
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  console.log(auth)
  if (auth != null && auth != 'undefined') {
    name = auth.result.name
    role = auth.result.role
  }else{
    localStorage.removeItem('user')
    navigate('/Login')
  }
  
    const handleTaskDetailClick = (taskdetails,eachTask)=>{
        parentFunctionDisplayData(taskdetails,eachTask)
      }
  return (
    <table style={{ border: '1px solid rgb(98, 92, 92)'}} class="table table-dark table-hover">
    <thead>
       
          <h6 style={{paddingLeft:'10px',color:'white',backgroundColor:'',marginBottom:'0px'}} >Log Details <FaTasks size={35} color='yellow' style={{borderRadius:'1px',background:'transparent'}}/></h6>
        
        <tr>
           
            <th scope="col">Name</th>
            <th scope="col" className='text d-flex align-center ' style={{textDecoration:'',}}>Log Description </th>
            <th scope="col">Start time</th>
            <th scope="col">End time</th>
            <th scope="col">Task Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Status</th>
            <th scope="col">Checked By</th>
        </tr>
    </thead>
    <tbody>
        {
            logData && logData.length != 0 ?  
               <>
                    { logData.map((eachTask)=>(
                        eachTask && eachTask.logs && eachTask.logs.length != 0 ?
                       eachTask.logs.map((eachLog)=>(
                       <>
                       <tr>
                         <td>{eachLog.userinfo.name}</td>
                         <td>{eachLog.logdata}</td>
                         <td>{eachLog.start_time}</td>
                         <td>{eachLog.end_time}</td>
                         <td onClick={()=>{handleTaskDetailClick(eachTask.task_details,eachTask)}} style={{color:'lightblue',textDecoration:'underline',cursor:'pointer'}}  >{eachTask.task_name} <CiCircleInfo  style={{color:'blue',cursor:'pointer'}} className='text-info' size='27' /></td>
                         <td>{eachLog.created_at.split('T')[0]}</td>
                         <td>{eachLog.updated_at.split('T')[0]}</td>
                         <td>{eachLog.logstatus}</td>
                         <td>{eachLog.approved_by}</td>
                         </tr>
                       </>
                         
                       ))
                        : <></> 
                    ))}
                    </>
            : <>No Data Available</>
        }
    </tbody>
</table>
  )
}

export default LogData