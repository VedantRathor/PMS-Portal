import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const localhost = 'http://localhost:7007'
const EachProjectCard = ({ eachPro ,parentFunction}) => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname, urole;
  if (auth != null) {
    uname = auth.result.uname
    urole = auth.result.urole
  }
  const navigate = useNavigate()
  const handleCardClick = (pid) => {
    navigate(`/project/${pid}`)
  }
  const handleCompleteBtnClicked = async(pid,pname) =>{
     let response = await axios.post(`${localhost}/project-update/${pid}`,{
       status : 'completed'
     },{
      headers : {
        Authorization : `Bearer ${auth.result.token}`
      }
     })
     let result = await response.data 
     if( result.status == 'unsuccess'){
      alert('Error! Cannot be updated')
     }else{
     
      alert(`Project: ${pname} 
      Marked as Completed`)
      parentFunction()
     }
  }

  return (

    <>
      <div id={eachPro.pid} className="card each-project-sidebar-card" >
        <div className="card-body each-project-sidebar-card-body">
          <div className='d-flex justify-content-between'>
            <h5 className="card-title">{eachPro.pname}</h5>
            {urole == 3 ?
              (
                <div className='d-flex gap-3'>
                  <p style={{ color: 'green' }}><b>Manager: </b>{eachPro.userinfo.uname}</p>
                  <p style={{ color: 'green' }}><b>Assigned At: </b>{eachPro.assignments[0].createdAt.split('T')[0]}</p>

                </div>
              )
              : (urole == 1 && eachPro.status == 'pending') ? <button onClick={() => { handleCompleteBtnClicked(eachPro.pid,eachPro.pname) }} style={{ borderRadius: '20px', padding: '7px' }} className='btn btn-success'>completed</button> : <></>
            }
          </div>
          <h6 className="card-text"><b>Status :</b>{eachPro.status}</h6>
          <p className="card-text"><b>Description: </b>{eachPro.pdesc}</p>
          <p className="card-text"><b>Created At :</b>{eachPro.createdAt.split('T')[0]}</p>
          <p className="card-text"><b>Updated At :</b>{eachPro.updatedAt.split('T')[0]}</p>
          <p onClick={() => { handleCardClick(eachPro.pid) }} className="card-link link">View More</p>
        </div>
      </div>
      <hr />
    </>




  )
}
export default EachProjectCard