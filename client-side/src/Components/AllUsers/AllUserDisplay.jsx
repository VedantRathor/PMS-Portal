import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const localhost = 'http://localhost:7007'
import moment from 'moment';
function AllUserDisplay({ allUserData ,ToggleUserEcVisibility,ToggleEmailVisibility,email}) {
    let imageUrl = `${localhost}/uploaded-image/`;
    const HandleEditButtonClicked = (eachUser) => {
        localStorage.setItem('userDetails', JSON.stringify(eachUser));
        ToggleUserEcVisibility();
    }

    const handleEmailClicked = (email) =>{
        ToggleEmailVisibility(email);
     }

    return (
        <>
            <table style={{ border: '1px solid rgb(98, 92, 92)' }} class="table table-dark table-hover">
                <thead>
                    <tr>

                        <th scope="col">Name</th>
                        <th scope="col" className='text d-flex align-center ' style={{ textDecoration: '', }}>Email </th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Role</th>
                        <th className='text-center' scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {allUserData.map((eachUser) => (
                        <tr>
                            <td>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className="profile-image-container2">
                                        {eachUser?.profile ? <img src={`${imageUrl}${eachUser?.profile}`} alt="Profile" className="profile-image2" /> : <img src={imageUrl} alt="Profile" className="profile-image2" />}
                                    </div>
                                    {eachUser.name}
                                </div>

                            </td>
                            {eachUser.role == 2 ? <td className='text-warning makelink'  onClick={()=>{handleEmailClicked(eachUser.email)}}>{eachUser.email}</td> :<td className=' makelink'  onClick={()=>{handleEmailClicked(eachUser.email)}}>{eachUser.email}</td>}
                            <td>{moment(eachUser.created_at).format('DD MMM YYYY')}</td>
                            <td>{moment(eachUser.updated_at).format('DD MMM YYYY')}</td>
                            {eachUser.role == 2 ? <td className='text-warning'>Manager</td> : <td>Employee</td>}
                            <td className='text-center' ><FiEdit onClick={() => { HandleEditButtonClicked(eachUser) }} style={{ cursor: 'pointer' }} size={22} color='lightGreen' />  <MdDelete size={25} color='
                            red' style={{ marginLeft: '5%', cursor: 'pointer' }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AllUserDisplay