import axios from "axios";
import Cache from "./cache";
import { PHONE_API } from '../config';

async function findAll() {
    const cachedPhones = await Cache.get("phones");

    if (cachedPhones) return cachedPhones;

    return axios
        .get(PHONE_API)
        .then(response => {
            const phones = response.data["hydra:member"];
            Cache.set("phones", phones);
            return phones;
        });

}
async function find(id) {
    const cachedPhone = await Cache.get("phones." + id);
    if (cachedPhone) return cachedPhone;
    return axios
        .get(PHONE_API+ "/" + id)
        .then(response => {
            const phone = response.data;
            Cache.set("phones." + id, phone);
            return phone;
        });
}

export default {
    findAll,
    find,
    
}