import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"
import axios from "axios"
const point = "new_app/index"
const classPoint = "Catalog"
import { getClientExtId } from "../../Auth/helpers/getCurrentUserId"
export const CatalogServices = {

    async GetCatalog(lvl1, lvl2, lvl3, searchParams){

        // if(searchParams.includes('orderBy')){
        //     if(searchParams.includes('orderBy=sku')){
        //         let splited = searchParams.split('orderBy=sku')
        //         searchParams = splited[0] + `order[sku]=asc` + splited?.[1]
        //     } else if(searchParams.includes('orderBy=title')) {
        //         let splited = searchParams.split('orderBy=title') 
        //         searchParams = splited[0] + `order[title]=asc` + splited?.[1]
        //     } else if(searchParams.includes('orderBy=id')) {
        //         console.log('3x')
        //         let splited = searchParams.split('orderBy=id') + splited?.[1]
        //         searchParams = splited[0] + `order[id]=asc`
        //     }
        // } 

        const response = await axios.get(global.api + `/api/catalog/${lvl1}/${lvl2}/${lvl3}${searchParams}`)
        return response.data
    
    },

    async GetAttributes(lvl1, lvl2, lvl3)
    {
        const response = await axios.get(global.api + `/api/attribute/${lvl1}/${lvl2}/${lvl3}`)
        return response.data
    },

    async GetProductsSale()
    {
        //TODO implement
    },

    async GetProductsNew()
    {
        //TODO implement
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

    // async ProductSearch(searchValue){
    //     const response = await axios.get(global.api + `/api/catalog/0/0/0?search=${searchValue}`)
    //     return response.data
    // },

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
        const response = await axios.get(global.api + `/api/categoriesApp?userExtId=${getClientExtId()}`,{
            headers: {
                'Accept': 'application/json',
              }
        })
        return response.data
    },

    async GetCategoriesFilter(searchValue) {
        const response = await axios.get(global.api + `/api/categoriesApp?userExtId=${getClientExtId()}&search=${searchValue}`,{
            headers: {
                'Accept': 'application/json',
              }
        })
        return response.data
    }




}