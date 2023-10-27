import axios from "axios"

export const AdminProductService = {
    async uploadImage(file, source) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', source);
        const response = await axios.post(global.api + '/api/media_objects', formData);
        return response.data; 
    },

    async createNewImage(product) {
        const response = await axios.post(global.api + `/api/product_images`, product);

        return response.data
    },

    async updateProduct(product) {
        const response = await axios.patch(global.api + `/api/products/${product.id}`, product, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });

        return response.data
    },

    async deleteImage(imageId) {
        const response = await axios.delete(global.api + `/api/product_images/${imageId}`);

        return response.data
    },

    async GetProducts(lvl1,lvl2,lvl3) {
        const response = await axios.get(global.api + `/api/catalog/${lvl1}/${lvl2}/${lvl3}?itemsPerPage=10000`);
        return response.data
    },
}