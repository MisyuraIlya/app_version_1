import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useCatalog = create((set, get) => ({
    loading:false,
    id:'',
    b2cPriceCode:'',
    priceNoLogin:'',
    lvl1id:'1',
    lvl2id:'0',
    lvl3id:'0',
    parent:'0',
    page:'1',
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
        get().getCatalog()
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
                if(response["hydra:view"]["hydra:last"]) {
                    const totalPages = (response["hydra:view"]["hydra:last"]?.split('page='))[1]
                    set({totalPages:totalPages})
                } else {
                    set({totalPages:1})

                }
                if(response["hydra:view"]["@id"]) {
                    const currentPage = (response["hydra:view"]["@id"]?.split('page='))[1]
                    if(currentPage) {
                        set({currentPage:currentPage})
                    } else {
                        set({currentPage:1})
                    }

                } else {
                    set({currentPage:1})

                }
        
                if(response["hydra:view"]["hydra:last"]) {
                    const lastPage = (response["hydra:view"]["hydra:last"]?.split('page='))[1]
                    set({lastPage:lastPage})

                } else {
                    set({lastPage:1})

                }
            
                if(response["hydra:view"]["hydra:next"]) {
                    const nextPage = (response["hydra:view"]["hydra:next"]?.split('page='))[1]
                    set({nextPage:nextPage})

                } else {
                    if(response["hydra:view"]["hydra:last"]) {
                        set({nextPage:(response["hydra:view"]["hydra:last"]?.split('page='))[1]})
                    } else {
                        set({nextPage:1})
                    }
                }
                if(response["hydra:view"]["hydra:previous"]) {
                    const previousPage = (response["hydra:view"]["hydra:previous"]?.split('page='))[1]
                    set({previousPage:previousPage})
                } else {
                    set({previousPage:1})
                }
           

        } catch(e) {
            console.log('[ERROR] error fetch catalog',e)
        } finally {
            set({loading:false})
        }

    },
    toShow:24,
    totalItems:0,
    totalPages:1,
    currentPage:1,
    nextPage:null,
    previous:null,
    lastPage: null,
    goToPage: (updatedUrl) => {


        set({searchParams:updatedUrl})
        get().getCatalog()
    },

    prodsPerPage:'24',
    setProdsPerPage: (updatedUrl,number) => {
        set({prodsPerPage:number, activeProdsPerPage:false,searchParams:updatedUrl})
        set({currentPage:1})
        get().getCatalog()
    },
    sortProdSetting: 'שם',
    setSortProdSetting: (value) => (set({sortProdSetting: value})),



}))

export default useCatalog;