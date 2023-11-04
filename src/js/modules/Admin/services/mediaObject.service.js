import axios from "axios"

export const MediaObjectService = {
    async uploadImage(file, source) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', source);
        const response = await axios.post(global.api + '/api/media_objects', formData);
        return response.data; 
    },

}