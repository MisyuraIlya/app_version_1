import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useCategories = create((set, get) => ({
    categories:[],
    setCategories: (arr) => set({categories:arr}),
    getCategories: async () => {
        const response = await CatalogServices.GetCategories()
        set({categories: response})
    }

}))

export default useCategories;