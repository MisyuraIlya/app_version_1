import { create } from 'zustand'
import { AdminProductService } from '../services/products.service';

const useProductsEditStore = create((set, get) => ({

    products:[],
    setProducts:(arr) => set({products:arr}),
    currentCategoryId:0,
    setCurrentCategoryId:(value) => set({currentCategoryId:value}),
    getProducts: async (categoryId) => {
        const response = await AdminProductService.GetProducts(categoryId)
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