import { useParams } from "react-router-dom"

import AddLogForm from "./AddLogForm"
const AddLog = () =>{
    const { pid , tid  } = useParams() 
    let taskobj = localStorage.getItem('taskobj')
    taskobj = JSON.parse(taskobj)
    
    
return(
    <>
      <div className="MainDiv p-3">
        <AddLogForm pid={pid} tid={tid} item ={taskobj} />
      </div>
    </>
)
}
export default AddLog