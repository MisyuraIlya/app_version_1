import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"
import axios from "axios"
const point = "new_app/index"
const classPoint = "Documents"

export const DocsService = {
    async GetDocuments(userExId, documentType, fromDate, toDate,page) {
        const response = await axios.get(global.api + `/api/documents?userExId=${userExId}&from=${fromDate}&to=${toDate}&documentType=${documentType}&page=${page}`)
        return response.data
    }, 

    async GetDocumentsItem(documentNumber) {
        const response = await axios.get(global.api + `/api/documents/${documentNumber}`)
        return response.data
    }, 
    
    async DownloadXls(documentNumber, documentType) {
        const val = {
            userExId: getCurrentUserId(),
            documentNumber,
            fileType: documentType,
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'DownloadXls',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 
    async DownloadCartesset(userExId,documentType,fromDate, toDate) {
        const val = {
            userExId,
            fileType: documentType,
            fromDate,
            toDate
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'DownloadCartesset',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 
    async CartRestore(userExId, documentNumber){
        const val = {
            userExId,
            documentNumber
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'CartRestore',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    },
    async GetCartesset(userExId, fromDate, toDate){
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

}