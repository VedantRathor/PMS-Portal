import React, { useEffect, useState }  from 'react'
import { IoIosPeople } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import AllUserDisplay from './AllUserDisplay';
import axios from 'axios';
import UserEditContainer from './UserEditContainer';
import AddUser from './AddUser';
import Email from '../Email'
import { useNavigate } from 'react-router-dom';
const localhost = 'http://localhost:7007'
import { emitEvent, listenEvent } from '../../socket';

function AllUsers() {
    const navigate = useNavigate();
    let auth =  localStorage.getItem('user') ;
    auth =  JSON.parse(auth) ;
    const [isEmitted, setIsEmitted ] = useState(false);
    useEffect( ()=>{
        const checkAuth = async () => {
            if (auth && !isEmitted) {
                     setIsEmitted(true);
                    //  emitEvent('chat-message', auth.result);
                    
            }else{
                localStorage.removeItem('user');
                navigate('/Login');
            }
        }
        checkAuth();
        return () => {
            console.log('AllUsers component unmounted');
        };
       
    },[]);
 
    const [allUserData, setAllUserData] = useState()  ;
    const [UserEcVisibility,setUserEcVisibility] = useState(false) ;
    const [AddUserVisibility, setAddUserVisibility] = useState(false) ;
    const [refreshMe , setRefreshMe] = useState(false) ;
    const [openEmail, setEmailVisibility] = useState(false);
    const [email,setEmail] = useState('')
    const [userName, setUserName] = useState('');
    const [userOrder, setuserOrder] = useState(1);
    const [userRole, setUserRole] = useState('');

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
            let response = await axios.get(`http://localhost:7007/api/allusers?userName=${userName}&&userOrder=${userOrder}&&userRole=${userRole}`,{
                headers : {
                    "Authorization" : `Bearer ${auth.result.token}`
                }
            })
            let result = await response.data  ;
            setAllUserData(result.result);
        }
        getAllUsers();
    },[refreshMe,userName, userOrder,userRole]) ;
    
    const handleUserNameChanges = (e) => {
        setUserName(e.target.value);
    }
    const handleUserOrderChanges = (e) =>{
        setuserOrder(e.target.value);
    }
    const handleUserRoleChanges = (e) => {
        setUserRole(e.target.value);
    }

    return (
        <div className='members-individual-container' style={{zIndex:'1'}}>
            
        {openEmail ?<Email ToggleEmailVisibility={ToggleEmailVisibility} email = {email} /> : <></>}
          {AddUserVisibility == true ?<AddUser RefreshMe={RefreshMe} ToggleAddUserVisibility={ToggleAddUserVisibility} />  : <></>}
            <h4 className='text-white text-center mt-2 d-flex justify-content-center align-items-center gap-2'>All Members <IoIosPeople size={30} color='yellow' /></h4>
            <div className='member-all-sorting-searching-feature'>
                <form className="form-inline my-2 my-lg-0 d-flex gap-2">
                    <input onChange={handleUserNameChanges} className="form-control mr-sm-2" type="search" placeholder="Search By Name" aria-label="Search" style={{ width: '40rem', padding: '1.4%' }} />
                    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>

                <div class="dropdown">
                    <select className='dropdown my-select' onChange={handleUserOrderChanges}>
                        <option value='' className='dropdown-item'>Sort by</option>
                        <option value='2' className='dropdown-item'>Oldest to Newest</option>
                        <option value='1' className='dropdown-item'>Newest to Oldest</option>
                    </select>
                </div>

                <div class="dropdown">
                    <select className='dropdown my-select' onChange={handleUserRoleChanges} >
                        <option value='' className='dropdown-item'>Select By Role</option>
                        <option value='2' className='dropdown-item'>Manager</option>
                        <option value='3' className='dropdown-item'>Employee</option>
                    </select>
                </div>

                <button onClick={()=>{ToggleAddUserVisibility()}} className='btn btn-outline-info d-flex justify-content-center align-items-center gap-2'>
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