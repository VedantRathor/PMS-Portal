import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';
const localhost = "http://localhost:7007";

function AddUser({ ToggleAddUserVisibility , RefreshMe}) {
    let auth = localStorage.getItem('user')
    const isDemoMode = localStorage.getItem('ISDEMO') === 'true';
    auth = JSON.parse(auth)

    const [name,setName] = useState() ; 
    const [email,setEmail] = useState(); 
    const [cpassword, setCPassword ] = useState() ;
    const [ucpassword, setUCPassword ] = useState() ;
    const [role, setRole ] = useState() ;
    const [aboutUser,setAboutUser ] = useState() ;

    const handleName = (e) => {setName(e.target.value)} ;
    const handleEmail = (e) => {setEmail(e.target.value)} ;
    const handleCPassword = (e) => {setCPassword(e.target.value)} ;
    const handleUCPassword = (e) => {setUCPassword(e.target.value)} ;
    const handleRole = (e) => {setRole(e.target.value)} ;
    const handleAboutUser = (e) => {setAboutUser(e.target.value)} ;

    const handleAddUserForm = async(e) => {
        e.preventDefault();
        try {
            console.log(name,email,cpassword,ucpassword,role,aboutUser);
            if( role == undefined || role == 0 ){
                alert("Please Select Role")
            }else{
                let response = await axios.post(`http://localhost:7007/register`,{
                    name : name,
                    email : email,
                    password : cpassword,
                    ucpassword : ucpassword,
                    role : Number(role),
                    aboutUser : aboutUser
                },{
                    headers : {
                        "Authorization" : `Bearer ${auth.result.token}`
                    }
                })
                let result = await response.data ;
                alert(result.msg);
                ToggleAddUserVisibility();
                RefreshMe();
            }

        } catch (error) {
            alert(error); 
            
        }
    }
    const HandleCancelClicked = () => {
        ToggleAddUserVisibility();
    }
    return (
        <div className='AddUser-Edit-Container'>
         
            <RxCross1 onClick={() => { HandleCancelClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
            <h4 className='text-white text-center d-flex justify-content-center align-items-center gap-2'>Register User <FaRegUser color='yellow' /></h4>
            <div className='adduser-form-container-Outer'>
                <div className='adduser-form-container'>
                    <form onSubmit={handleAddUserForm} className='d-flex flex-column justify-content-center gap-3 text-white'>

                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label d-flex justify-content-center align-items-center gap-1">Name <MdDriveFileRenameOutline size={22} color='yellow'/></label>
                            <div class="col-sm-10">
                                <input onChange={handleName} type="text" class="form-control" id="inputEmail3" placeholder="Enter Name" />
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label for="inputEmail3" class="col-sm-2 col-form-label d-flex justify-content-center align-items-center gap-1">Email <MdAttachEmail size={20} color='yellow'/></label>
                            <div class="col-sm-10">
                                <input onChange={handleEmail} type="email" class="form-control" id="inputEmail3" placeholder="Email" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label d-flex justify-content-center align-items-center gap-1">Pass<RiLockPasswordLine size={20} color='yellow'/></label>
                            <div class="col-sm-10">
                                <input onChange={handleCPassword} type="password" class="form-control" id="inputPassword3" placeholder="Password" />
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center align-items-center">
                            <label for="inputPassword3" class="col-sm-2 col-form-label d-flex justify-content-center align-items-center gap-1">Confirm <RiLockPasswordLine size={25 } color='yellow'/></label>
                            <div class="col-sm-10">
                                <input onChange={handleUCPassword} type="password" class="form-control" id="inputPassword3" placeholder="Confirm Password" />
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center align-items-center">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Role</label>
                            <div class="col-sm-10">
                                <div class="dropdown">
                                    <select className='dropdown my-select-new' onChange={handleRole} >
                                        <option value='0' className='dropdown-item'>Choose Role</option>
                                        <option value='2' className='dropdown-item'>Manager</option>
                                        <option value='3' className='dropdown-item'>Employee</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center align-items-center">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">About</label>
                            <div class="col-sm-10">
                                <input onChange={handleAboutUser} type="text" class="form-control" id="inputPassword3" placeholder="Enter About User" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button disabled={isDemoMode} type="submit" class="btn btn-outline-info" style={{minWidth:'30%',marginLeft:'20%'}}>Add User</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser