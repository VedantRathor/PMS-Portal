import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import CalendarContainer from '../Attendance/CalendarContainer';
import { RxCross1 } from "react-icons/rx";

const localhost = 'http://localhost:7007'
dayjs.extend(duration);

function AttendanceContainer() {
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);
    const isDemoMode = localStorage.getItem('ISDEMO') === 'true';
    const navigate = useNavigate();

    setTimeout(() => {
      alert(`This is a premium service, contact at vedantrathore627@gmail.com to continue.`)
      navigate('/');
    }, 2000); // 2000 milliseconds = 2 seconds

  const [date, setDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [status, setStatus] = useState('wfo');
  let [clickedDate , setClickeddate ] = useState(null) ;
  let [visibility , setVisibility ] = useState(false) ;
  let [refresh , setRefresh] = useState(false) ;
  const parentFunctionToSetDate = (received_date) => {
    setVisibility(!visibility) ;
    console.log('date' , received_date ); 
    setDate(received_date);
  }

  useEffect(() => {
    if( auth ){
        if (  checkIn && checkOut) {
            const start = dayjs(`2024-01-01T${checkIn}`);
            const end = dayjs(`2024-01-01T${checkOut}`);
            const diff = dayjs.duration(end.diff(start));
            const hours = diff.asHours();
            setTotalHours(hours);
          }
           if(status == 'leavesl' || status == 'leavecl'){
            setCheckIn('00:00');
            setCheckOut('00:00');
          }
    }else{
           navigate('/login');
    }
   
  }, [checkIn, checkOut,status]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API or process it.
    const data = { which_date:date, check_in:checkIn, check_out:checkOut, total_hours:totalHours, attendance_type:status , user_id : auth.result.user_id } ;
    let response = await axios.post(`http://localhost:7007/api/attendance-portal/mark-attendance`, data , {
        headers : {
            Authorization : `Bearer ${auth.result.token}`
        }, 
    });
    let result = await response.data ;
    if( result.status == 'success') { setRefresh(!refresh) ; }
    setVisibility(false);
  };
  
  return (
    <div className='calendar-conatiner d-flex' style={{width:'100% ', minHeight :'100%' }} >
     
      <div style={{width:'70%',height:'20%',margin:'1%'}}>
      <CalendarContainer refresh = {refresh} parentFunctionToSetDate = {parentFunctionToSetDate} />
      </div>
      { visibility ?
      <div className='backdrop'>
   <div className='attendance-form-container'>
   <RxCross1 onClick={() => { setVisibility(false) }} size={40} color='red' style={{ cursor: 'pointer', borderRadius: '20px', padding: '5px' }} />
        <form className='d-flex  flex-column gap-3' onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label text-white">Choose date</label>
            <div className="col-sm-10">
              <input
              disabled
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label text-white">Check In</label>
            <div className="col-sm-10">
              <input
                type="time"
                className="form-control"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label text-white">Check Out</label>
            <div className="col-sm-10">
              <input
                type="time"
                className="form-control"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label text-white">Total hours</label>
            <div className="col-sm-10">
              <div className="form-control">{totalHours.toFixed(2)}</div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label text-white">Status</label>
            <div className="col-sm-10">
              <div className="form-control">
                <div className="dropdown">
                  <select
                    className="dropdown"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                  
                    <option value="wfo" className="dropdown-item">Work from Office</option>
                    <option value="wfh" className="dropdown-item">Work from Home</option>
                    <option value="leavesl" className="dropdown-item">Sick leave</option>
                    <option value="leavecl" className="dropdown-item">Casual leave</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button disabled = {isDemoMode} style={{float:'right'}} type="submit" className="btn btn-outline-info">Submit</button>
            </div>
          </div>
        </form>
      </div> 
      </div>
   : <></>}
      
    
    </div>
  );
}

export default AttendanceContainer;
