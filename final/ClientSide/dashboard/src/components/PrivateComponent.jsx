import react from 'react' 
import { Navigate, Outlet} from 'react-router-dom'
const PrivateComponent = () => {
        const getRes = localStorage.getItem('user')
        return getRes ? <Outlet/> : <Navigate to="/Login"/>
}
export default PrivateComponent