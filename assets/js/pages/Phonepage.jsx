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
        amount: ""
    });

    const fetchPhones = async id => {
        try {
            const { model, description, amount } = await PhonesAPI.find(id);
            setPhone({ model, description, amount });
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
            <h1>Detail du telephone</h1>

            {loading && <FormContentLoader />}
            {!loading && <div>
                <div>{phone.model}</div>
                <div>{phone.description}</div>
                <div>{phone.amount}</div>

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