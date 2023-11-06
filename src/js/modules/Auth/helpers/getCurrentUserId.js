import { getPayloadToken } from "./auth.helper"

export const getCurrentUserId = () => {
    const tokensData = getPayloadToken()
    //console.log('tokensData',tokensData)
    // if(tokensData?.type === 'admin') {
    //     return tokensData.id
    // }  else if (tokensData?.type === 'agent') {
    //     return tokensData.id
    // } else if(tokensData?.type === 'user') {
        const userExId = localStorage.user ? JSON.parse(localStorage.user).extId : null
        return userExId
    // } else {
        // return null;
    // }
}

export const getUserId = () => {
    const tokensData = getPayloadToken()
    //console.log('tokensData',tokensData)
    if(tokensData?.type === 'admin') {
        return tokensData.id
    }  else if (tokensData?.type === 'agent') {
        return tokensData.id
    } else if(tokensData?.type === 'user') {
        const userExId = localStorage.user ? JSON.parse(localStorage.user).Id : null
        return userExId
    } else {
        return null;
    }
}

export const getCurrentUserName = () => {
    const tokensData = getPayloadToken()
    //console.log('tokensData',tokensData)
    if(tokensData?.type === 'admin') {
        return tokensData.Name 
    }  else if (tokensData?.type === 'agent') {
        return tokensData.Name 
    } else if(tokensData?.type === 'user') {
        const userExId = localStorage.user ? JSON.parse(localStorage.user).Name  : null
        return userExId
    } else {
        return null;
    }
}

export const getCurrentUserType = () => {
    const tokensData = getPayloadToken()
    if(tokensData.type === 'admin') {
        return 1
    }  else if (tokensData.type === 'agent') {
        return 2
    } else if(tokensData.type === 'user') {
        return 3
    } else {
        return null;
    }
}


export const getAgentExtId = () => {
    const agentExtId = localStorage.agent ? JSON.parse(localStorage.agent).extId : null
    return agentExtId
}

export const getClientExtId= () => {
    const tokensData = getPayloadToken()
    //console.log('tokensData',tokensData)
    // if(tokensData?.type === 'admin') {
    //     return tokensData.id
    // }  else if (tokensData?.type === 'agent') {
    //     return tokensData.id
    // } else if(tokensData?.type === 'user') {
        const userExId = localStorage.user ? JSON.parse(localStorage.user).extId : null
        return userExId
    // } else {
        // return null;
    // }
}

export const getClientName = () => {
    const userExId = localStorage.user ? JSON.parse(localStorage.user).name  : null
    return userExId
 
}