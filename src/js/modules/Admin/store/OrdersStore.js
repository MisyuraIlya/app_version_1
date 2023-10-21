import { create } from 'zustand'
import { AdminClinetsService } from '../services/clients.service';
import { HydraHandler } from '../../../helpers/hydraHandler';
import { AdminOrderService } from '../services/orders.service';

const useAdminOrders = create((set, get) => ({
    serach:'',
    setSearch:(value) => set({serach: value}),
    orders:[],
    getOrders: async () => {
        const response = await AdminOrderService.getOrders(get().page)
        set({orders:response["hydra:member"],totalOrders:response["hydra:totalItems"]})
        const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
        set({totalPages, page, lastPage, nextPage, previousPage})
    },
    showCalendar:false,

    //pagination
    totalOrders:0,
    page:1, 
    setPage: (page) => set({page:page}),
    totalPages:1,
    lastPage:1,
    nextPage:1,
    previousPage:1,
}))

export default useAdminOrders;