import React, { useEffect, useState } from 'react'
import { emitEvent, listenEvent } from '../socket';
import axios from 'axios';



function ChatModel({project_id}) {
    
    let auth =  localStorage.getItem('user') ;
    auth =  JSON.parse(auth) ;
    const [textMessage, setTextMessage ] = useState('');
    const [projectMembers, setProjectMember] = useState();
    const [msg,setReceivedMessage] = useState('');
    useEffect( () => {

        const getProjectMembers = async () => {
            if (project_id != null) {
              const response = await axios.get(`http://localhost:7007/project-details-members/${project_id}`,{
                headers : {
                  "Authorization" : `Bearer ${auth.result.token}`
              }
              })
              const result = await response.data;
              await setProjectMember(result.result[0].assignments)
            //   console.log('project mem: ',projectMembers);
              // console.log('projectMembers',result.result[0].assignments);
            }
      
          }
          getProjectMembers();
    },[project_id])

    const handleTextChange = (e) => {
        setTextMessage(e.target.value);
        // console.log(textMessage);
    }

    const handleMessageSend = () => {
        // console.log('pro',projectMembers);
        emitEvent('chat-message', {
            userdata : auth.result,
            message : textMessage,
            projectMembers: projectMembers
        });
       
    }
    listenEvent(`receive-chat-message/${auth.result.user_id}`, (message) => {
        setReceivedMessage(message);
     });

  return (
    <>
          {projectMembers && projectMembers.length > 0 ?
                
              <div className='main-chat-model'>
                
                  <div className='message-display'>
                  {msg}
                  </div>
                  <div className='message-box'>
                      <div style={{ width: '90%' }}>
                          <input onChange={handleTextChange} style={{ width: '99%', height: '90%', padding: '4.4%', borderRadius: '2%' }} />
                      </div>
                      <button onClick={()=>{handleMessageSend()}} className='btn btn-outline-info'>
                          send
                      </button>
                  </div>
              </div>
              : <>Loading..</>
          }
    
    </>
    
  )
}

export default ChatModel