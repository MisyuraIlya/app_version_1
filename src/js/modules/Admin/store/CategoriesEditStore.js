import { create } from 'zustand'

const useCategoriesEditStore = create((set, get) => ({

    search:'',
    setSearch: (value) => set({search:value}) 
}))

export default useCategoriesEditStore;