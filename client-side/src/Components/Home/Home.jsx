import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;


  useEffect(()=>{
    if (auth != null && auth != undefined) {
        name = auth.result.name
        role = auth.result.role
        document.title = `PMS | ${auth.result.company_name}`;
      }else{
         
          localStorage.removeItem('user');
          navigate('/login');
      }
      
},[])


  const navigateToProject = () =>{
    navigate('/project')
  }
  return (
    <div style={{width:'100%',height:'100%'}} className='text-center text-white '>

       {/* <img src='https://wallpaperaccess.com/full/2927403.jpg' style={{position:'absolute',width:'27%',left:'10px'}} /> */}
       <div style={{backgroundColor:' #2d3034'}} class="cover-container d-flex h-100 p-3 mx-auto flex-column home-container">
      
      <header class="masthead mb-auto">
        <div class="inner" style={{zIndex:'2'}}>
          <h3 class="masthead-brand">Explore our features</h3>
          <nav class="nav nav-masthead justify-content-center">
           
          </nav>
        </div>
      </header>

      <main role="main" class="inner cover">
        <h1 class="cover-heading">Your All In One Solution</h1>
        <p class="lead">Now Manage the project development cycle like never before.</p>
        <p class="lead">
          <a style={{cursor:'pointer'}} onClick={()=>{navigateToProject()}} class="btn btn-lg btn-outline-info">Learn more</a>
        </p>
      </main>

      <footer class="mastfoot mt-auto">
        <div class="inner">
          <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        </div>
      </footer>
    </div>
    </div>
   
  )
}

export default Home