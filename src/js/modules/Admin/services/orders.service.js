import axios from "axios"

export const AdminOrderService = {
    async getOrders(page) {
        const response = await axios.get(global.api + `/api/histories?page=${page}`);
        return response.data
    },

    async getOrderItem(orderItem) {
        const response = await axios.get(global.api + `/api/users/${userId}`);
        return response.data
    },
}