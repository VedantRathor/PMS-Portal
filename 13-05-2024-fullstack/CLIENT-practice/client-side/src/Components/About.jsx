import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GrLicense } from "react-icons/gr";

function About() {
    const navigate = useNavigate()
    const navigateToProject = () => {
        navigate('/project')
    }
    return (
        <div className='about-outer-container'>
            <div className='about-container'>
                <div style={{ width: '100%', height: '' }} className='text-center text-white'>
                    <div style={{ backgroundColor: ' #2d3034' }} class="cover-container d-flex h-100 p-3 mx-auto flex-column">
                        <header class="masthead mb-auto">
                            <div class="inner">
                                <h3 class="masthead-brand">Project Management System</h3>
                                <nav class="nav nav-masthead justify-content-center">
                                    <p>Streamline your projects with our comprehensive project management system. Our platform offers intuitive tools to plan, organize, and track tasks, deadlines, and resources efficiently. From project inception to completion, collaborate seamlessly with your team, communicate effectively, and stay updated with real-time progress updates. With customizable features tailored to your workflow, boost productivity and achieve your project goals with ease. Simplify project management today.</p>
                                    <div><p>
                                        Our project management system offers a seamless experience for planning, executing, and tracking projects. With intuitive task management features, users can easily create, assign, and prioritize tasks while keeping track of progress in real-time. Robust collaboration tools facilitate communication and file sharing among team members, ensuring everyone stays informed and engaged. Customizable workflows adapt to the unique needs of each project, while time tracking and reporting capabilities provide valuable insights into project performance. With integration options, security measures, and mobile accessibility, our platform empowers teams to work efficiently and deliver successful projects with ease</p></div>
                                     <a className='social-media' href='https://www.linkedin.com/in/vedant-rathore-8bb905211/'><FaLinkedin size={30}/> Linkedin</a>
                                     <a className='social-media' href='https://github.com/VedantRathor'><FaGithub size={30}/> Github</a>
                                </nav>
                            </div>
                        </header>

                        <main role="main" class="inner cover">
                            <h5 class="cover-heading" style={{marginTop:'10%'}}>< GrLicense style={{marginRight:'1%'}} size={30}/>   Developed By <b><u>Vedant Rathore</u></b></h5>
                            <p class="lead">Now Manage the project development cycle like never before.</p>
                            <p class="lead">
                                <a style={{ cursor: 'pointer' }} onClick={() => { navigateToProject() }} class="btn btn-lg btn-secondary">Learn more</a>
                            </p>
                        </main>

                        <footer class="mastfoot mt-auto">
                            <div class="inner">

                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default About