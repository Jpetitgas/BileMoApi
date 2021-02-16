import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import usersAPI from '../services/usersAPI';
import UsersAPI from '../services/usersAPI';

const UserPage = ({match, history}) => {

    const { id } = match.params;


    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: ""
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: ""
    });

    const [editing, setEditing] = useState(false);
    
    const fetchUsers = async id => {
        try {
            const { firstName, lastName, email } = await UsersAPI.find(id);
            setUser({ firstName, lastName, email });
        } catch (error) {
            history.replace('/users');
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchUsers(id);
        }
    }, [id]);


    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
               await usersAPI.update(id, user);                
            } else {
                await usersAPI.create(user);
                history.replace("/users");
            }
            setErrors({});
        } catch ({response}) {
            const {violations}= response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath,message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return (
        <>
            {(!editing && <h1>Création d'un utilisateur</h1>) || (
                <h1>Modification du client</h1>
            )}
            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille de l'utilisateur"
                    value={user.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="prénom de l'utilisateur"
                    value={user.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Adresse email de l'utilisateur"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/users" className="btn btn-link">
                        Retour à la liste
                </Link>
                </div>
            </form>
        </>
    );
};

export default UserPage;