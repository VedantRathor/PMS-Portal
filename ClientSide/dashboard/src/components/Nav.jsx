import { Link, useNavigate } from 'react-router-dom'
const Nav = () => {
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/Login')
    }

    return (
        <div className='NavBar-container'>
            <ul className='navbaritems  NavBar'>
                <div className='navbar-left-items'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Project'>Project</Link></li>
                    <li><Link to='/Task'>Task</Link></li>
                    <li><Link to='/Logs'>Log</Link></li>
                </div>
                <div className='navbar-right-items'>
                    {auth ? <>
                        <li >😊 Welcome {auth.result.uname}</li>
                        <li><Link onClick={handleLogout} to='/Login'>Logout</Link></li>
                      
                    </>
                        : <><li><Link to='/SignUp'>Signup</Link></li>
                            <li><Link to='/Login'>Login</Link></li></>
                    }

                </div>
            </ul>
        </div>
    )
}

export default Nav