import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const localhost = 'http://localhost:7007';

import dayjs from 'dayjs';

// Format the date
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'rgb(106, 255, 101)';
    case 'rejected':
      return 'rgb(255, 146, 146)';
    case 'pending':
      return 'rgb(255, 247, 154)';
    default:
      return '#d3bfbf'; // Default for initial or unknown status
  }
};

const CalendarContainer = ({parentFunctionToSetDate,refresh}) => {
   
 

  const [attendanceData, setAttendanceData] = useState([]);

 useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        let auth = await localStorage.getItem('user');
        auth = await JSON.parse(auth);
      
        const response = await axios.get(`${localhost}/api/attendance-portal/get-attendance`, 
            {
              headers: {
                Authorization: `Bearer ${auth.result.token}`,
                'Content-Type': 'application/json' // Ensure this header is set
              }
            }
          );
        const data = await response.data; // Assuming data is an array of objects
        setAttendanceData(data.result); // Ensure this is an array
        // setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [refresh]);

  const handleDateClick = (arg) => {
    console.log('first,',arg);
    if (arg.dayEl.classList.contains('weekend-cell')) {
      return; // Do nothing if it's a weekend
    }
    parentFunctionToSetDate(arg.dateStr);
    // Example: Add an event on the clicked date
    // setEvents([...events, { title: 'New Event', date: arg.dateStr }]);
  };

  const getDayClassNames = (arg) => {
    const day = arg.date.getDay();
    if (day === 0 || day === 6) { // 0 = Sunday, 6 = Saturday
      return ['weekend-cell']; // Add custom class for weekends
    } else {
      return ['weekday-cell']; // Add custom class for weekdays
    }
  };

  const renderDayCellContent = (arg) => {
   
    const day = arg.date.getDay();
    const dateStr = formatDate(arg.date);

    // Find the status for the current date
    const attendance = attendanceData.find(item => formatDate(new Date(item.which_date)) === dateStr);
    console.log('first',attendance);
    const status = attendance ? attendance.status : ''; // Default to 'pending' if not found

    // Get color based on status
    const cellColor = getStatusColor(status);
    console.log(`Rendering cell for ${attendance} with status ${status} and color ${cellColor}`);
    return (
      <>
           {day == 0 || day == 6 ? 
                <div style={{   backgroundColor: 'grey', width : '100%',height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '5px' }}>
                    <div className='date-number' style={{ alignSelf: 'flex-end', color: 'black' }}>
                      {arg.dayNumberText}
                    </div>
                    <div className='day-heading' style={{ fontWeight: 'bold', color: 'darkgreen', backgroundColor:'#212529 !important'}}>
                      {day !== 0 && day !== 6 ? 'Work Day' : 'Week Off'}
                    </div>
                    <div className='shift-time' style={{ fontSize: '0.85em', color: 'black' }}>
                      7:00 - 22:00
                    </div>
        
                </div>
                :  
              <div style={{ backgroundColor: cellColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '5px' }}>
                <div className='date-number' style={{ alignSelf: 'flex-end', color: 'black' }}>
                  {arg.dayNumberText}
                </div>
                <div className='day-heading' style={{ fontWeight: 'bold', color: 'darkgreen', backgroundColor: '#212529 !important' }}>
                  {day !== 0 && day !== 6 ? 'Work Day' : 'Week Off'}
                 
                  {attendance ? attendance.attendance_type == 'wfo' || attendance.attendance_type == 'wfh' ? 
                     <div style={{fontSize:'0.8rem'}} className='d-flex  flex-column  align-items-start'>
                       {status != '' ? <div className='text-dark' style={{textDecoration:'none !important',fontSize:'0.8rem'}}><b>Status:</b> {status}</div> : <></>}
                        <span className='text-dark'><b>Check in:</b> {attendance.check_in } </span>
                        <span className='text-dark'><b>Check out:</b> {attendance.check_out } </span>
                        <span className='text-dark'><b>Total hours:</b> {attendance.total_hours } </span>
                     </div>
                    : attendance.attendance_type == 'leavecl' ? 
                    <>
                    <div>
                    {status != '' ? <div className='text-dark' style={{textDecoration:'none !important',fontSize:'0.8rem'}}><b>Status:</b> {status}</div> : <></>}
                    <div style={{fontSize:'1.3rem'}} className='text-danger'>
                        <span>Casual Leave</span>
                      </div>
                    </div>
                     
                    </>: 
                    attendance.attendance_type == 'leavesl' ? 
                    <>
                     <div>
                     {status != '' ? <div className='text-dark' style={{textDecoration:'none !important',fontSize:'0.8rem'}}><b>Status:</b> {status}</div> : <></>}
                    <div style={{fontSize:'1.3rem'}} className='text-danger'>
                        <span>Sick Leave</span>
                      </div>
                    </div>

                    </>:
                    <></>
                  : <></>}
                </div>
                <div className='shift-time' style={{ fontSize: '0.85em', color: 'black' }}>
                  7:00 - 22:00
                </div>

              </div>
          }
      </>
   
    
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
     
      dateClick={handleDateClick}
      dayCellClassNames={getDayClassNames} // Apply custom classes
      dayCellContent={renderDayCellContent}
    />
  );
};

export default CalendarContainer;
