import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function AllUserDisplay({ allUserData ,ToggleUserEcVisibility,ToggleEmailVisibility,email}) {
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
                            <td>{eachUser.name}</td>
                            {eachUser.role == 2 ? <td className='text-warning makelink'  onClick={()=>{handleEmailClicked(eachUser.email)}}>{eachUser.email}</td> :<td className=' makelink'  onClick={()=>{handleEmailClicked(eachUser.email)}}>{eachUser.email}</td>}
                            <td>{eachUser.created_at.split('T')[0]}</td>
                            <td>{eachUser.updated_at.split('T')[0]}</td>
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