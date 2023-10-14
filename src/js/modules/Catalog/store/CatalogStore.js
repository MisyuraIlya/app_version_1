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
    setCatalogParameters: (lvl1, lvl2, lvl3, page) => {
        set({
            lvl1id: lvl1,
            lvl2id: lvl2,
            lvl3id: lvl3,
            page,
        })
    },

    // FILTERS 
    prodsPerPage:'24',
    setProdsPerPage: (value) => {
        set({prodsPerPage:value, activeProdsPerPage:false})
        get().getCatalog()
    },
    activeProdsPerPage: false,
    setActiveProdsPerPage: (value) => (set({activeProdsPerPage: value})),
    activeSortPerPage:false,
    setActiveSortPerPage: (value) => (set({activeSortPerPage: value})),
    sortProdSetting: 'שם',
    setSortProdSetting: (value) => (set({sortProdSetting: value})),
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
    setSearchParam: (value) => {set({searchParam:value})},
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
                get().page, 
                get().prodsPerPage,
                get().urlSearch,
                get().searchParam,
                get().lvl1id
                )

            if(response.status === 'success') {
                const res1 = response.data.categories.filter((item) => item.LvlNumber == 1)
                const res2 = response.data.categories.filter((item) => item.LvlNumber == 2)
                const res3 = response.data.categories.filter((item) => item.LvlNumber == 3)
                const filters = response.data.filterObj
                const products = response.data.products
                const pagination = response.data.paginateObj
                set({categoriesLvl1:res1, categoriesLvl2: res2, categoriesLvl3: res3, filters: filters, products:products, paginateObj:pagination})
            }
        } catch(e) {
            console.log('[ERROR] error fetch catalog',e)
        } finally {
            set({loading:false})
        }

    },
    toShow:24,

}))

export default useCatalog;