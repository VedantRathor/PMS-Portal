import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

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
        
        let response = await axios.get(`${localhost}/notification/${view}`,{
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
         <table style={{ border: '1px solid rgb(98, 92, 92)'}} class="table table-alice table-hover">
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
                          <td><p>{eachNotification.created_at.split('T')[0]} {eachNotification.read == 0? <GoDotFill size={20} color='red'/> : <></>} </p></td>
                          
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