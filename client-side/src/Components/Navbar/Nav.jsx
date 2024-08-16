import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io";
import { RxDot } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {io} from 'socket.io-client';
import ProfileComponent from '../ProfileComponent';
const socket = io('http://localhost:7007');
import BlurIn from "../../Components/magicui/blur-in" ;
import { Clock } from 'lucide-react';
import ClockShow from '../TIMER';
import { CiClock1 } from "react-icons/ci";
import { CiText } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa";

function Nav({ parentFunction,changeFlag,toggleAIDialogBox , toggleAIGPTIDalogBox }) {
  const [viewProfile,setViewProfile] = useState(false)
  const handleprofileClicked = () =>{
    setViewProfile(!viewProfile)
    console.log(viewProfile)
  }

  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const navigate = useNavigate()

  const handleNotificationClick = () => {
    parentFunction();
  }

  const handleAskAIClicked = () =>{
    toggleAIDialogBox() ; 
  }
  const handleAskGPTClicked = () =>{
    toggleAIGPTIDalogBox() ; 
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
        <li  style={{float:'right', marginBottom:'4%'}}>
        <div className='d-flex justify-content-center align-items-center gap-1 '>
          <CiClock1 className='text-info' color='white' size={27}/>
          <ClockShow />
        </div>

        </li>
        <ul style={{clear:'both'}} className='navbar-right-ul'>
          <div className='d-flex gap-3'>
            {auth ?
              <>
              
              <li onClick={() => {handleAskGPTClicked()}}  >
              <div className='' style={{borderRadius:'50%'}}><CiText style={{cursor:'pointer'}} color='white' size={25}/></div> 
              </li>

              <li onClick={() => {handleAskAIClicked()}}  >
              <div className='' style={{borderRadius:'50%'}}><FaFilePdf style={{cursor:'pointer'}} color='white' size={25}/></div> 
              </li>

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