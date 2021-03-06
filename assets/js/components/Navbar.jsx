import React, { useContext } from 'react';
import AuthAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { toast } from "react-toastify";
import Cache from "../services/cache";

const Navbar = ({ history }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();

        setIsAuthenticated(false);
        toast.info("Vous etes déconnecté");
        history.push("/login");
    };

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">La boutique</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">
                {isAuthenticated && <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Utilisateurs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/phones">Phones</NavLink>
                    </li>
                </>}
            </ul>
            <ul className="navbar-nav ml-auto">
                {!isAuthenticated && <>
                    <li className="nav-itm">
                        <NavLink to="/login" className="btn btn-success">connexion</NavLink>
                    </li>
                </> ||

                    <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                    </li>
                }
            </ul>
        </div>
    </nav>);
}
export default Navbar;