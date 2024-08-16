import React from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import {io} from 'socket.io-client';
const socket = io('http://localhost:7007');
const localhost = "http://localhost:7007";

function ProfileComponent() {
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    let imageUrl = `${localhost}/uploaded-image/`;
    const handleLogout = () => {
        socket.emit('logout')
        localStorage.clear()
        navigate('/Login')
      }

  return (
    <div className='user-profile'>
          <div style={{width:'100%',marginTop:'3%'}} className='d-flex justify-content-center align-items-center'>
              <div className="profile-image-container">
                  {auth?.result?.profile ? <img src={`${imageUrl}${auth?.result?.profile}`} alt="Profile" className="profile-image2" /> : <img src={imageUrl} alt="Profile" className="profile-image2" />}
              </div>
          </div>
         
          
          <div className='mt-4'>
              <div>
                  <ul className='list-user'>
                      <li><u><b className='text-white'>Name:</b></u>  {auth.result.name}</li>
                      <li><u><b className='text-white'>Email:</b></u>  {auth.result.email}</li>
                      <li><u><b className='text-white'>Created By:</b></u>  Admin</li>
                      <li><u><b className='text-white'>Created At:</b></u>  {auth.result.created_at.split('T')[0]}</li>
                      <li><u><b className='text-white'>Updated At:</b></u>  {auth.result.updated_at.split('T')[0]}</li>

                  </ul>

              </div>
              <div className='logoutbtn'>
                  <Link style={{ float: 'right' }} onClick={handleLogout} to='/Login' className='text-danger'><CiLogout size={36} /></Link>
              </div>
          </div>
        
    </div>
  )
}

export default ProfileComponent