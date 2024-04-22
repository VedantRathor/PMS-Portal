import ProjectData_rhs from "./Project/projectdata_rhs"
import Projecttasks_rhs from "./Tasks/ProjectTasks_rhs"
import Projectmembers_rhs from "./Projectmembers_rhs"
function RightProjectDetails({pid}){
     return(
        <div className="RightSideContainer ">
            <div className="projectDiv1">
             <ProjectData_rhs pid={pid}/>
             <Projecttasks_rhs pid={pid} /> 
          
            </div>
            <div className="membersAssigned">
            <Projectmembers_rhs pid={pid}/>
            </div>
          </div>
     )
}
export default RightProjectDetails