import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { BsPeopleFill } from "react-icons/bs";
const localhost = 'http://localhost:7007'

function AddMembers({ RefreshMe, project_id, OpenMember }) {
    let imageUrl = `${localhost}/uploaded-image/`;
    let auth = JSON.parse(localStorage.getItem('user')); // Parse directly when retrieving from localStorage
    const isDemoMode = localStorage.getItem('ISDEMO') === 'true';
    const navigate = useNavigate();
    useEffect( ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
          });
    },[]);
    const [selectedUsers, setSelectedUsers] = useState([]); // Use an array to store selected users
    const [remainingMemberData, setRemMemberData] = useState([]);
    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelected => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter(id => id !== userId); // Uncheck the checkbox
            } else {
                return [...prevSelected, userId]; // Check the checkbox
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedUsers.length === 0) {
            alert('Please Select the members');
            return;
        }

        try {
            for (const user_id of selectedUsers) {
                const response = await axios.post('http://localhost:7007/assignment', {
                    project_id: project_id,
                    user_id: user_id
                }, {
                    headers: {
                        Authorization: `Bearer ${auth.result.token}`
                    }
                });

                const result = await response.data;

                if (result === null) {
                    throw new Error('Some Error Occurred, Please try again later. Thank You');
                }
            }

            
            RefreshMe();
            OpenMember();   
            alert(`Members Added Successfully.`);
       
        } catch (error) {
            alert(error.message);
           
        }
    };
    const handleCrossClicked = () => {
        OpenMember();

    }

    useEffect(() => {
        const getMembersByPidNotInvolved = async () => {
            try {
                const response = await axios.get(`http://localhost:7007/project/members/not-invlolved/${project_id}`,{
                    headers:{
                        Authorization : `Bearer ${auth.result.token}`
                    }
                });
                setRemMemberData(response.data?.result);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };
        getMembersByPidNotInvolved();
    }, [project_id]);
    return (
        <div className='member-form'>
            <RxCross1 onClick={() => { handleCrossClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
            <div className='member-actual-form'>
            <h4 className='text-center text-white   '>Assign Members <BsPeopleFill size={20} color='yellow' /></h4>
            {
                remainingMemberData && remainingMemberData?.length ? (
                    <form style={{}} onSubmit={handleSubmit}>
                        <div className="">
                            <table className="table table-dark table-hover" style={{ width: '50rem' }}>
                                <thead>
                                    <tr>
                                        <th className="assign-member-table-head">EmpID</th>
                                        <th className="assign-member-table-head">Employee Name</th>
                                        <th className="assign-member-table-head">Projects on work</th>
                                        <th className="assign-member-table-head">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {remainingMemberData.map(user => (
                                        <tr key={user.user_id}>
                                            <td className="assign-member-table-head">{user.user_id}</td>
                                            <td>
                                                <div className='d-flex align-items-center gap-2'>
                                                    <div className="profile-image-container2">
                                                        {user?.profile ? <img src={`${imageUrl}${user?.profile}`} alt="Profile" className="profile-image2" /> : <img src={imageUrl} alt="Profile" className="profile-image2" />}
                                                    </div>
                                                    {user.name}
                                                </div>

                                            </td>
                                            <td className="assign-member-table-head">{user.ct}</td>
                                            <td className="assign-member-table-head">
                                                <input
                                                    style={{ marginLeft: '20px', width: '20px', height: '20px' }}
                                                    type="checkbox"
                                                    value={user.user_id}
                                                    checked={selectedUsers.includes(user.user_id)} // Check if the user is selected
                                                    onChange={() => handleCheckboxChange(user.user_id)} // Pass userId to handleCheckboxChange
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button disabled = {isDemoMode} style={{float:'right'}} className='btn btn-outline-info' type="submit">Assign</button>
                    </form>
                ) : (
                    <p>No data available or access denied</p>
                )
            }
            </div>
            
        </div>
    )
}

export default AddMembers