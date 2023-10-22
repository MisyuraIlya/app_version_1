import { create } from 'zustand'
import { AdminClinetsService } from '../services/clients.service';
import { HydraHandler } from '../../../helpers/hydraHandler';
import { onErrorAlert, onSuccessAlert } from '../../../agents/utils/sweetAlert';
const useClientStore = create((set, get) => ({
    loading: false,
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
    updateClient: async (user) => {
        set({loading:true})
        try {
            const response = await AdminClinetsService.updateClient(user)
            set({selectedClient: response})
        } catch(e) {
            console.log('[error]',e)
        } finally {
            set({loading:false})
        }
    },
    updateAuth: async (username,password) => {
        set({loading:true})
        try {
            const response = await AdminClinetsService.updateAuth(get().selectedClient.extId, username, password)
            if(response.status === 'success') {
                onSuccessAlert('לקוח נוצר בהצלחה')
            } else {
                onErrorAlert('שגיאה ביצירת לקוח',response.message)
            }
        } catch(e) {
            console.log('[error]',e)
        } finally {
            set({loading:false})
            get().getClients()
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