import axios from "axios";

function findAll() {
    return axios
        .get("https://127.0.0.1:8000/api/users")
        .then(response => response.data["hydra:member"]);

}
function find(id) {
    return axios
        .get("https://127.0.0.1:8000/api/users/" + id)
        .then(response => response.data);
}
function update(id, user) {
    return axios.put(
        "https://127.0.0.1:8000/api/users/" + id,
        user
    );
}
function create(customer) {
    return axios.post("https://127.0.0.1:8000/api/users",
        user
    );
}

function deleteUser(id) {
    return axios
        .delete("https://127.0.0.1:8000/api/users/" + id);
}
export default {
    findAll,
    delete: deleteUser,
    find,
    update,
    create
}