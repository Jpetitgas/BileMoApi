/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import UsersPage from './js/pages/UsersPage';
import LoginPage from './js/pages/LoginPage';
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import UserPage from './js/pages/Userpage';
import PhonePage from './js/pages/Phonepage';
import PhonesPage from './js/pages/Phonespage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

AuthAPI.setup();
const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
        <Route path={path} component={component} />
    ) : (
            <Redirect to="/login" />
        );
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );
    const NavbarWithRouter = withRouter(Navbar);
    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/phones/:id" component={PhonePage} />
                        <Route path="/phones" component={PhonesPage} />
                        <PrivateRoute path="/users/:id" component={UserPage} />
                        <PrivateRoute path="/users" component={UsersPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);