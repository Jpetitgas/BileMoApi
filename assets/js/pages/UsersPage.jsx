import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import UsersAPI from '../services/usersAPI';
import {Link} from "react-router-dom";
import { toast } from "react-toastify"; 
import TableLoader from '../components/loaders/TableLoader';

const UsersPage = props => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading,setLoading]= useState(true);

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.reponse);
            toast.error("impossible de charger les utilisateur");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async id => {
        const originaleUsers = [...users];
        setUsers(users.filter(user => user.id !== id));
        toast.success("L'utilisateur a ete supprimé");
        try {
            await UsersAPI.delete(id);
        } catch (error) {
            setUsers(originaleUsers);
            toast.error("La suppression n'a pas été faite");
        }
    };

    const handlePageChange = page => setCurrentPage(page);
    
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 8;
    const filteredUsers = users.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedUsers = Pagination.getData(
        filteredUsers,
        currentPage,
        itemsPerPage);

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Listes des utilisateurs</h1>
                <Link to="/users/new" className="btn btn-primary">Créer un utilisateur</Link>
            </div>
                
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>first Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && <tbody>
                    {paginatedUsers.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={"/users/"+user.id}>
                                    {user.firstName}
                                </Link>
                                </td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                            </td>
                        </tr>)}

                </tbody>}
            </table>
            {loading &&<TableLoader/>}

            {itemsPerPage < filteredUsers.length && <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredUsers.length}
                onPageChanged={handlePageChange}
            />}
        </>
    );
};
export default UsersPage;