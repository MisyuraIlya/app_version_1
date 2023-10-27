import { create } from 'zustand'
import { AdminProductService } from '../services/products.service';

const useProductsEditStore = create((set, get) => ({

    products:[],
    setProducts:(arr) => set({products:arr}),
    currentCategoryId:0,
    lvl1:0,
    lvl2:0,
    lvl3:0,
    setLvl1:(lvl1) => set({lvl1:lvl1}),
    setLvl2:(lvl2) => set({lvl2}),
    setLvl3:(lvl3) => set({lvl3}),
    setCurrentCategoryId:(value) => set({currentCategoryId:value}),
    getProducts: async () => {
        const response = await AdminProductService.GetProducts(get().lvl1,get().lvl2,get().lvl3)
        set({products:response["hydra:member"]})
    },
    selectedProduct:null,
    setSelectedProduct:(product) => set({selectedProduct:product}),
    deleteImageFunc: async (imageId) => {
        let newSelected = get().selectedProduct;
        let newImages = newSelected?.imagePath.filter((item) => item.id !== imageId)
        newSelected.imagePath = newImages
        set({selectedProduct:newSelected})
        await AdminProductService.deleteImage(imageId)
    },
    updateProduct: async (product) => {
        try {
            const res = await AdminProductService.updateProduct(product)
            set({selectedProduct:res})
        } catch(e) {
            console.log('error',e)
        }
    }
}))

export default useProductsEditStore;