
import { create } from 'zustand'
import { CatalogServices } from '../../Catalog/services/catalog.services'
import { getClientExtId } from '../../Auth/helpers/getCurrentUserId'
const useSelectedProduct = create((set, get) => ({
    loading:false,
    selectedProd: {},
    changeDefaultImage: (imagePath) => {
        const prod = get().selectedProd
        prod.defaultImagePath = imagePath
        set({selectedProd:prod})
    },
    setSelectedProd: (element) => {
        set({selectedProd: element})
        if(element.SubProductss){
            set({subProducts:element.SubProductss})
        }
    
    },
    purchesHistoryData:[],
    setPurchesHistory: (data) => {set({purchesHistory:data})},
    getPurchesHistory: async () => {
        set({loading:true})
        try {
            const data = await CatalogServices.GetPurchaseHistory(getClientExtId(), get().selectedProd?.sku);
            set({purchesHistoryData: data["hydra:member"]})
        } catch(e) {
            console.log('[selectedProd', e)
        } finally {
            set({loading:false})
        }
    },
    isFetchOnline:false,
    subProducts: [],
    clearSubProducts: () => set({subProducts:[]}),
    getItemData: async () => {
        set({loading:true,isFetchOnline:true})
        try {
            const data = await CatalogServices.GetItemData(get().selectedProd?.CatalogNumber);
            if(data.status === 'success'){
                let prod = get().selectedProd
                prod.Price = data.data.price
                prod.OrgPrice = data.data.orgPrice
                prod.OnHand = data.data.stock
                set({subProducts: data.data.subProducts})
                set({selectedProd: prod})
            }
        } catch(e) {
            console.log('[selectedProd', e)
        } finally {
            set({loading:false,isFetchOnline:false})
        }
    },
    
}))

export default useSelectedProduct;