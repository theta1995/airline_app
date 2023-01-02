import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className = "navBarClass">
            <ul>
                <li><Link to="/" className='btn'>Home</Link></li>
                <li><Link to="video/*" className='btn'>Video</Link></li>
                <li><Link to="search/*" className='btn'>Employee</Link></li>         
                <li><Link to="payroll/*" className='btn'>Pay Roll</Link></li>
                <li><Link to="jobs/*" className='btn'>Jobs</Link></li>
            </ul>
        </div>
    )
}

export default NavBar
