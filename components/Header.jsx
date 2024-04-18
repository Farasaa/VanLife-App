import React from "react"
import { Link, NavLink, useNavigate, useLocation} from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"
import { userLogout } from "../api"


export default function Header() {

    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = React.useState(null)

    

   
    
   

    const from = location.state?.from || "/login";

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }


    function fakeLogOut() {
        userLogout().then(() => {
            localStorage.removeItem("loggedIn");
            navigate(from, { replace: true });
        }).catch((error) => {
            setError(error)
        });
    
}

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img
                        src={imageUrl}
                        className="login-icon"
                    />
                </Link>
                <i onClick={fakeLogOut} className="fa-solid fa-right-from-bracket"></i>


            </nav>
        </header>
    )
}