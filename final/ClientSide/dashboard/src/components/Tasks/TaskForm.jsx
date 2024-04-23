  import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

function TaskForm (){
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()
    const {pid} = useParams()
    const [ taskname , setTaskName ] = useState('')
    const [taskdesc , setTaskDesc ] = useState('') 
    const handleTaskName = (e) =>{
       setTaskName( e.target.value)
    }
    const handleTaskDesc = (e) => {
        setTaskDesc( e.target.value)
    }
    const handleTaskForm = async(e) => {
        e.preventDefault() 
        try {
            let response = await axios.post('http://localhost:7007/task',{
                pid : pid, 
                tname : taskname ,
                tdesc : taskdesc  
                 
            },{
              headers : {
                Authorization : `Bearer ${auth.result.token}`
              }
            }) 
            let result = await response.data 
            console.log(result)
            navigate(`/project/${pid}/tasks`)
           
         } catch (error) {
            console.log(error)
         }
    }
   return(
    <>
       <p className="link" onClick={() => navigate(-1)}>Back</p> 
       <div className="MainDiv-for-single-functionality p-3">
        {
          pid ? <>
          <div style={{display:"flex", justifyContent:"center", width:"100%"}}><h1 className="">Create a Task</h1></div>
          <div id="taskbox" style={{}} class="login-box bg-dark text-light">
                      
              
              <form onSubmit={handleTaskForm}>
                <div class="user-box">
                <label>Task Name</label>
                  <input onChange={handleTaskName} type="text" name="" required=""/>
                 
                </div>
                <div class="user-box">
                <label>Task Description</label>
                  <input onChange={handleTaskDesc} type="text" name="" required=""/>
               
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div> 
          </> : <div>loading...</div>
        }



      </div>
    </>
  

       
  
   )
}
export default TaskForm