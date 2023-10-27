import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';
import { HydraHandler } from '../../../helpers/hydraHandler';

const useSearchStore = create((set, get) => ({
    loading: false,
    searchValue:'',
    savedValue:'',
    setSearchValue: (value) => set({searchValue:value}),
    setSavedValue: (value) => set({savedValue:value}),
    productsFilter: [],
    totalFound: 0,
    categoriesFilter:[],
    setCategoriesFilter: (arr) => set({categoriesFilter:arr}),
    clearProducts: () => {
        set({products: []})
    },
    findProductsByValue: async (
        lvl1id,
        lvl2id,
        lvl3id, 
        searchParams, 
    ) => {
        set({loading: true})
        try {
            const response = await CatalogServices.GetCatalog(
                lvl1id,
                lvl2id,
                lvl3id, 
                searchParams, 
            )
            set({productsFilter: response["hydra:member"],totalFound:response["hydra:totalItems"]})
            const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
            set({totalPages, page, lastPage, nextPage, previousPage})
        } catch(e) {
            console.log('[ERROR]', e)
        } finally {
            set({loading: false})
        }
    }, 
    findCategoriesFilter: async () => {
        set({loading: true})
        try {
            const data = await CatalogServices.GetCategoriesFilter(get().savedValue)
            set({categoriesFilter: data})
        } catch(e) {
            console.log('[ERROR]', e)
        } finally {
            set({loading: false})
        }
    },
    

    //PAGNINATION
    clearPaginationSearch : () => set({totalPages:null,page:null,nextPage:null,previous:null,lastPage:null}),
    totalPages:null,
    page:null,
    nextPage:null,
    previous:null,
    lastPage: null,
    //============
}))

export default useSearchStore;