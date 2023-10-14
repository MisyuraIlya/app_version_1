import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"

const point = "new_app/index"
const classPoint = "Documents"

export const DocsService = {
    async GetDocuments(userExId, id, searchValue, documentType, fromDate, toDate, targetDate, page) {
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
            funcName: 'GetDocuments',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 
    async GetDocumentsItem(documentNumber) {
        const val = {
            userExId: getCurrentUserId(),
            documentNumber
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'GetDocumentItems',
            val:val
          };

        const response = await ajax(valAjax)
        return response
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