import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import UsersAPI from '../services/usersAPI';
import { toast } from "react-toastify";
import FormContentLoader from '../components/loaders/formContentLoader';

const UserPage = ({match, history}) => {

    const { id } = match.params;
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: ""
    });

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
            setLoading(false);
        } catch (error) {
            toast.error("L'utilisateur n'a pas pu etre chargé");
            history.replace('/users');
        }
    };

    useEffect(() => {
        if (id !== "new") {
            setLoading(true);
            setEditing(true);
            fetchUsers(id);
        }
    }, [id]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            setErrors({});
            if (editing) {
               await UsersAPI.update(id, user);
                toast.success("L'utilisateur a été modifié");               
            } else {
                await UsersAPI.create(user);
                toast.success("L'utilisateur a bien été crée");
                history.replace("/users");
            }
           
        } catch ({response}) {
            const {violations}= response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath,message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire");
            }
        }
    };

    return (
        <>
            
            {(!editing && <h1>Création d'un utilisateur</h1>) || (
                <h1>Modification du client</h1>
            )}
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
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
            </form>}
        </>
    );
};

export default UserPage;