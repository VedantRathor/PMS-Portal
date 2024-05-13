import axios, { AxiosHeaders } from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function AddProject() {
    
    const navigate = useNavigate()
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    let name, role;
    console.log(auth)
    if (auth != null && auth != 'undefined') {
      name = auth.result.name
      role = auth.result.role
    }else{
      localStorage.removeItem('user')
      navigate('/Login')
    }

    const handleAddprojectClicked = async() =>{
        
        // save to the data base ! 
        // add data in notification table ! 
        // emit a event to particular manager 
        let response= await axios.post('http://localhost:7007/add-new-project', {
            project_name : 'delete',
            project_details : 'delete',
            manager_id:2,
        },{
            headers : {
                'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTcxNTU3Njk1NywiZXhwIjoxNzE1NzQ5NzU3fQ.ZdxzDUGYBGF3gRR4X2UPJsKBR7HAcgdf6VcVuaMlSmA'
            }
        })
        let result = await response.data 
        console.log(result)
        
    }
  return (
   <button onClick={() => {handleAddprojectClicked()}}>add project</button>
  )
}

export default AddProject