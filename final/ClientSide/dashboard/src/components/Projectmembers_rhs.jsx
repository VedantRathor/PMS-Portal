import axios from "axios"
import { useEffect, useState } from "react"

function Projectmembers_rhs({ pid }) {
    const [member, setMember] = useState()
    useEffect(() => {
        const getMembersByPid = async () => {
            let response = await axios.get(`http://localhost:7007/project-details-members/${pid}`)
            let result = await response.data
            console.log(result)
            setMember(await result.result[0].assignments)
        }
        getMembersByPid()
    }, [])
    return (<div className="Project-Member-Component"><h2 className="project_h" style={{ textAlign: 'center' }}>Project Members</h2>
        {
            member ? (
                <ul className="list-group ">

                    <li className="list-group-item active " style={{ backgroundColor: '#212529' }}>Assigned To</li>
                    {
                        member.map((item) => (
                            <li className="list-group-item"><div className="list-m"><span><b>Name: </b>{item.userinfo.uname}</span><span><b>EmpID: </b>{item.userinfo.uid}</span></div></li>
                        ))
                    }
                </ul>
            
                
            ) : (<div>Loading..</div>)
        }


    </div>

    )
}
export default Projectmembers_rhs