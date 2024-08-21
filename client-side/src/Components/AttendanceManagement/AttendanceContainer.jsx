import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const localhost = 'http://localhost:7007'
dayjs.extend(duration);

function AttendanceContainer() {
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);
    const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [status, setStatus] = useState('n');

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
    let response = await axios.post(`${localhost}/api/attendance-portal/mark-attendance`, data , {
        headers : {
            Authorization : `Bearer ${auth.result.token}`
        }, 
    });
    let result = await response.data ;
    console.log('result' , result);
  };
  return (
    <div>
      <form className='attendance-form-container' onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Choose date</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Check In</label>
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
          <label className="col-sm-2 col-form-label">Check Out</label>
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
          <label className="col-sm-2 col-form-label">Total hours</label>
          <div className="col-sm-10">
            <div className="form-control">{totalHours.toFixed(2)}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Status</label>
          <div className="col-sm-10">
            <div className="form-control">
              <div className="dropdown">
                <select
                  className="dropdown"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="n" className="dropdown-item">Status</option>
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
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AttendanceContainer;
