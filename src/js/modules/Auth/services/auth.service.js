import { ajax } from "../../../helpers/ajaxFunc"

const point = "new_app/index"
const classPoint = "Auth"

export const AuthService = {
    async login(username, password) {
        const val = {
            username,
            password
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'login',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }, 



    async getAccessToken(refreshToken){
        const val = {
            refreshToken,
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'getAccessToken',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    },

    async registerNewClient(data) {
        console.log('data',data)
        const val = {
            ...data
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'registerClient',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    },

    async validationUser(userExId, phone) {
        const val = {
            userExId,
            phone
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'validationUser',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    },

    async RegisterUser(id,email,phone, password,recovery){
        const val = {
            id,
            email,
            phone,
            password,
            recovery
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'RegisterUser',
            val:val
          };

        const response = await ajax(valAjax)
        return response
    }
}