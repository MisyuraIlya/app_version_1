import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';
import { HydraHandler } from '../../../helpers/hydraHandler';

const useCatalog = create((set, get) => ({
    loading:false,
    id:'',
    b2cPriceCode:'',
    priceNoLogin:'',
    lvl1id:'1',
    lvl2id:'0',
    lvl3id:'0',
    searchParams:'',
    setSearchParams: (value) => set({searchParams:value}),
    setCatalogParameters: (lvl1, lvl2, lvl3, searchParams) => {
        set({
            lvl1id: lvl1,
            lvl2id: lvl2,
            lvl3id: lvl3,
            searchParams,
        })
    },

    // FILTERS 

    activeProdsPerPage: false,
    setActiveProdsPerPage: (value) => (set({activeProdsPerPage: value})),
    activeSortPerPage:false,
    setActiveSortPerPage: (value) => (set({activeSortPerPage: value})),
    listView:false,
    setListView: (value) => (set({listView:value})),

    pageTitle: 'כל המוצרים',
    urlSearch:'',
    setUrlSearch: (value) => {
        set({urlSearch: value })
    },
    action:'',
    searchParam:'',
    setSearchParam: (value) => {
        set({searchParam:value})
    },
    categoriesLvl1: [],
    categoriesLvl2: [],
    categoriesLvl3: [],
    filters:[],
    products:[],
    paginateObj:null,
    setChoosedFilter: (filterItem) => {
        const arr = get().filters.map((item) => {
            item.Values.map((subItem) => {
                if(filterItem.Title == subItem.Title) {
                    subItem.Selected = !subItem.Selected
                } 
            })
            return item
        })
        set({filters: arr})
    },
    getCatalog: async () => {

        set({loading:true})
        try {
            const response = await CatalogServices.GetCatalog(
                get().lvl1id,
                get().lvl2id,
                get().lvl3id, 
                get().searchParams, 
                )
                const products = response['hydra:member']
                const totalItems = response['hydra:totalItems']
                set({totalItems: totalItems, products:products})
                const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
                set({totalPages, page, lastPage, nextPage, previousPage})
        } catch(e) {
            console.log('[ERROR] error fetch catalog',e)
        } finally {
            set({loading:false})
        }

    },
    toShow:24,
    totalItems:0,
    totalPages:1,
    page:1,
    nextPage:null,
    previous:null,
    lastPage: null,
    goToPage: (updatedUrl) => {


        set({searchParams:updatedUrl})
    },

    prodsPerPage:'24',
    setProdsPerPage: (updatedUrl,number) => {
        set({prodsPerPage:number, activeProdsPerPage:false,searchParams:updatedUrl,page:1})
    },
    sortProdSetting: 'שם',
    setSortProdSetting: (value) => (set({sortProdSetting: value})),

    // ATTRIBUTES
    attributes:[],
    getAttributes: async () => {
        try {
            const response = await CatalogServices.GetAttributes(
                get().lvl1id,
                get().lvl2id,
                get().lvl3id, 
            )
            set({attributes:response["hydra:member"]})
        } catch(e) {
            console.log('[ERROR] fetch attributes',e)
        }
    }



}))

export default useCatalog;