import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const localhost = 'http://localhost:7007'
const AddLogForm = ({ pid, tid, item }) => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname, urole;
  if (auth != null) {
    uname = auth.result.uname
    urole = auth.result.urole
  }

  const navigate = useNavigate()
  const [logdata, setLogData] = useState()
  const [estimatedTime, setEstimatedTime] = useState()


  const handleLogData = (e) => { setLogData(e.target.value) }
  const handleLogTime = (e) => { setEstimatedTime(e.target.value) }
  const handleLogDataForm = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('taskobj')
      if (logdata == null || estimatedTime == null) {
        alert('Please Fill the Log Information correctly before submitting')
      } else {
        let resposne = await axios.post(`${localhost}/add-log/${pid}/${tid}`, {
          logdata: logdata,
          estimatedTime: estimatedTime
        }, {
          headers: {
            Authorization: `Bearer ${auth.result.token}`
          }
        })
        let result = await resposne.data
        console.log(result)
        if (result.status == 'success') {
          alert('Log Added Succesfully.')
          navigate(`/project/${pid}/tasks`)
        } else {
          alert('Log Doesnot Added. Try again')
          navigate(`/project/${pid}/tasks`)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
      <div className="addlog-form">
      <form onSubmit={handleLogDataForm} className="g-3" >
        <div className="col-md-10 mb-3">
          <label className="form-label"><b>Task Code </b></label>
          <div className="form-control" >{tid}</div>
        </div>

        <div className="col-md-10 mb-3" >
          <label className="form-label"><b>Task Name </b></label>
          <div className="form-control" >{item.tname}</div>
        </div>

        <div className="col-md-10 mb-3">
          <label className="form-label"><b>Task Desc </b> </label>
          <div className="form-control" >{item.tdesc}</div>
        </div>

        <div className="col-md-10 mb-3">
          <label className="form-label"><b>Created By </b> </label>
          <div className="form-control" >{item.userinfo.uname}</div>
        </div>

        <div class="col-md-10 mb-3">
          <label class="form-label"><b>Log Data</b></label>
          <input onChange={handleLogData} type="text" class="form-control" placeholder="Enter your log data" />
        </div>

        <div class="col-md-10 mb-3">
          <label class="form-label"><b>Estimated Time (in hrs)</b></label>
          <input onChange={handleLogTime} type="number" class="form-control" />
        </div>
        <div class="col-12 mt-3">
          <button type="submit" class="btn btn-primary">Add Log</button>
        </div>

      </form>
    </div>
    </div>
  )
}
export default AddLogForm