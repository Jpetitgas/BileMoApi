import axios from "axios";
import Cache from "./cache";
import { USERS_API } from '../config';

async function findAll() {
    const cachedUsers = await Cache.get("users");

    if (cachedUsers) return cachedUsers;

    return axios
        .get(USERS_API)
        .then(response => {
            const users = response.data["hydra:member"];
            Cache.set("users", users);
            return users;
        });

}
async function find(id) {
    const cachedUser = await Cache.get("users." + id);
    if (cachedUser) return cachedUser;
    return axios
        .get(USERS_API+ "/" + id)
        .then(response => {
            const user = response.data;
            Cache.set("users." + id, user);
            return user;
        });
}
function update(id, user) {
    return axios
        .put(USERS_API+ " /" + id, user)
        .then(async response => {
            const cachedUsers= await Cache.get("users");
            const cachedUser = await Cache.get("users."+id);
            if (cachedUser){
                Cache.set("users."+id, response.data);
            }
            if (cachedUsers) {
               const index=cachedUsers.findIndex(u=>u.id ===+id);
               cachedUsers[index]=response.data;
            }
            return response;
        });
}
function create(user) {
    return axios
        .post(USERS_API , user)
        .then(async response => {
            const cachedUsers = await Cache.get("users");
            if (cachedUsers) {
                Cache.set("users", [...cachedUsers, response.data]);
            }
            return response;
        });
}

function deleteUser(id) {
    return axios
        .delete(USERS_API + "/" + id)
        .then(async response => {
            const cachedUsers = await Cache.get("users");
            if (cachedUsers) {
                Cache.set("users", cachedUsers.filter(u => u.id !== id));
            }
            return response;
        });
}
export default {
    findAll,
    delete: deleteUser,
    find,
    update,
    create
}