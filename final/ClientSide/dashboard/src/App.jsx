import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateComponent from "./components/PrivateComponent"
import Product from "./components/Products"
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import ProjectDisplay from "./components/projectDisplay.jsx"
import SignUp from "./components/SignUp/Signup.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Login from "./components/Login/Login.jsx"
import ProjectContainer from "./components/ProjectContainer/ProjectContainer.jsx"
import SideBar from "./components/ProjectContainer/sidebar.jsx"
import ViewAllTask from "./components/Tasks/ViewAllTask.jsx"
import ViewSingleTaskLogs from "./components/LogTable/LogsByTaskID/ViewSingleTaskLogs.jsx"
import TaskForm from "./components/Tasks/TaskForm.jsx"
import AssignProjectMember from "./components/Project-Members/AssignProjectMember.jsx"
import ShowAllLogs from "./components/LogTable/ShowAllLogs/ShowAllLogs.jsx"
import AddLog from "./components/Tasks/AddLog/AddLog.jsx"
import Home from "./components/Home/Home.jsx"
import NewProject from "./components/NewProject/NewProject.jsx"

function App() {
  return (<>
    <div>
      <BrowserRouter>
      
        <Nav />
        <div style={{ display: "flex", justifyContent: 'flex-start', gap: '30px' }}>
          <div style={{width:"10%"}}>
            <SideBar ></SideBar>
          </div>
          <div className="main-right-container">

            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/Project" Component={ProjectContainer} />
              <Route path="/Task" element={<h1>Welcome to Task page</h1>} />
              <Route path="/Logs" element={<h1>Welcome to Log page</h1>} />
              <Route path="/profile" element={<h1>Welcome to profile page</h1>} />
              <Route path="/Logout" element={<h1>Logout</h1>} />
              <Route path="/SignUp" Component={SignUp} />
              <Route path="/Login" Component={Login} />

              <Route path="/project/:pid" Component={ProjectDisplay} />
              <Route path="/project/:pid/tasks" Component={ViewAllTask} />
              <Route path="/project/:pid/tasks" Component={ViewAllTask} />
              <Route path="/project/:pid/tasks/logs/:tid" Component={ViewSingleTaskLogs} />
              <Route path="/create-task/:pid" Component={TaskForm} />
              <Route path="/project/:pid/assign-members" Component={AssignProjectMember} />
              <Route path="/project/:pid/add-task/:tid" Component={AddLog} />
              <Route path="/add-new-project" Component={NewProject} />
              {/* <Route path="/project/:pid/Logs" Component={ShowAllLogs}/> */}
            </Routes>
          </div>
          
        </div>
        <Footer />
      
      </BrowserRouter>
   
    </div>
   
  </>

  )
}

export default App 