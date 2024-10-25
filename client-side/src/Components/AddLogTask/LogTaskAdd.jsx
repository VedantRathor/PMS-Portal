import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import axios from "axios"

import { useNavigate } from "react-router-dom"
const localhost = 'http://localhost:7007'

function LogTaskAdd({ openTaskContainer, project_id, task_id, item }) {
    let auth = localStorage.getItem('user');
    const isDemoMode = localStorage.getItem('ISDEMO') === 'true';
    auth = JSON.parse(auth)
    let name, role;
    if (auth != null) {
        name = auth.result.name
        role = auth.result.role
    }

    const navigate = useNavigate()
    const [logdata, setLogData] = useState()
    const [start_time, setStartTime] = useState()
    const [end_time,setEndTime] = useState()

    const handleLogData = (e) => { setLogData(e.target.value) }
    const handleLogStartTime = (e) => { setStartTime(e.target.value) }
    const handleEndLogTime = (e) => {setEndTime(e.target.value)}

    const handleLogDataForm = async (e) => {
      e.preventDefault()
      try {
        localStorage.removeItem('taskobj')
        if (logdata == null || start_time == null) {
          alert('Please Fill the Log Information correctly before submitting')
        } else {
          let resposne = await axios.post(`http://localhost:7007/add-log/${project_id}/${task_id}`, {
            logdata: logdata,
            start_time: start_time,
            end_time : end_time
          }, {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
          let result = await resposne.data
          console.log(result)
          if (result.status == 'success') {
            alert('Log Added Succesfully.')
           openTaskContainer()
          } else {
            alert('Log Doesnot Added. Try again')
           
          }
        }
  
      } catch (error) {
        console.log(error)
      }
    }

    const CloseTaskForm = () => {
        openTaskContainer()
    }
    return (
        <div className='text-white LogTaskAdd'>
            <RxCross1 onClick={() => { CloseTaskForm() }} size={30} color='red' style={{ margin: '1%' }} />
            <div className='add-log-task-container'>
                <h4>Add Log</h4>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div className="addlog-form">
                        <form onSubmit={handleLogDataForm} className="g-3 myformAddlog" >
                          

                            <div className="col-md-10 mb-3" >
                                <label className="form-label"><b>Task Name </b></label>
                                <div className="form-control bg-secondary text-white"  >{item.task_name}</div>
                            </div>

                           

                            <div className="col-md-10 mb-3">
                                <label className="form-label"><b>Created By </b> </label>
                                <div className="form-control bg-secondary text-white" >{item.userinfo.name}</div>
                            </div>

                            <div class="col-md-10 mb-3">
                                <label class="form-label"><b>Log Data</b></label>
                                <input onChange={handleLogData} type="text" class="form-control" placeholder="Enter your log data" />
                            </div>

                            <div class="col-md-10 mb-3">
                                <label class="form-label"><b>Start Time (in hrs)</b></label>
                                <input onChange={handleLogStartTime} type="time" class="form-control" />
                            </div>

                            <div class="col-md-10 mb-3">
                                <label class="form-label"><b>End Time (in hrs)</b></label>
                                <input onChange={handleEndLogTime} type="time" class="form-control" />
                            </div>

                            <div class="col-3 mt-3">
                                <button disabled = {isDemoMode} type="submit" class="btn btn-outline-info">Add Log</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogTaskAdd