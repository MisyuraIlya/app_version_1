import axios from "axios"

export const AdminOrderService = {
    async getOrders(dateFrom,dateTo,page) {
        const response = await axios.get(global.api + `/api/histories?page=${page}&createdAt[after]=${dateFrom}&createdAt[before]=${dateTo}`);
        return response.data
    },

    async getOrderItem(orderItem) {
        const response = await axios.get(global.api + `/api/history_detaileds?history.id=${orderItem}`);
        return response.data
    },
}