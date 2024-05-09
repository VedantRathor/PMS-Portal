import React from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
function Task({taskData,parentFunctionDisplayData}) {
  const handleTaskDetailClick = (taskdetails)=>{
    parentFunctionDisplayData(taskdetails)
  }
  return (
    <>
    <table style={{ border: '1px solid rgb(98, 92, 92)'}} class="table table-dark table-hover">
        <thead>
           
              <h5 style={{paddingLeft:'10px',color:'white',backgroundColor:'',marginBottom:'0px'}} >Task Details <FaTasks size={35} color='yellow' style={{borderRadius:'1px',background:'transparent'}}/></h5>
            
            <tr>
               
                <th scope="col">Name</th>
                <th scope="col" className='text d-flex align-center ' style={{textDecoration:'',}}>Details </th>
                <th scope="col">Created By</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Updated By</th>
                <th scope="col">Status</th>
        
            </tr>
        </thead>
        <tbody>
         {
            taskData.map((eachTask=>(
                <tr>
                    <td>{eachTask.task_name}</td>
                    <td><CiCircleInfo onClick={()=>{handleTaskDetailClick(eachTask.task_details)}} style={{color:'blue',cursor:'pointer'}} className='text-alice' size='25' /> {eachTask.task_details}</td>
                    <td>{eachTask.userinfo.name}</td>
                    <td>{eachTask.created_at.split('T')[0]}</td>
                    <td>{eachTask.updated_at.split('T')[0]}</td>
                 {eachTask.updated_by ?<td>{eachTask.updated_by}</td> : <td>No Updates</td>}   
                 { eachTask.status=='pending' ? <td><CiStopwatch size={30} color='yellow'/></td>: eachTask.status == 'accepted' ? <td><FaCircle size={25} color='green'/></td>: <td><RxCross2 size={30} color='red'/></td>}
                </tr>
            )))
         }
        </tbody>
    </table>
</>
  )
}

export default Task