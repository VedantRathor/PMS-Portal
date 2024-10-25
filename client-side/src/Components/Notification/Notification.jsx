import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import moment from 'moment';
const localhost = 'http://localhost:7007'

function Notification({loadNotification,refresh,view}) {
  
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  if (auth != null && auth != undefined) {
    name = auth.result.name
    role = auth.result.role
  }

  const [notificationData, setNotificationData] = useState() 
  useEffect( () => {
     const getNotificationData = async() =>{
       if( (auth != null && auth != undefined )&& loadNotification == true ){
        
        let response = await axios.get(`http://localhost:7007/notification/${view}`,{
          headers : {
            'Authorization' : `Bearer ${auth.result.token}`
          }
        })
        let result = await response.data 
        setNotificationData(result.result) 
        console.log(notificationData)
       }
     }
    getNotificationData()
  },[refresh])
  return (
    <div className='notification-container'>
      { notificationData != null && notificationData != undefined && notificationData.length != 0 ? 
       <>
         <table class="table table-dark table-hover mt-2" >
                <thead>   
                    <tr>
                        <th scope="col">Notification</th>
                        <th style={{width:'30%'}} scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      notificationData.map((eachNotification) => (
                        <tr style={{cursor:'initial'}}>
                          <td>{eachNotification.notification}</td>
                          <td><p>{moment(eachNotification.created_at).format('DD MMM YYYY')} {eachNotification.read == 0? <GoDotFill size={20} color='red'/> : <></>} </p></td>
                          
                        </tr>
                      ))
                    }

                </tbody>
            </table>
       </>
       : <div className='text-white'>No Notifications</div>
      }
    </div>
  )
}

export default Notification