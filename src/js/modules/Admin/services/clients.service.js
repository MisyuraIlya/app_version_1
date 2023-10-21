import axios from "axios"

export const AdminClinetsService = {
    async getClients(page) {
        const response = await axios.get(global.api + `/api/users?page=${page}`);
        return response.data
    },

    async getClientItem(userId) {
        const response = await axios.get(global.api + `/api/users/${userId}`);
        return response.data
    },
}