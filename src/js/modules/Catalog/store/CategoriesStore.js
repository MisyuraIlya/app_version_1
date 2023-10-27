import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useCategories = create((set, get) => ({
    loading: false,
    categoriesAll:[],
    categories:[],
    categoriesLvl1:[],
    categoriesLvl2:[],
    setCategories: (arr) => set({categories:arr}),
    getCategories: async () => {
        try {
            set({loading: true})
            const response = await CatalogServices.GetCategories()
            set({
                categories: response,
                categoriesLvl1:  response.filter((item) => item.lvlNumber === 1),
                categoriesLvl2: response.filter((item) => item.lvlNumber === 2),
            })
        } catch(e) {
            console.log('[ERROR]',e)
        } finally {
            set({loading: false})
        }

    },

    getAllCategories: async () => {
        try {
            set({loading: true})
            const response = await CatalogServices.GetCategoriesAll()
            set({
                categoriesAll: response,
            })
        } catch(e) {
            console.log('[ERROR]',e)
        } finally {
            set({loading: false})
        }
    }

}))

export default useCategories;