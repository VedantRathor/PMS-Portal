import axios from 'axios';
import React from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const localhost = 'http://localhost:7007'
function ProjectInfo({singleProjectData,parentFunctionDisplayData}) {
    
    const navigate = useNavigate()
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    let name, role;
    if (auth != null && auth != 'undefined') {
      name = auth.result.name
      role = auth.result.role
    }else{
      localStorage.removeItem('user')
      navigate('/Login')
    }
    
    const handleProjectClicked = (singleProjectData)=>{
        if( singleProjectData != null ){
            parentFunctionDisplayData(singleProjectData.project_details)
        }
    }
    const handleGeneratePDF = (eachProjectShowData) =>{
        let pdfdata = {
            project_id : eachProjectShowData.project_id,
            project_name : eachProjectShowData.project_name,
            project_details : eachProjectShowData.project_details,
            created_at : eachProjectShowData.created_at.split('T')[0],
            updated_at : eachProjectShowData.updated_at.split('T')[0],
            created_by : 'Admin'
          }
         
          axios.post(`${localhost}/generate-pdf`, { data: pdfdata }, { responseType: 'blob' })
              .then((response) => {
                  // Create a Blob from the PDF data
                  const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
  
                  // Create a URL for the Blob
                  const url = window.URL.createObjectURL(pdfBlob);
  
                  // Create a link element
                  const link = document.createElement('a');
                  link.href = url;
  
                  // Set the download attribute and filename
                  link.setAttribute('download', `${pdfdata.project_name}.pdf`);
  
                  // Append the link to the body
                  document.body.appendChild(link);
  
                  // Trigger the download
                  link.click();
  
                  // Cleanup
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(link);
              })
              .catch((error) => {
                  // Handle error
                  console.error('Error generating PDF:', error);
              });
      }
    return (
        <>
            <table style={{ border: '1px solid rgb(98, 92, 92)'}} class="table table-dark table-hover">
                <thead>
                   
                      <h5 style={{paddingLeft:'10px',color:'white',backgroundColor:'',marginBottom:'0px'}} >Project Details <FaBookOpen size={35} color='yellow' style={{borderRadius:'1px',background:'transparent'}}/> <FaFilePdf onClick={()=>{handleGeneratePDF(singleProjectData)}} style={{cursor:'pointer'}} color='rgb(255, 152, 152)' size={34}/></h5>
                    
                    <tr>
                       
                        <th scope="col">Name</th>
                        <th onClick={()=>{handleProjectClicked(singleProjectData)}} scope="col" className='text-info d-flex align-center ' style={{textDecoration:'',cursor:'pointer'}}>Details <CiCircleInfo className='text-alice' size='25' /></th>
                        <th scope="col">Manager</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Updated By</th>


                    </tr>
                </thead>
                <tbody>
                    { singleProjectData ? 
                            <tr>
                                <td>{singleProjectData.project_name}</td>
                                <td style={{maxWidth:'200px'}}>{singleProjectData.project_details}</td>
                                <td>{singleProjectData.userinfo.name}</td>
                                <td>Admin</td>
                                <td>{singleProjectData.created_at.split('T')[0]}</td>
                                <td>{singleProjectData.updated_at.split('T')[0]}</td>
                                <td>Admin</td>

                            </tr>   
                     : <></>
                    }

                </tbody>
            </table>
        </>
    )
}

export default ProjectInfo