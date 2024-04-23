import EachProjectCard from "./EachProjectCard"
import { useNavigate, Navigate , Link} from 'react-router-dom'
import axios from 'axios'
import { react, useState, useEffect } from 'react'

const SideBar = () => {
  

  // <div className="d-flex flex-column flex-shrink-0 p-3 bg-light SIDEBAR each-project-card-container" style={{ width: '380px', height: '100vh' }}>
  //     {projectData ? projectData.map((eachProject => (
  //       <>
  //         <EachProjectCard eachPro={eachProject} />

  //      </>


  //     ))) : <h1>Loading....</h1>}</div>
  return (
    <>

      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light SIDEBAR each-project-card-container" style={{ width: '100%', height: '87vh' }}>
       
          <>
            {/* <EachProjectCard eachPro={eachProject} /> */}
            <h3 style={{textAlign:'center'}}>Quick Nav</h3>
            <hr />
            <h4><Link to="/Project">Project</Link></h4>
            <hr />
          </>
   </div>


    </>
  )
}
export default SideBar