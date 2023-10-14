import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"
import axios from "axios"
const point = "new_app/index"
const classPoint = "Catalog"

export const CatalogServices = {

    async GetCatalog(lvl1, lvl2, lvl3, page, prodsPerPage, urlSearch,searchParam, companyCategoryId){
        let val = {
            b2cPriceCode:'8',
            priceNoLogin:'0',
            lvl1id: lvl1,
            lvl2id: lvl2,
            lvl3id: lvl3,
            parent:0,
            page,
            prodsPerPage,
            urlSearch,
            action:'catalog',
            searchParam,
            selectedMode:1,
            priceFor: 1,
            priceCode:'',
            userId:'2310',
            userExtId: getCurrentUserId(),
            companyCategoryId
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'GetCatalog',
            val:val
          };

          const response = await ajax(valAjax)
          return response
    },

    async GetItemData (catalogNumber) {
        const val = {
            userExId: getCurrentUserId(),
            catalogNumber,
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'GetItemData',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    },

    async ProductSearch(searchValue){
        let val = {
            searchValue,
            userExtId:getCurrentUserId(),
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'ProductSearch',
            val:val
          };

          const response = await ajax(valAjax)
          return response
    },

    async PurchaseHistoryPerUser(userExId, catalogNumber) {
        const val = {
            userExId,
            catalogNumber,
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'PurchaseHistoryPerUser',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 

    //NEW API

    async GetCategories() {
        const response = await axios.get(global.api + '/api/categories',{
            headers: {
                'Accept': 'application/json',
              }
        })
        return response.data
    }


}