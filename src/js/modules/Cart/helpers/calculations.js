export const calculatePrice = (product, quantity, unitChosed) => {

    if(product?.finalPrice){
        return parseFloat(product.finalPrice) * parseFloat(quantity)
    } else {
        return 0;
    }
}

export const getDiscountPrecent = (productCart) => {
    if(productCart?.product?.finalPrice){
        return parseFloat((100-(parseFloat(productCart.product.finalPrice) * 100 /parseFloat(productCart.product.basePrice))).toFixed(1));
    } else {
        return 0
    }
}

export const getDiscountPrecentProduct = (product) => {
    let calc = parseFloat((100-(parseFloat(product.finalPrice) * 100 /parseFloat(product.basePrice))).toFixed(1));
    if(calc) {
        return calc 
    } else {
        return 0
    }
}

export const getPriceByOriginalPrice = (element) => {
    if(element?.product?.basePrice){
        return (parseFloat(element.product.basePrice) * parseInt(element.product.packQuantity) * element.quantity).toFixed(1);
    } else {
        return 0
    }
}

export const calPriceWithTax = (finalPrice) => {
    const res = parseFloat((parseFloat(finalPrice) * 1.17).toFixed(1)); //TODO FIX
    return res
}