import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io";
import { RxDot } from "react-icons/rx";
import {io} from 'socket.io-client';
const socket = io('http://localhost:7007');

function Nav({ parentFunction,changeFlag }) {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()
  const handleLogout = () => {
    socket.emit('logout')
    localStorage.clear()
    navigate('/Login')
  }
  const handleNotificationClick = () => {
    parentFunction()
  }
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <ul className='navbar-left-ul'>
          { auth ? <>
            <li><Link to="/">Home</Link></li>
          <li><Link to='/project'>Project</Link></li>
          <li><Link to='/task'>Task</Link></li>
          <li><Link to='/Logs'>Log</Link></li>
          <li><Link>Pending</Link></li>
          <li><Link>Details</Link></li>
          <li><Link to='/about'>About</Link></li>
          </> : <></>}
          


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
                <li className='text-white'>{auth.result.name}</li>
                <li><Link onClick={handleLogout} to='/Login' className='text-danger'>Logout</Link></li>
              </>
              : <li><Link to='/Login'>Login</Link></li>}

          </div>




        </ul>
      </div>
    </div>
  )
}

export default Nav;