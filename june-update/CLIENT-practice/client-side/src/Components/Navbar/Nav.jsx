import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io";
import { RxDot } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {io} from 'socket.io-client';
import ProfileComponent from '../ProfileComponent';
const socket = io('http://localhost:7007');

function Nav({ parentFunction,changeFlag }) {
  const [viewProfile,setViewProfile] = useState(false)
  const handleprofileClicked = () =>{
    setViewProfile(!viewProfile)
    console.log(viewProfile)
  }

  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()

  const handleNotificationClick = () => {
    parentFunction()
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <ul className='navbar-left-ul'>
         <li className='logo'><a ><img className='logoimage' src='https://image.freepik.com/free-vector/service-logo-template-design-vector_20029-570.jpg'/></a></li>
          { auth ? <>
            <li><Link to="/">Home</Link></li>
          <li><Link to='/project'>Project</Link></li>
          <li><Link to='/task'>Task</Link></li>
          <li><Link to='/Logs'>Log</Link></li>
          <li><Link>Pending</Link></li>
          <li><Link>Details</Link></li>
          <li><Link to='/about'>About</Link></li>
          {auth && auth.result.role == 1 ? <li><Link to='/All-Users'>Users</Link></li>: <></>}
          </> : <h5 className='text-white text-center'>Welcome to PMS Portal, Please Login! </h5>}
          


        </ul>
      </div>
      <div className='navbar-right'>
        <ul className='navbar-right-ul'>
          <div className='d-flex gap-3'>
            {auth ?
              <>
                <li style={{ position: 'relative' }}>
                  <RxDot size={5} style={{ color: 'red', position: 'absolute', backgroundColor: 'red', borderRadius: '100px', right: '5px' }} />
                  <IoIosNotifications onClick={() => { handleNotificationClick() }} style={{ cursor: 'pointer' }} size={30} color='white' />
                </li>
                <li onClick={()=>{handleprofileClicked()}} className='text-white'><CgProfile  style={{cursor:'pointer', position:'relative'}} size={26}/>
                <div style={{visibility: viewProfile ? 'visible': 'hidden'}}><ProfileComponent/></div>
                </li>
               
              </>
              : <li><Link to='/Login'>Login</Link></li>}

          </div>




        </ul>
      </div>
    </div>
  )
}

export default Nav;