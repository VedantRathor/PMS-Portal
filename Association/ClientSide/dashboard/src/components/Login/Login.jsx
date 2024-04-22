import axios from "axios"
import { useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"

const Login =()=> {
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if( auth != null )navigate('/')
       })
    const [uemail,setEmail]= useState('')
    const [upassword,setPassword] = useState('')
   
    const handleEmail = (e) =>{setEmail(e.target.value)}
    const handlePassword = (e) =>{setPassword(e.target.value)}
    
    const handleForm =async(e)=>{
        e.preventDefault() 
        let response =await axios.post('http://localhost:7007/Login',{   
            upassword : upassword,
            uemail : uemail
        },{headers:{
            'Content-Type':'application/json'
        }})
        let result = await response.data
        if( result.status == 'success'){
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/')
        }else{
              // handle failure 
        }
    }
     return(
    
    <div className="form-container">
    <h1>Login User</h1>
        <form onSubmit={handleForm} class="row g-3 myform">
  <div class="col-md-10">
    <label for="email" class="form-label">Email</label>
    <input onChange={handleEmail} type="email" class="form-control" id="email"/>
  </div>
  <div class="col-md-6">
    <label for="password" class="form-label">Password</label>
    <input onChange={handlePassword} type="password" class="form-control" id="password"/>
  </div>
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Login</button>
  </div>
</form>
    </div>
 )
}
export default Login