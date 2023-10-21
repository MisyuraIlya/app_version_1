import { create } from 'zustand'
import { AdminClinetsService } from '../services/clients.service';
import { HydraHandler } from '../../../helpers/hydraHandler';
const useClientStore = create((set, get) => ({
    clients:[],
    setClients:(arr) => set({clients:arr}),
    selectedClient:null,
    setSelectedClient:(client) => set({selectedClient:client}),
    getClients: async () => {
        try {
            const response = await AdminClinetsService.getClients(get().page)
            set({clients:response["hydra:member"],totalClients:response["hydra:totalItems"]})
            const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
            set({totalPages, page, lastPage, nextPage, previousPage})
        } catch(e) {
            console.log('[error]',e)
        }
    },
    totalClients:0,
    page:1, 
    setPage: (page) => set({page:page}),
    totalPages:1,
    lastPage:1,
    nextPage:1,
    previousPage:1,
}))

export default useClientStore;