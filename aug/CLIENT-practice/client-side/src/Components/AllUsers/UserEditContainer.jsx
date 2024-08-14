import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import axios from 'axios';
const localhost = "http://localhost:7007";

function UserEditContainer({ ToggleUserEcVisibility,RefreshMe }) {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);

    const [changePasVisi, setChangePasVisi] = useState(false);
    const [name, setName] = useState(userDetails.name);
    const [role, setRole] = useState(userDetails.role);
    const [curPas, setCurPas] = useState();
    const [newPas, setNewPas] = useState();


    const HandleCancelClicked = () => {
        ToggleUserEcVisibility();
    }

    const HandePassWordClick = () => {
        setChangePasVisi(!changePasVisi)
    }

    const HandleNameChange = (e) => { setName(e.target.value) };
    const HandleRoleSelect = (e) => { setRole(e.target.value) };
    const HandleCurPas = (e) => { setCurPas(e.target.value) };
    const HandleNewPas = (e) => { setNewPas(e.target.value) };
    const OnFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (role == 0) {
                alert('Please Select Valid Role');
            } else {
                let response = await axios.post(`${localhost}/update-user`, {
                    name: name,
                    role: role,
                    current_password : curPas,
                    new_password : newPas ,
                    email : userDetails.email
                }, {
                    headers: {
                        "Authorization": `Bearer ${auth.result.token}`
                    }
                })
                let result = await response.data ; 
                alert(result.msg) ;
                ToggleUserEcVisibility();
                RefreshMe() ;
            }

        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className='user-edit-container'>
            <RxCross1 onClick={() => { HandleCancelClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
            <h4 className='text-white text-center d-flex justify-content-center align-items-center gap-2' >Edit User Details <CiUser size={24} color='yellow' /></h4>
            <div className='user-main-container'>
                <div className='left-user-edit-details'>
                    <form className='text-white ' onSubmit={OnFormSubmit}>
                        <div class="form-row d-flex flex-column gap-3">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Name</label>
                                <input value={name} onChange={HandleNameChange} type="text" class="form-control" placeholder="Name" />
                            </div>

                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Role</label>
                                <div class="dropdown">
                                    <select className='dropdown my-select-new' onChange={HandleRoleSelect}>
                                        <option value="0" className='dropdown-item'>Role</option>
                                        <option value="2" className='dropdown-item'>Manager</option>
                                        <option value="3" className='dropdown-item'>Employee</option>
                                    </select>
                                </div>
                            </div>
                            {changePasVisi ?
                                <div className='mt-3'>
                                    <RxCross1 onClick={() => { HandePassWordClick() }} color='red' size={20} style={{ cursor: 'pointer' }} />
                                    <form className='text-white mt-2'>
                                        <div class="form-row d-flex flex-column gap-3">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">Current Password</label>
                                                <input onChange={HandleCurPas} type="password" class="form-control" placeholder="Enter" />
                                            </div>
                                        </div>
                                        <div class="form-row d-flex flex-column gap-3 mt-2">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">New Password</label>
                                                <input onChange={HandleNewPas} type="password" class="form-control" placeholder="Enter" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                : <div className='text-danger'><span onClick={() => { HandePassWordClick() }} style={{ cursor: 'pointer' }}>
                                    want to change the <b>password?</b></span></div>}
                        </div>



                        <button type="submit" class="btn btn-success mt-4">Update</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UserEditContainer