import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <div className='navbar'>
        <div className='navbar-left'>
              <ul className='navbar-left-ul'>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to='/project'>Project</Link></li>
                 <li><Link to='/task'>Task</Link></li>
                 <li><Link>Log</Link></li>
                 <li><Link>Pending</Link></li>
                 <li><Link>Details</Link></li>
                 <li><Link>About</Link></li>

              </ul>
        </div>
        <div className='navbar-right'>
               <ul className='navbar-right-ul'>
               <li><Link>Logout</Link></li>
                 
               </ul>
        </div>
    </div>
  )
}

export default Nav;