import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { RiEthFill } from 'react-icons/ri';
import { RxCross1 } from "react-icons/rx";

const formatText = (text) => {
    // Replace '**<number>.' with '\n', and '*', '**', '** *', '** * **' with spaces or line breaks
    const formattedText = text
      .replace(/\*\*(\d+\.)/g, '\n') // Replace '**<number>.' with '\n'
      .replace(/\*\*/g, ' ') // Replace '**' with a single space
      .replace(/\*\s*\*\s*/g, ' ') // Replace '** *' and '** * **' with a single space
      .replace(/\*\s*/g, '\n'); // Replace single '*' with a line break
  
    // Split the text into lines based on new lines
    const lines = formattedText.split('\n').filter(line => line.trim() !== '');
  
    return lines.map((line, index) => {
      // Handle headings
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            {line.replace('## ', '')}
          </h3>
        );
      }
  
      // Handle numbered lists with bold text
      else if (/^\d+\.\s/.test(line)) {
        return (
          <p key={index} style={{ fontWeight: 'bold', marginBottom: '12px', lineHeight: '1.6' }}>
            {line}
          </p>
        );
      }
  
      // Regular paragraphs
      else {
        return (
          <p key={index} style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            {line}
          </p>
        );
      }
    });
  };
  
  

const FormattedContent = ({ text }) => {
    return <p className='mypara-content'>{formatText(text)}</p>;
  };

  
function AI_ASK_GPT({toggleAIGPTIDalogBox}) {
    let [isLoading, setIsLoading] = useState(false);
    let [btnClicked , setbtnClicked] = useState(false);
    let [question , setQuestion] = useState('');
    let [generatedText , setgeneratedText] = useState('');


    const HandleCancelClicked = () =>{
        toggleAIGPTIDalogBox(true) ; 
    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault() ;
        setbtnClicked(true);
        setIsLoading(true);
        setgeneratedText('');
        let response = await axios({
            url : 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAp_fp_dfMesPgysOSVoQHKhK9EsaYKyRc',
            method : 'post',
            data : {
                contents:[{"parts":[{"text": question}]}]
            }
        })
        setgeneratedText(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
        setIsLoading(false);
       setbtnClicked(false);
         
    }
    const handleTyping = (e) =>{
        setQuestion(e.target.value);
    }
    

  return (
    <div className='backdrop'>
    <div style={{ height: 'auto' }} className='AI-ASK-GPT-DIALOG'>
      <RxCross1 onClick={() => { HandleCancelClicked() }} size={30} color='red' style={{ margin: '1%', cursor: 'pointer' }} />
      {/* <h5 className='text-white text-center d-flex justify-content-center align-items-center gap-2'>upload pdf</h5> */}
      <form className='mt-3' onSubmit={handleFormSubmit}>
              {/* <div class="mt-3 d-flex justify-content-center align-content-center gap-2">
                <div>
                      <label for="formFile" className="form-label text-white" >Select PDF file</label>
                      <input className="form-control" type="file" id="file" name='file' onChange={handleFileUpload }  />
                </div>
                  
                  <button style={{height:'40px',marginTop:'30px'}} type="submit" class="btn btn-primary">Summarize</button>
              </div> */}
                  <div  class="input-group d-flex justify-content-center align-items-center gap-3">
                      <span class="input-group-addon text-white ">Ask Me</span>
                      <textarea style={{borderRadius:'15px'}} onChange={handleTyping}   id="question" type="text" class="form-control" name="question" placeholder="Your Question"/>
                  </div>
            <button style={{float:'right'}} type='submit' className='btn btn-success mt-2'>generate</button>
      </form>
      <div style={{clear:'both'}} className='para-show p-3'>
          { isLoading == true && btnClicked ? <p className='text-center mt-5 text-success' > Loading....</p> : generatedText != null && generatedText != undefined && generatedText != '' ? <FormattedContent text={generatedText} /> : <></>  }
      </div>
  </div>
</div>
  )
}

export default AI_ASK_GPT