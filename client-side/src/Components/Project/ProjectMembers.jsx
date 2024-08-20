import React, { useState } from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import DIALOG_CHART from '../DIALOG/DIALOG_CHART';
const localhost = 'http://localhost:7007'

function ProjectMembers({projectMembers,ToggleEmailVisibility}) {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [hoveredMemberID , sethoveredMemberID] = useState(0);
  
  let imageUrl = `${localhost}/uploaded-image/`;
  const navigate = useNavigate();
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  let name, role;
  if (auth != null && auth != 'undefined') {
    name = auth.result.name
    role = auth.result.role
  }else{
    localStorage.removeItem('user')
    navigate('/Login')
  }
  

  const handleEmailClicked = (email) =>{
     ToggleEmailVisibility(email);
  };
   
  const handleMouseEnter = (e, member) => {
   setHoveredMember(member);
    sethoveredMemberID(member.userinfo.user_id);
    console.log('first',member,member.userinfo.user_id);
};

  const handleMouseLeave = () => {
    setHoveredMember(null);
    sethoveredMemberID(null);
  };

  return (
    <>
        <table style={{ border: '1px solid rgb(98, 92, 92)',width:'47%'}} class="table table-dark table-hover">
        <thead>
           
              <h5 style={{paddingLeft:'10px',color:'white',backgroundColor:'',marginBottom:'0px'}} >Project Members <IoIosPeople size={40} color='yellow' style={{borderRadius:'1px',background:'transparent'}}/></h5>
            
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th> 
                <th className='text-warning' scope="col">Performance</th>    
            </tr>

        </thead>
        <tbody>
          {projectMembers.map((eachMember) => {
            const approvedCount = parseInt(eachMember?.userinfo?.logtrack?.approved_count) || 0;
            const rejectedCount = parseInt(eachMember?.userinfo?.logtrack?.rejected_count) || 0;
            const pendingCount = parseInt(eachMember?.userinfo?.logtrack?.pending_count) || 0;

            const totalCount = approvedCount + rejectedCount;

            // Calculate percentage and limit to 2 decimal places
            const approvalPercentage = totalCount > 0
              ? ((approvedCount / totalCount) * 100).toFixed(2)
              : '0.00';

              return (
                <tr key={eachMember.userinfo.id}
                onMouseEnter={(e) => handleMouseEnter(e, eachMember)} 
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative' }}
                >

                  <td>
                    <div className='d-flex align-items-center gap-2'>
                      <div className="profile-image-container2">
                        {eachMember?.userinfo?.profile ? (
                          <img src={`${imageUrl}${eachMember?.userinfo?.profile}`} alt="Profile" className="profile-image2" />
                        ) : (
                          <img src={imageUrl} alt="Profile" className="profile-image2" />
                        )}
                      </div>
                      {eachMember.userinfo.name}
                    </div>
                  </td>
                  <td>
                    <p className='makelink' onClick={() => handleEmailClicked(eachMember.userinfo.email)}>
                      {eachMember.userinfo.email}
                    </p>
                  </td>
                  <td>{eachMember.created_at.split('T')[0]}</td>
                  <td>{eachMember.updated_at.split('T')[0]}</td>
                  <td style={{cursor:'pointer'}} className=' text-warning text-center'>
                  {hoveredMemberID == eachMember.userinfo.user_id  && (
                      <DIALOG_CHART 
                        name = {eachMember.userinfo.name}
                        rejectedCount = {rejectedCount}
                        approvedCount = {approvedCount}
                        pendingCount = {pendingCount}
                        />
                    )}
                  {approvalPercentage}%</td>
                </tr>
              );
          })}

        </tbody>

    </table>
    </>
  )
}

export default ProjectMembers