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
        const val = {
            userExId,
            fromDate,
            toDate
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'GetCartesset',
            val:val
          };

        const response = await ajax(valAjax)
        return response 
    },

    async GetLocalDocuments(userExId, id, searchValue, documentType, fromDate, toDate, targetDate, page) {
        const val = {
            userExId,
            id,
            searchValue,
            documentType,
            fromDate,
            toDate,
            targetDate, 
            page
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'GetLocalDocuments',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 

}