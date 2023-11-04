import axios from "axios"

export const AdminClinetsService = {
    async getClients(page,all = false) {
        if(all){
            const response = await axios.get(global.api + `/api/users?itemsPerPage=10000`);
            return response.data
        } else {
            const response = await axios.get(global.api + `/api/users?page=${page}`);
            return response.data

        }
    },

    async getClientItem(userId) {
        const response = await axios.get(global.api + `/api/users/${userId}`);
        return response.data
    },

    async updateClient(user) {
        const response = await axios.patch(global.api + `/api/users/${user.id}`, user , {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });
        return response.data
    },

    async updateAuth(extId, username, password) {
        const response = await axios.put(global.api + `/auth/registration`, 
            {
                extId,
                username,
                password
            }, 
            {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });
        return response.data
    }
}