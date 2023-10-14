export const calculatePrice = (product, quantity, unitChosed) => {

    return parseFloat(product.Price) * parseFloat(quantity)
}

export const getDiscountPrecent = (productCart) => {
    return parseFloat((100-(parseFloat(productCart.Products.Price) * 100 /parseFloat(productCart.Products.OrgPrice))).toFixed(1));
}

export const getDiscountPrecentProduct = (product) => {
    let calc = parseFloat((100-(parseFloat(product.Price) * 100 /parseFloat(product.OrgPrice))).toFixed(1));
    if(calc) {
        return calc 
    } else {
        return 0
    }
}

export const getPriceByOriginalPrice = (element) => {
    return (parseFloat(element.Products.OrgPrice) * parseInt(element.Products.PackQuan) * element.Quantity).toFixed(1);
}

export const calPriceWithTax = (price) => {
    const res = parseFloat((parseFloat(price) * 1.17).toFixed(1)); //TODO FIX
    return res
}