import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { BsPeopleFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";


function Email({ email, ToggleEmailVisibility }) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
      });
    const handleCrossClicked = () => {
        ToggleEmailVisibility('');
    };

    const [To, setTo] = useState(email);
    const [subject, setSubject] = useState('Please Enter Subject');
    const [body, setBody] = useState('Body');
    const handleToChange = (e) => {
        setTo(e.target.value);
    }

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${To}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    }


    return (
        <div className='member-form'>
            <RxCross1 onClick={() => { handleCrossClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
            <div className='member-actual-form'>
                <h4 className='text-center text-white d-flex align-items-center justify-content-center gap-2'>Email <CiMail size={30} color='yellow' /></h4>

                <form class=" row g-3 my-email-form bg-dark text-light">
                    <div class="col-12">
                        <label class="form-label">To: </label>
                        <input value={To} onChange={handleToChange} class="form-control" />
                    </div>
                    <div class="col-12 mt-3">
                        <label class="form-label">Subject: </label>
                        <textarea type="text" style={{ height: '100%' }} onChange={handleSubjectChange} class="form-control" />
                    </div>

                    <div class="col-12 mt-5">
                        <label class="form-label">Body: </label>
                        <textarea type="text" style={{ height: '100%' }} onChange={handleBodyChange} class="form-control" />
                    </div>

                    <div class="col-12 mt-5">
                        <a href={gmailLink} style={{ width: '28%', float: 'right' }} class="btn btn-outline-info d-flex justify-content-center align-items-center gap-1">Send an Email <CiMail size={30} color='yellow' /></a>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Email