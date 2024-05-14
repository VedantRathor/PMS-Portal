import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IoLogIn } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";

const Login = ({changeFlag}) => {
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth != null) navigate('/')
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e) => { setEmail(e.target.value) }
  const handlePassword = (e) => { setPassword(e.target.value) }

  const handleForm = async (e) => {
    e.preventDefault()
    let response = await axios.post('http://localhost:7007/Login', {
      password: password,
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let result = await response.data
    if (result.status == 'success') {
      localStorage.setItem('user', JSON.stringify(result))
      changeFlag()
      navigate('/')
    } else {
      // handle failure 
    }
  }
  return (
    <div className="login-form-main-container" >
    <div className="overlay"></div>
      <div className="form-container">
      <h1 style={{zIndex:'1'}} className="text-white d-flex align-items-center gap-2"><IoLogIn color="yellow"/> Portal Login</h1>
      <form onSubmit={handleForm} class="g-3 myform bg-dark text-light">
        <div class="col-md-10 mb-3">
          <label for="email" class="form-label d-flex align-items-center gap-1"><MdEmail size={20}/> Email</label>
          <input onChange={handleEmail} type="email" class="form-control" id="email" />
        </div>
        <div class="col-md-10 mb-3">
          <label for="password" class="form-label d-flex align-items-center gap-1"><RiLockPasswordFill size={20}/>Password</label>
          <input onChange={handlePassword} type="password" class="form-control" id="password" />
        </div>

        <div class="col-12 mt-5">
          <button type="submit" class="btn btn-primary d-flex align-items-center gap-1">Login <IoMdLogIn size={18}/></button>
        </div>
      </form>
    </div>
    </div>
    
  )
}
export default Login