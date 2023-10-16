import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"
import axios from "axios"
const point = "new_app/index"
const classPoint = "Catalog"

export const CatalogServices = {

    async GetCatalog(lvl1, lvl2, lvl3, searchParams){
    //     let val = {
    //         b2cPriceCode:'8',
    //         priceNoLogin:'0',
    //         lvl1id: lvl1,
    //         lvl2id: lvl2,
    //         lvl3id: lvl3,
    //         parent:0,
    //         page,
    //         prodsPerPage,
    //         urlSearch,
    //         action:'catalog',
    //         searchParam,
    //         selectedMode:1,
    //         priceFor: 1,
    //         priceCode:'',
    //         userId:'2310',
    //         userExtId: getCurrentUserId(),
    //         companyCategoryId
    //     }
    //     const valAjax = {
    //         point,
    //         classPoint,
    //         funcName: 'GetCatalog',
    //         val:val
    //       };

    //       const response = await ajax(valAjax)
        if(searchParams.includes('orderBy')){
            if(searchParams.includes('orderBy=sku')){
                let splited = searchParams.split('orderBy=sku')
                console.log('splited',splited)
                searchParams = splited[0] + `order[sku]=asc` + splited?.[1]
            } else if(searchParams.includes('orderBy=title')) {
                let splited = searchParams.split('orderBy=title') + splited?.[1]
                searchParams = splited[0] + `order[title]=asc`
            } else if(searchParams.includes('orderBy=id')) {
                let splited = searchParams.split('orderBy=id') + splited?.[1]
                searchParams = splited[0] + `order[id]=asc`
            }

        } 
        if(lvl1 && lvl2 == '0'  && lvl3 == '0') {
            const response = await axios.get(global.api + `/api/catalog/${lvl1}${searchParams}`)
            return response.data

        } else if(lvl1 && lvl2  && lvl3 == '0') {
            const response = await axios.get(global.api + `/api/catalog/${lvl1}/${lvl2}${searchParams}`)
            return response.data

        } else if(lvl1 && lvl2  && lvl3) {
            const response = await axios.get(global.api + `/api/catalog/${lvl1}/${lvl2}/${lvl3}${searchParams}`)
            return response.data
        }
        
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