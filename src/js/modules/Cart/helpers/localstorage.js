export const setProductLocalstorage = (arr) => {
    localStorage.products = JSON.stringify(arr)
}

export const getProductsLocalStorage = () => {
    if(localStorage.products){
        return JSON.parse(localStorage.products)
    } else {
        return []
    }
}

export const removeProductsFromStorage = () => {
    localStorage.removeItem('products')
}