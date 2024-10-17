import React, { useEffect, useState }  from 'react'
import { IoIosPeople } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import AllUserDisplay from './AllUserDisplay';
import axios from 'axios';
import UserEditContainer from './UserEditContainer';
import AddUser from './AddUser';
import Email from '../Email'
const localhost = 'http://localhost:7007'


function AllUsers() {
    let auth = localStorage.getItem('user') ;
    auth = JSON.parse(auth) ;
    const [allUserData, setAllUserData] = useState()  ;
    const [UserEcVisibility,setUserEcVisibility] = useState(false) ;
    const [AddUserVisibility, setAddUserVisibility] = useState(false) ;
    const [refreshMe , setRefreshMe] = useState(false) ;
    const [openEmail, setEmailVisibility] = useState(false);
    const [email,setEmail] = useState('')


    const ToggleUserEcVisibility = () =>{
        setUserEcVisibility(!UserEcVisibility);
        setAddUserVisibility(false);
    }

    const ToggleAddUserVisibility = () =>{
        setAddUserVisibility(!AddUserVisibility);
        console.log(AddUserVisibility);
        setUserEcVisibility(false) ;
    }

    const RefreshMe  = () => {
        setRefreshMe(!refreshMe) ; 
    }

    
    const ToggleEmailVisibility = (email) =>{
      setEmailVisibility(!openEmail);
      setEmail(email) ; 
      console.log(openEmail,email) ;
    }
    
    useEffect( ()=>{
        const getAllUsers = async() =>{
            let response = await axios.get(`${localhost}/api/allusers`,{
                headers : {
                    "Authorization" : `Bearer ${auth.result.token}`
                }
            })
            let result = await response.data  ;
            setAllUserData(result.result);
        }
        getAllUsers()
    },[refreshMe]) ;


    return (
        <div className='members-individual-container' style={{zIndex:'1'}}>
            
        {openEmail ?<Email ToggleEmailVisibility={ToggleEmailVisibility} email = {email} /> : <></>}
          {AddUserVisibility == true ?<AddUser RefreshMe={RefreshMe} ToggleAddUserVisibility={ToggleAddUserVisibility} />  : <></>}
            <h4 className='text-white text-center mt-2 d-flex justify-content-center align-items-center gap-2'>All Members <IoIosPeople size={30} color='yellow' /></h4>
            <div className='member-all-sorting-searching-feature'>
                <form className="form-inline my-2 my-lg-0 d-flex gap-2">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search By Name" aria-label="Search" style={{ width: '40rem', padding: '1.4%' }} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <div class="dropdown">
                    <select className='dropdown my-select' >
                        <option className='dropdown-item'>Sort by</option>
                        <option className='dropdown-item'>Oldest to Newest</option>
                        <option className='dropdown-item'>Newest to Oldest</option>
                    </select>
                </div>

                <div class="dropdown">
                    <select className='dropdown my-select' >
                        <option className='dropdown-item'>Select By Role</option>
                        <option className='dropdown-item'>Manager</option>
                        <option className='dropdown-item'>Employee</option>
                    </select>
                </div>

                <button onClick={()=>{ToggleAddUserVisibility()}} className='btn btn-success d-flex justify-content-center align-items-center gap-2'>
                    Register User <CiUser size={20} color='yellow'/>
                </button>

            </div>
            <div className='members-show-container'>
              {UserEcVisibility ? <UserEditContainer RefreshMe={RefreshMe} ToggleUserEcVisibility={ToggleUserEcVisibility} /> : <></>} 
               {auth && auth.result.role == 1 && allUserData ? <AllUserDisplay email={email} ToggleEmailVisibility={ToggleEmailVisibility} ToggleUserEcVisibility={ToggleUserEcVisibility} allUserData={allUserData}/> : <></>} 
            </div>
        </div>
    )
}

export default AllUsers