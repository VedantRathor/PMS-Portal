import React from 'react'
import { RxCross1 } from "react-icons/rx";
function Display({ details, parentFunctionDisplayData, eachTask ,eachProjectShowData}) {
  return (
    <div>
      {eachTask != null ?
        <>
          <RxCross1 onClick={() => { parentFunctionDisplayData() }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
          <div><b><u>Task Name:</u></b> {eachTask.task_name}</div>
          <div><b><u>Task Details:</u></b> {eachTask.task_details}</div>
         {eachTask.status == 'pending' ?  <div className='text-warning'><b><u>Status:</u></b> Ongoing</div> : <div className='text-warning'><b><u>Status:</u></b> Completed!!</div>} 
          <div><b><u>Created At:</u></b> {eachTask.created_at.split('T')[0]}</div>
          <div><b><u>Updated At:</u></b> {eachTask.updated_at.split('T')[0]}</div>

        </>
        : eachProjectShowData ? 
         <>
         <RxCross1 onClick={() => { parentFunctionDisplayData() }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
          <div><b><u>Project Name:</u></b> {eachProjectShowData.project_name}</div>
          <div><b><u>Project Details:</u></b> {eachProjectShowData.project_details}</div>
          <div className='text-warning'><b><u>Status:</u></b> {eachProjectShowData.status}</div>
          <div><b><u>Created At:</u></b> {eachProjectShowData.created_at.split('T')[0]}</div>
          <div><b><u>Updated At:</u></b> {eachProjectShowData.updated_at.split('T')[0]}</div>
          

         </>
        : <><RxCross1 onClick={() => { parentFunctionDisplayData() }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
          <div><b><u>Detail:</u></b> {details}</div></>
      }

    </div>
  )
}

export default Display