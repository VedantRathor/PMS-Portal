import React from 'react'
import { RxCross1 } from "react-icons/rx";
function Display({ details, parentFunctionDisplayData, eachTask }) {
  return (
    <div>
      {eachTask != null ?
        <>
          <RxCross1 onClick={() => { parentFunctionDisplayData() }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
          <div><b><u>Task Name:</u></b> {eachTask.task_name}</div>
          <div><b><u>Task Details:</u></b> {eachTask.task_details}</div>
          <div><b><u>Status:</u></b> {eachTask.status}</div>
          <div><b><u>Created At:</u></b> {eachTask.created_at.split('T')[0]}</div>
          <div><b><u>Updated At:</u></b> {eachTask.updated_at.split('T')[0]}</div>

        </>
        : <><RxCross1 onClick={() => { parentFunctionDisplayData() }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
          <div><b><u>Detail:</u></b> {details}</div></>
      }

    </div>
  )
}

export default Display