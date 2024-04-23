import axios from "axios"
import { useNavigate } from "react-router-dom"
const localhost = 'http://localhost:7007'

const EachLog = ({ eachLog, parentFunction, item , pid, tid ,flag}) => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname , urole ; 
  if( auth != null ){
     uname = auth.result.uname
     urole = auth.result.urole
  }
 const navigate = useNavigate()

  const handleBtnClicked = async (lid, logstatus) => {
    try {
      console.log(lid, logstatus)
      let response = await axios.post(`${localhost}/update-log-status`,{
           lid : lid ,
           logstatus : logstatus
      },{
          headers : {
            Authorization : `Bearer ${auth.result.token}`
          }
      })
      let result = await response.data ;
      if( result != null ){
        alert('status updated succesfully...')
         parentFunction()
      
      }else{
        alert('Some Error Occured')
        navigate('/')
      }

    } catch (error) {
     console.log(error)
     navigate('/')
    }
  }

  return (
    <tr >
      <>
        <td>{item.tid}</td>
        <td>{item.tname}</td>
        <td>{item.tdesc}</td>
        <td>{eachLog.logdata}</td>
        <td>{eachLog.createdAt.split('T')[0]}</td>
        <td>{eachLog.userinfo.uname}</td>
        <td>{eachLog.logstatus}</td>
      
       {
        urole == 3 ?
           <>
           {
            eachLog.logstatus == 'pending' ?
              <td style={{color:'green'}}><b>Updation Pending</b></td>
            : <td>{eachLog.updatedAt.split('T')[0]}</td>
           } 
           </>
        : <>
            {eachLog.logstatus == 'pending' ?
          <div style={{ display: "flex", flexDirection: 'column', gap: '15px' }}>
            <button onClick={() => { handleBtnClicked(eachLog.lid, "approved") }} className="btn btn-success">Approve</button>
            <button onClick={() => { handleBtnClicked(eachLog.lid, "rejected") }} className="btn btn-danger">Reject</button>

          </div>
          :
          <td>Checked</td>
          }
         </>
       }
        

      </>
    </tr>

  )
}
export default EachLog