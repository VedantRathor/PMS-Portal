import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IoLogIn } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { MdAppRegistration } from "react-icons/md";
import { IoCodeWorking } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


const Login = ({changeFlag}) => {
  const navigate = useNavigate();
  // const [socket, setSocket] = useState(null);


  const [showAgain,setShowAgain] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  if( showAgain){
    alert(`Use standard laptop resolution for a better UI experience.
For any query please contact at vedantrathore627@gmail.com.`);
     setShowAgain(false);
  }

  useEffect(() => {
    document.title = `PMS | Login`;
    const auth = localStorage.getItem('user');
    // const AUTH = await JSON.parse(auth);
    if (auth != null) { navigate('/'); };
  })

  const [errorRegistrationNumberMessage, setErrorRegistrationNumberMessage] = useState('');
  const [errorUniqueCodeMessage, setErrorUniqueCodeMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage ] = useState('');
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage ] = useState('');
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company_registration_number,setCompanyRegistrationNumber] = useState(0);

  const handleEmail = (e) => { setEmail(e.target.value) }
  const handlePassword = (e) => { setPassword(e.target.value) }
  const handleCompanyRegistrationNumber = (e) => { setCompanyRegistrationNumber(e.target.value)};


  const [adminRegistrationNumber, setadminRegistrationNumber ] = useState(0);
  const [adminCompanyUniqueCode, setadminCompanyUniqueCode] = useState(0) ;
  const [adminCompanyName, setadminCompanyName] = useState('') ;
  const [adminEmail, setadminEmail] = useState('') ;
  const [adminPassword, setadminPassword ] = useState('') ;
  const [adminConfirmPassword, setadminConfirmPassword ] = useState('') ;
  const [adminName, setAdminName] = useState('');

  const handleAdminRegistrationNumber = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      
      if( value.length === 6 ){
        setadminRegistrationNumber(value);
        setErrorRegistrationNumberMessage(''); // Clear any previous error
      }else{
        setErrorRegistrationNumberMessage('Enter 6 digits');
      }
     
    } else {
      setErrorRegistrationNumberMessage('enter non-negative 6-digit number');
    }
    
  };
  const handleAdminCompanyUniqueCode = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
     
      if( value.length === 5 ){
        setadminCompanyUniqueCode(value);
        setErrorUniqueCodeMessage(''); // Clear any previous error
      }else{
        setErrorUniqueCodeMessage('Enter 5 digits');
      }
     
    } else {
      setErrorUniqueCodeMessage('enter valid 5-digit number');
    }
    
  } ;

  const handleAdminCompanyName = (e) => { setadminCompanyName(e.target.value)};
  const handleAdminEmail = (e) => {setadminEmail(e.target.value)};
  const handleAdminPassword = (e) => { 
    const value = e.target.value;
    if( value && value.length < 7 ){
      setErrorPasswordMessage('Must have 7 characters');
    }else{
      setadminPassword(value);
      setErrorPasswordMessage('');
    }
   
  };
  const handleAdminConfirmPassword = (e) => { 
    const value = e.target.value;
    if( value === adminPassword){
      setadminConfirmPassword(value);
      setErrorConfirmPasswordMessage('');
    }else{
      setErrorConfirmPasswordMessage('Passwords are not matching');
    }
   
  };
  const handleAdminName = (e) => {setAdminName(e.target.value)};

  const handleForm = async (e) => {
    e.preventDefault()
    let response = await axios.post('http://localhost:7007/Login', {
      company_registration_number : parseInt(company_registration_number),
      password: password,
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let result = await response.data
    if (result.status == 'success') {
      localStorage.setItem('user', JSON.stringify(result))
      localStorage.setItem('ISDEMO','false');
      // console.log('first:',result);
      changeFlag();
      navigate('/');
      // document.title = `PMS | ${result.result.company_name}`;
    } else {
      // handle failure 
      alert(`${result.msg}`);
    }
  }

  const handleAdminForm = async (e) => {
    e.preventDefault() ;
    if( errorRegistrationNumberMessage || errorUniqueCodeMessage || errorPasswordMessage || errorConfirmPasswordMessage ){
      alert('Something went wrong, Try again with correct credentials');
    }else{
      let response = await axios.post('http://localhost:7007/api/company-controller/register-company', {
        company_name: adminCompanyName,
        company_registration_number: +adminRegistrationNumber,
        company_unique_id: +adminCompanyUniqueCode,
        admin_name: adminName,
        admin_email : adminEmail,
        password:adminPassword,
        ucpassword:adminConfirmPassword
        // email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let result = await response.data;
      if (result.status == 'success') {
        localStorage.setItem('user', JSON.stringify(result));
        localStorage.setItem('ISDEMO','false');
        // document.title = `PMS | ${result.result.company_name}`;
        changeFlag();
        
        navigate('/');
        
      } else {
        // handle failure 
        alert(`${result.msg}`);
      }
    }

  } 

  const handleClickedDemo = async() => {
    
    let response = await axios.post('http://localhost:7007/Login', {
      company_registration_number : parseInt(983211),
      password: '123',
      email: 'larry22@gmail.com'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let result = await response.data
    if (result.status == 'success') {
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('ISDEMO','true');
      changeFlag();
      navigate('/');
      
    } else {
      // handle failure 
      alert(`Some error occured in demo environment`);
    }
  }

  const handleCrossClicked = () => {
    setShowVideo(false);
  }

  return (
    <div className="login-form-main-container" >
      {showVideo ?  <div className="overlay2">
      <b onClick={()=>{handleCrossClicked()}}><  RxCross1 size={25} color="red" style={{cursor:'pointer',margin:'1%',fontWeight:'100px'}}/></b> <h1 className="text-white text-center ">Welcome!</h1>
        <div>
         
          <div className="d-flex justify-content-center align-items-center">
          <video  controls autoPlay muted style={{ width: '60%',height:'36%' }}>
            <source src="http://localhost:7007/uploaded-image/1729524813432-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          
        </div>
       
      </div> : <></>}
     
      <div className="overlay"></div>
         <div className="d-flex justify-content-center align-items-center" style={{zIndex:'1',position:'absolute', left:'0', right:'0', top:'10px'}}>  
          <h3 style={{width:'20%'}} className="text-center text-white">Try with demo data</h3>
          <button onClick={()=>{handleClickedDemo()}} className="btn btn-outline-info rotating-border-btn">
                CHECK OUT !!!
           </button>
        </div>
        <br></br>
        <br></br>
        <br></br>

      <div className="form-container ">

        <form onSubmit={handleForm} class="g-3 myform bg-dark text-light mt-3">
          <h3 style={{ zIndex: '1' }} className="text-white d-flex align-items-center gap-2"><IoLogIn color="yellow" /> Portal Login</h3>
          <div class="col-md-10 mb-3">
            <label for="company_registration_number" class="form-label d-flex align-items-center gap-1"><MdAppRegistration size={21} color="pink"/>Registration Number</label>
            <input onChange={handleCompanyRegistrationNumber} class="form-control" id="company_registration_number" required />
          </div>

          <div class="col-md-10 mb-3">
            <label for="email" class="form-label d-flex align-items-center gap-1"><MdEmail size={20} /> Email</label>
            <input onChange={handleEmail} type="email" class="form-control" id="email" required />
          </div>
          <div class="col-md-10 mb-3">
            <label for="password" class="form-label d-flex align-items-center gap-1"><RiLockPasswordFill size={20} />Password</label>
            <input onChange={handlePassword} type="password" class="form-control" id="password" required />
          </div>

          <div class="col-12 mt-5 ">
            <button type="submit" class="btn btn-outline-info d-flex align-items-center gap-1">Login <IoMdLogIn size={18} /></button>

          </div>
        </form>

        <form onSubmit={handleAdminForm} class="g-3 myform22 bg-dark text-light mt-3">
          <h3 style={{ zIndex: '1' }} className="text-white d-flex align-items-center gap-2"><IoLogIn color="yellow" /> Portal Registration</h3>
          <div className="d-flex gap-4 align-items-center">
            <div class="col-md-7 mb-3">
              <label for="adminRegistrationNumber" class="form-label d-flex align-items-center gap-1"><MdAppRegistration size={21} color="pink"/>Registration Number</label>
              <input type="number" onChange={handleAdminRegistrationNumber} class="form-control" id="adminRegistrationNumber" required />
              {errorRegistrationNumberMessage && <p style={{ color: 'red' }}>{errorRegistrationNumberMessage}</p>}
            </div>
            <div class="col-md-4 mb-3">
              <label for="adminCompanyUniqueCode" class="form-label d-flex align-items-center gap-1"><IoCodeWorking size={24}/> Unique Code</label>
              <input type="number"  onChange={handleAdminCompanyUniqueCode} class="form-control" id="adminCompanyUniqueCode" required />
              {errorUniqueCodeMessage && <p style={{ color: 'red' }}>{errorUniqueCodeMessage}</p>}
            </div>

          </div>

          <div className="d-flex gap-4 align-items-center mb-2">
            <div class="col-md-4 mb-3">
              <label for="adminCompanyName" class="form-label d-flex align-items-center gap-1"><MdDriveFileRenameOutline size={20}/>Company Name</label>
              <input onChange={handleAdminCompanyName} type="text" class="form-control" id="adminCompanyName" required />
            </div>


            <div class="col-md-7 mb-3">
              <label for="handleAdminEmail" class="form-label d-flex align-items-center gap-1"><MdEmail size={20} /> Your Email</label>
              <input onChange={handleAdminEmail} type="email" class="form-control" id="handleAdminEmail" required />
            </div>
          </div>

          <div className="d-flex gap-4 align-items-center">
          <div class="col-md-5 mb-3">
              <label for="adminName" class="form-label d-flex align-items-center gap-1"><IoPersonCircle size={20}/>Your Name </label>
              <input onChange={handleAdminName} type="text" class="form-control" id="adminName" required />
             
            </div>

            <div class="col-md-3 mb-3">
              <label for="adminPassword" class="form-label d-flex align-items-center gap-1"><RiLockPasswordFill size={20} />Password</label>
              <input onChange={handleAdminPassword} type="text" class="form-control" id="adminPassword" required />
              {errorPasswordMessage && <p style={{ color: 'red' }}>{errorPasswordMessage}</p>}
            </div>

            <div class="col-md-3 mb-3">
              <label for="adminConfirmPassword" class="form-label d-flex align-items-center gap-1"><RiLockPasswordFill size={20} />Confirm Password</label>
              <input onChange={handleAdminConfirmPassword} type="text" class="form-control" id="adminConfirmPassword" required />
              {errorConfirmPasswordMessage && <p style={{ color: 'red' }}>{errorConfirmPasswordMessage}</p>}
            </div>
          </div>


          <div class="col-12 mt-4 ">
            <button type="submit" class="btn btn-outline-info d-flex align-items-center gap-1">Register Company </button>

          </div>
        </form>

      </div>


    </div>
    
  )
}
export default Login