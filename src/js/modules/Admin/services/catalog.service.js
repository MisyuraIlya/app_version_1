import axios from "axios"

export const AdminCatalogService = {
    async uploadImage(file, source) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', source);
        const response = await axios.post(global.api + '/api/media_objects', formData);
        return response.data; 
    },

    async updateCategory(category) {
        const response = await axios.patch(global.api + `/api/categories/${category.id}`, category, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });

        return response.data
    }
}