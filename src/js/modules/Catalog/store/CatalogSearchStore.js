import { create } from 'zustand'
import { CatalogServices } from '../services/catalog.services';

const useCatalogSearchStore = create((set, get) => ({
    loading:false,
}))

export default useCatalogSearchStore;