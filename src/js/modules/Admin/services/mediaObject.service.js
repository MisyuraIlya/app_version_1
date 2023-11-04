import axios from "axios"

export const MediaObjectService = {
    async uploadImage(file, source) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', source);
        const response = await axios.post(global.api + '/api/media_objects', formData);
        return response.data; 
    },

    async ftpUploader(fileName,sourceVps1,sourceVps3) {
        let obj = {
            fileName,
            sourceVps1,
            sourceVps3
        }
        const response = await axios.post(global.api + '/ftpFileUploader',obj)
        return response.data
    }

}