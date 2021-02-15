import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import UsersAPI from '../services/usersAPI';

const UsersPage = props => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
        } catch (error) {
            console.log(error.reponse);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async id => {
        const originaleUsers = [...users];
        setUsers(users.filter(user => user.id !== id));

        try {
            await UsersAPI.delete(id);
        } catch (error) {
            setUsers(originaleUsers);
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
            <h1>Listes des Users</h1>
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
                <tbody>
                    {paginatedUsers.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                            </td>
                        </tr>)}

                </tbody>
            </table>

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