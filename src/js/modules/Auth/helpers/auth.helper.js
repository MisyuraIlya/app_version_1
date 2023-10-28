import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';

export const getAccessToken = () => {
    const accessToken = Cookies.get('accessToken')
    return accessToken || null
}

export const getRefreshToken = () => {
    const accessToken = Cookies.get('refreshToken')
    return accessToken || null
}

export const updateAccessToken = (accessToken) => {
    Cookies.set('accessToken', accessToken)
}

export const saveTokensStorage = (accessToken,refreshToken) => {
    Cookies.set('accessToken', accessToken)
    Cookies.set('refreshToken', refreshToken)
}

export const getUserFromStorage = () => {
    // const data = getPayloadToken();
    // if(data?.type === 'user') {
        return JSON.parse(localStorage.getItem('user') || null)
    // } else if(data?.type === 'agent') {
    //     return JSON.parse(localStorage.getItem('agent') || null)
    // } else if(data?.type === 'admin') {
    //     return localStorage.getItem('role') || null
    // } else {
    // }

}
 
export const removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    let siteVer = localStorage.siteVer;
    localStorage.clear()
    localStorage.siteVer = siteVer;
}

export const saveToStorage = (data) => {
    saveTokensStorage(data.token, data.refresh_token)
    const decoded = jwt.decode(data.token);
    // console.log('decoded',decoded)
    // if(decoded.type === 'user') {
        localStorage.setItem('user', JSON.stringify(data.user))
    // }
    // if(decoded.type === 'agent') {
    //     localStorage.setItem('agent', JSON.stringify(data.user))
    // }
    // localStorage.setItem('date', decoded.date.date)

    // if(data?.role) {
    //     localStorage.setItem('role', data.role);
    // }
    // if(data?.agentExId) {
    //     localStorage.setItem('agentExId',data.agentExId)
    // }
    // if(!data.role && !data.agentExId) {
    //     localStorage.setItem('selectedMode',1)
    // }

}

export const getPayloadToken = () => {
    const token = getAccessToken()
    const decoded = jwt.decode(token);
    return decoded;
}


//========================

export const getRole = () => {
    const res = getPayloadToken()

    if(res?.roles.includes("ROLE_USER")) {
        return 'USER'
    } else if(res?.roles.includes("ROLE_ADMIN")){
        return 'ADMIN'
    } else if(res?.roles.includes("ROLE_AGENT")) {
        return 'AGENT'
    } else if(res?.roles.includes("ROLE_SUPER_AGENT")) {
       return 'SUPER_AGENT'
    } else {
        return null;
    }
}