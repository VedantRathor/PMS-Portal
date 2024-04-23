import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import Projecttasks_rhs from "./ProjectTasks_rhs"

const ViewAllTask = () => {
  const navigate = useNavigate()
  const { pid } = useParams()
  return (
    <>
     <p className="link" onClick={() => navigate(-1)}>Back</p> 
      <div className="MainDiv p-3">
        {
          pid ? <>

            <Projecttasks_rhs pid={pid} />
            {/* <RightProjectDetails pid={pid} /> */}
          </> : <div>loading...</div>
        }



      </div>
    </>
  )
}
export default ViewAllTask