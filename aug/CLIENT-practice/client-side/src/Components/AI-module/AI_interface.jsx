import axios from 'axios';
import React, { useState } from 'react'
import { RiEthFill } from 'react-icons/ri';
import { RxCross1 } from "react-icons/rx";
// import {pdfjs , Document , Page } from 'react-pdf'
const localhost = "http://localhost:7007";
function AI_interface({toggleAIDialogBox}) {
     let [file , setFile] = useState(null);
     let [isLoading, setIsLoading] = useState(false);
     let [summarize , setSummarize] = useState(null);
     let [btnClicked , setbtnClicked] = useState(false);

    const HandleCancelClicked = () =>{
        toggleAIDialogBox(true) ; 
    }
    const handleFileUpload = (e) =>{
        let file = e.target.files[0];
        setFile(file);
    }
    const handleFormSubmit = async(e) =>{
        e.preventDefault() ;
        setbtnClicked(true);
        setIsLoading(true);
        setSummarize('');
        const formdata = new FormData() ;
        formdata.append("file",file);
        let response = await axios.post(`${localhost}/upload-pdf`,formdata,{
            headers:{"Content-Type":"multipart/form-data"},
        })
        let result = await response.data ;
       
       if( result?.message?.content){
        const formattedText = await result.message.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ));
        setSummarize(formattedText);
       }
       setIsLoading(false);
       setbtnClicked(false);
       
        console.log('result' ,result );
    }
    

  return (
    <div className='backdrop'>
        <div style={{ height: 'auto' }} className='AI-DIALOG'>
          <RxCross1 onClick={() => { HandleCancelClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
          {/* <h5 className='text-white text-center d-flex justify-content-center align-items-center gap-2'>upload pdf</h5> */}
          <form onSubmit={handleFormSubmit}>
                  <div class="mt-3 d-flex justify-content-center align-content-center gap-2">
                    <div>
                          <label for="formFile" className="form-label text-white" >Select PDF file</label>
                          <input className="form-control" type="file" id="file" name='file' onChange={handleFileUpload }  />
                    </div>
                      
                      <button style={{height:'40px',marginTop:'30px'}} type="submit" class="btn btn-primary">Summarize</button>
                  </div>
                 
          </form>
          <div className='para-show'>
              { isLoading == true && btnClicked ? <p className='text-center mt-5 text-success' > Loading....</p> : summarize == null || summarize == undefined || summarize == '' ? <p  className='text-center mt-3 text-success' >Select File and Leave rest on us!</p> : <p>{summarize}</p>  }
          </div>
      </div>
    </div>
      
  )
}

export default AI_interface