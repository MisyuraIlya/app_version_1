import { getPayloadToken } from "./auth.helper"

export const getCurrentUserId = () => {
    const tokensData = getPayloadToken()
    //console.log('tokensData',tokensData)
    if(tokensData?.type === 'admin') {
        return tokensData.id
    }  else if (tokensData?.type === 'agent') {
        return tokensData.id
    } else if(tokensData?.type === 'user') {
        const userExId = localStorage.user ? JSON.parse(localStorage.user).ExId : null
        return userExId
    } else {
        return null;
    }
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