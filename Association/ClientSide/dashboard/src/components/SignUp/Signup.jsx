import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = ()=>{

     const navigate = useNavigate()
     
    const [uemail,setEmail]= useState('')
    const [upassword,setPassword] = useState('')
    const [ucpassword,setcPassword] = useState('')
    const [urole,setuRole] = useState('')
    const [uname,setuname] = useState('')
    const handleEmail = (e) =>{setEmail(e.target.value)}
    const handlePassword = (e) =>{setPassword(e.target.value)}
    const handlecPassword = (e) =>{setcPassword(e.target.value)}
    const handleuName = (e)=>{setuname(e.target.value)}
    const handleuRole = (e)=>{setuRole(e.target.value)}
    const handleForm =async(e)=>{
        e.preventDefault() 
        let response =await axios.post('http://localhost:7007/register',{
            uname : uname,
            upassword : upassword,
            ucpassword:ucpassword,
            uemail : uemail,
            urole: urole,
            created_by : 0
        },{headers:{
            'Content-Type':'application/json'
        }})
        let result = await response.data
        if( result.status == 'success'){
          alert('User Added Succesfully')
           setEmail('')
           setPassword('')
           setcPassword('')
           setuRole('')
           setuname('')
           
        }else{

        }
    }
     return(
    
    <div className="form-container">
    <h1 style={{color:'black'}}>Register User</h1>
        <form onSubmit={handleForm} class="row g-3 myform">
  <div class="col-6">
    <label for="email" class="form-label">Email</label>
    <input value={uemail} onChange={handleEmail} type="email" class="form-control" id="email"/>
  </div>
  <div class="col-md-6">
    <label for="password" class="form-label">Password</label>
    <input value={upassword} onChange={handlePassword} type="password" class="form-control" id="password"/>
  </div>
  <div class="col-md-12">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input value={ucpassword} onChange={handlecPassword} type="password" class="form-control" id="cpassword"/>
  </div>
  <div class="col-md-8">
    <label for="username" class="form-label">User Name</label>
    <input value={uname} onChange={handleuName} type="text" class="form-control" id="username" />
  </div>
  <div class="col-md-3">
    <label for="role" class="form-label">Role</label>
    <input value={urole} onChange={handleuRole} type="number" class="form-control" id="role" />
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary">Register</button>
  </div>
</form>
    </div>
 )
}
export default SignUp 