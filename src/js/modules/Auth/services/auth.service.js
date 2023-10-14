import axios from 'axios'

export const AuthService = {
    async login(username, password) {

        const response = await axios.post(global.api + '/api/auth',
        {
            username,
            password
        })

        return response.data
    }, 
    async getAccessToken(refreshToken){
        const response = await axios.post(global.api + '/api/auth/refresh', {
            refresh_token: refreshToken
        })
        return response.data
    },
    async validation(userExId, phone) {
        const response = await axios.post(global.api+'/auth/validation',{
            exId:userExId,
            phone
        })
        return response.data
    },
    async registration(extId, username, password){
        const response = await axios.put(global.api + '/auth/registration', {
            extId,
            username,
            password
        })
        return response.data
    },

    async restorePasswordStepOne(email) {
        const response = await axios.post(global.api + '/auth/restorePasswordStepOne', {
            email,
        })
        return response.data
    },

    async restorePasswordStepTwo(email, token, password) {
        const response = await axios.post(global.api + '/auth/restorePasswordStepTwo', {
            email,
            token,
            password
        })
        return response.data
    }
}