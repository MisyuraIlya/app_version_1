import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useSearchStore = create((set, get) => ({
    loading: false,
    searchValue:'',
    setSearchValue: (value) => set({searchValue:value}),
    products: [],
    clearProducts: () => {
        set({products: []})
    },
    findProductsByValue: async () => {
        set({loading: true})
        try {
            const data = await CatalogServices.ProductSearch(get().searchValue)
            if(data.status === 'success') {
                set({products: data.data})
            }
        } catch(e) {
            console.log('[ERROR]', e)
        } finally {
            set({loading: false})
        }
    }, 
    
}))

export default useSearchStore;