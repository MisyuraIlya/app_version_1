import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useCategories = create((set, get) => ({
    categories:[],
    getCategories: async () => {
        const response = await CatalogServices.GetCategories()
        set({categories: response})
    }

}))

export default useCategories;