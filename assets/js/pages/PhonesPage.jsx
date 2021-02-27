import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import PhonesAPI from '../services/phonesAPI';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from '../components/loaders/TableLoader';

const PhonesPage = props => {
    const [phones, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchPhones = async () => {
        try {
            const data = await PhonesAPI.findAll();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.reponse);
            toast.error("impossible de charger les telephones");
        }
    };

    useEffect(() => {
        fetchPhones();
    }, []);

    const handlePageChange = page => setCurrentPage(page);

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 50;
    const filteredPhones = phones.filter(p =>
        p.brand.brand.toLowerCase().includes(search.toLowerCase())        
    );
    const paginatedPhones = Pagination.getData(
        filteredPhones,
        currentPage,
        itemsPerPage);

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Listes des telephones</h1>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Marque</th>
                        <th>Model</th>
                        <th>Prix</th>

                    </tr>
                </thead>
                {!loading && <tbody>
                    {paginatedPhones.map(phone =>
                        <tr key={phone.id}>
                            <td>{phone.brand.brand}</td>
                            <td>
                                <Link to={"/phones/" + phone.id}>
                                    {phone.model}
                                </Link>
                            </td>
                            
                            <td>{phone.amount} Eur</td>

                        </tr>)}

                </tbody>}
            </table>
            {loading && <TableLoader />}

            {itemsPerPage < filteredPhones.length && <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredPhones.length}
                onPageChanged={handlePageChange}
            />}
        </>
    );
};
export default PhonesPage;