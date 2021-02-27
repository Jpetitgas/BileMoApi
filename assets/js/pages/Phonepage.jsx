import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PhonesAPI from '../services/phonesAPI';
import { toast } from "react-toastify";
import FormContentLoader from '../components/loaders/formContentLoader';

const PhonePage = ({ match, history }) => {

    const { id } = match.params;
    const [loading, setLoading] = useState(true);

    const [phone, setPhone] = useState({
        model: "",
        description: "",
        amount: "",
        brand: ""
    });

    const fetchPhones = async id => {
        try {
            const { model, description, amount, brand } = await PhonesAPI.find(id);
            setPhone({ model, description, amount, brand });
            setLoading(false);
        } catch (error) {
            toast.error("Ce telephone n'a pas pu etre chargé");
            history.replace('/phones');
        }
    };

    useEffect(() => {
        fetchPhones(id);
    }, [id]);


    return (
        <>

            {loading && <FormContentLoader />}
            {!loading && <div>
                <div className="card border-dark mb-3">

                    <div className="card-header">{phone.model.toUpperCase()}</div>
                    <div className="card-body">
                        <h4 className="card-title">Description</h4>
                        <p className="card-text">{phone.description}</p>
                        <p className="card-text">{phone.amount} Eur</p>
                    </div>
                    <div className="card-footer text-muted">{phone.brand.brand}</div>

                </div>
                <div className="form-group">
                    <Link to="/phones" className="btn btn-link">
                        Retour à la liste
                </Link>
                </div>
            </div>}
        </>
    );
};

export default PhonePage;