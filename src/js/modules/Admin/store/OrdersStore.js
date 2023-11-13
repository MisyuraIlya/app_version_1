import { create } from 'zustand'
import { AdminClinetsService } from '../services/clients.service';
import { HydraHandler } from '../../../helpers/hydraHandler';
import { AdminOrderService } from '../services/orders.service';
import moment from 'moment-timezone';

const useAdminOrders = create((set, get) => ({
    loading:false,
    serach:'',
    setSearch:(value) => set({serach: value}),
    orders:[],
    getOrders: async () => {
        set({loading:true})
        try {
            const response = await AdminOrderService.getOrders(
                moment(get().dateFrom).format('YYYY-MM-DD'),
                moment(get().dateTo).format('YYYY-MM-DD'),
                get().page
                )
            set({orders:response["hydra:member"],totalOrders:response["hydra:totalItems"]})
            const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
            set({totalPages, page, lastPage, nextPage, previousPage})
        } catch(e) {
            console.log('[ERROR fetch orders]', e)
        } finally {
            set({loading:false})
        }

    },

    //pagination
    totalOrders:0,
    page:1, 
    setPage: (page) => set({page:page}),
    totalPages:1,
    lastPage:1,
    nextPage:1,
    previousPage:1,

    // === CALENDAR ======
    dateFrom: new Date(),
    setDateFrom: (value) => {
        set({dateFrom: value})
    },
    dateTo: new Date(),
    setDateTo: (value) => {
        set({dateTo: value})
    },
    setType: (value) => set({type: value, showCalendar:true}),
    setShowCalendar: (value) => set({showCalendar: value}),
    showCalendar:false,
    type:'',
    choosedDate: new Date(),
    handleChangeCalendar: (date) => {
        if(get().type === 'from') {
            set({dateFrom: date, showCalendar: false})
        }

        if(get().type === 'to') {
            set({dateTo:date, showCalendar: false})
        }
    },
    documentType:'',
    setDocumentType: (type) => set({documentType: type}),
    //======================

    // products item
    items:[],
    getItems: async (orderItem) => {
        try {
            set({loading:true})
            const response = await AdminOrderService.getOrderItem(orderItem)
            set({items:response["hydra:member"]})
        } catch(e) {
            console.log('[Error]',e)
        } finally {
            set({loading:false})
        }
    }
}))

export default useAdminOrders;