import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";

import axios from 'axios';

function TaskForm({ AddTaskFORMVisibility , project_id, RefreshMe}) {
    const navigate = useNavigate()
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);
    const isDemoMode = localStorage.getItem('ISDEMO') === 'true';
    let name, role;
    if (auth != null && auth != undefined) {
      name = auth.result.name
      role = auth.result.role
    }else{
      localStorage.removeItem('user')
      navigate('/Login')
    }

    const [task_name, setTaskName] = useState('')
    const [task_details, setTaskDesc] = useState('')
    const [taskTime,setTaskTime]=  useState()
    const handleTaskName = (e) => {
        setTaskName(e.target.value)
    }
    const handleTaskDesc = (e) => {
        setTaskDesc(e.target.value)
    }
    const handleTaskTime = (e) =>{
        setTaskTime(e.target.value)
    }

    const handleCrossClicked = () => {
        AddTaskFORMVisibility();

    }

    const handleTaskForm = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post('http://localhost:7007/task', {
                project_id: project_id,
                task_name: task_name,
                task_details: task_details,
                estimate_time : taskTime
            }, {
                headers: {
                    Authorization: `Bearer ${auth.result.token}`
                }
            })
            let result = await response.data

            RefreshMe()
        AddTaskFORMVisibility()

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='task-form'>
            <RxCross1 onClick={() => { handleCrossClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
            <div className='myTaskForm'>
                <h4 className='text-center text-white   '>Add Task <FaTasks size={20} color='yellow' /></h4>
                <div>
                    <form onSubmit={handleTaskForm} className='myTaskActualForm'>
                        <div>
                            <label className='text-white'>Task Name    </label>
                            <div><input style={{ padding: '1%', marginLeft: '' }} onChange={handleTaskName} type="text" name="" required="" /></div>

                        </div>

                        <div className='mt-3'>
                            <label className='text-white'>Task Details </label>
                            <div><input style={{ padding: '1%' }} onChange={handleTaskDesc} type="text" name="" required="" /></div>

                        </div>
                        <div className='mt-3'>
                            <label className='text-white'>Estimated Time</label>
                            <div><input onChange={handleTaskTime} style={{ padding: '1%', minWidth:'100%' }} type="time" name="" required="" /></div>

                        </div>

                        <button disabled={isDemoMode} type="submit" className="btn btn-outline-info mt-3 d-flex justify-content-center align-items-center">Add <IoIosAddCircle size={20}/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm