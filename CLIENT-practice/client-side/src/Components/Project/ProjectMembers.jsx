import React from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
function ProjectMembers({projectMembers}) {
  return (
    <>
        <table style={{ border: '1px solid rgb(98, 92, 92)',width:'100%'}} class="table table-dark table-hover">
        <thead>
           
              <h5 style={{paddingLeft:'10px',color:'white',backgroundColor:'',marginBottom:'0px'}} >Project Members <IoIosPeople size={40} color='yellow' style={{borderRadius:'1px',background:'transparent'}}/></h5>
            
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>    
            </tr>

        </thead>
        <tbody>
           { projectMembers.map((eachMember => (
             <tr>
                <td>{eachMember.userinfo.name}</td>
                <td>{eachMember.userinfo.email}</td>
                <td>{eachMember.created_at.split('T')[0]}</td>
                <td>{eachMember.updated_at.split('T')[0]}</td>
             </tr>
           )))}
        </tbody>
    </table>
    </>
  )
}

export default ProjectMembers