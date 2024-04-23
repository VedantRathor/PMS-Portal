import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import Projectmembers_rhs from "../Projectmembers_rhs"
import AssignMembers from "../AssignMembers"

const AssignProjectMember = () =>{
  const navigate = useNavigate()
  const {pid} = useParams()
return(
    <>
     <p className="link" onClick={() => navigate(-1)}>Back</p> 
     <div className="MainDiv-for-single-functionality p-3 " style={{border:'2px solid red'}}>
        {
          pid ? <>
         
         <div style={{display:"flex", justifyContent:"center", width:"100%" }}><h2 className="">Assign Members</h2></div>
        
             <AssignMembers pid={pid}/>
          </> : <div>Loading or no data found.</div>
        }



      </div>
    </>
)
}
export default AssignProjectMember