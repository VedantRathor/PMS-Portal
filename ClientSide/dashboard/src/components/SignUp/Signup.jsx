import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = ()=>{

     const navigate = useNavigate()
     useEffect(()=>{
      const auth = localStorage.getItem('user')
      if( auth != null )navigate('/')
     })
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
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/')
        }else{

        }
    }
     return(
    
    <div className="form-container">
    <h1>Register User</h1>
        <form onSubmit={handleForm} class="row g-3 myform">
  <div class="col-md-6">
    <label for="email" class="form-label">Email</label>
    <input onChange={handleEmail} type="email" class="form-control" id="email"/>
  </div>
  <div class="col-md-6">
    <label for="password" class="form-label">Password</label>
    <input onChange={handlePassword} type="password" class="form-control" id="password"/>
  </div>
  <div class="col-md-12">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input onChange={handlecPassword} type="password" class="form-control" id="cpassword"/>
  </div>
  <div class="col-md-8">
    <label for="username" class="form-label">User Name</label>
    <input onChange={handleuName} type="text" class="form-control" id="username" />
  </div>
  <div class="col-md-2">
    <label for="role" class="form-label">Role</label>
    <input onChange={handleuRole} type="number" class="form-control" id="role" />
  </div>

 
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
    </div>
 )
}
export default SignUp 