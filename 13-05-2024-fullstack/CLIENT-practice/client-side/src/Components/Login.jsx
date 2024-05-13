import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
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
      navigate('/')
    } else {
      // handle failure 
    }
  }
  return (
    <div className="login-form-main-container" >
      <div className="form-container">
      <h1>Login User</h1>
      <form onSubmit={handleForm} class="g-3 myform bg-dark text-light">
        <div class="col-md-10 mb-3">
          <label for="email" class="form-label">Email</label>
          <input onChange={handleEmail} type="email" class="form-control" id="email" />
        </div>
        <div class="col-md-10 mb-3">
          <label for="password" class="form-label">Password</label>
          <input onChange={handlePassword} type="password" class="form-control" id="password" />
        </div>

        <div class="col-12 mt-5">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
    </div>
    
  )
}
export default Login