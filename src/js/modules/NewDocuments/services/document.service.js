import axios from "axios"

export const DocumentsService = {
    async GetDocuments(userExId, documentType, fromDate, toDate,page) {
        const response = await axios.get(global.api + `/api/documents?userExId=${userExId}&from=${fromDate}&to=${toDate}&documentType=${documentType}&page=${page}`)
        return response.data
    }, 

    async GetDocumentsItem(documentNumber) {
        const response = await axios.get(global.api + `/api/documents/${documentNumber}`)
        return response.data
    }, 
    
    async GetKartesset(userExId, fromDate, toDate){
        const response = await axios.get(global.api + `/api/cartessets/${userExId}?from=${fromDate}&to=${toDate}`)
        return response.data
    },

    async GetHistory(userExId, fromDate, toDate) {
        const response = await axios.get(global.api + `/api/histories?createdAt[before]=${toDate}&createdAt[after]=${fromDate}&user.extId=${userExId}`)
        return response.data
    }, 
    async GetHistoryItem(documentId) {
        const response = await axios.get(global.api + `/api/histories/${documentId}`)
        return response.data
    }, 

    async RestoreCart(documentType,userExtId,documentNumber){
        const response = await axios.get(global.api + `/api/restoreCart/${documentType}/${userExtId}/${documentNumber}`,{
            headers: {
                'Accept': 'application/json',
              }
        })

        return response.data
    },

    async createPdf(data){
        const response = await axios.post(global.api + `/api/pdf`,data)
        return response.data
    },
    async createXl(data){
        const response = await axios.post(global.api + `/api/xl`, data)
        return response.data
    }

}