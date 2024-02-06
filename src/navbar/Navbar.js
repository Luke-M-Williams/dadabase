import { Link } from "react-router-dom"
import "./Navbar.css"


export const NavBar = () => {
    return <ul className="navbar">
        <li className="navbar-item">
            <Link to='/jokes'>Dad Jokes</Link>
        </li>
        <li className="navbar-item">
            <Link to='/quotes'>Dadspirational Quotes</Link>
        </li>
        <li className="navbar-item">
            <Link to='/resources'>Resources</Link>
        </li>
        <li className="navbar-item">
            <Link to='/add'>D-Add</Link>
        </li>
        <li className="navbar-item">
            <Link to='/login'>Logout</Link>
        </li>
    </ul>
}