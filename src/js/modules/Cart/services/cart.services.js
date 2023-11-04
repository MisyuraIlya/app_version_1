import axios from "axios"
import { ajax } from "../../../helpers/ajaxFunc"
import { getClientExtId, getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"

const point = "new_app/index"
const classPoint = "Orders"

const CartServices = {
    async CreateOrder(comment,userExtId,total,isAgentOrder,isBuyByCreditCard,discount,documentType,deliveryPrice,deliveryDate,products) {
        const obj = {
            comment,
            userExtId,
            total,
            isAgentOrder,
            isBuyByCreditCard,
            discount,
            documentType,
            deliveryPrice,
            deliveryDate,
            products
        }
        const response = await axios.post(global.api + '/api/send_orders',obj)
        return response.data
    }, 

    // async CreateOrderOld(
    //     Order, TotalPrice, PriceNoVat, DeliveryPrice, OrdComment, Discount, //needed
    //     sendNoApproval, orderSpecialSetting, draftStatus, agentPriceOverwriteArr, selectedMode, b2bPickupDiscount,pickupSelected, orderType, RequestedDate, Agent // optional
    //     ) {
    //     const val = {
    //         UserExId: getCurrentUserId(),
    //         Order,
    //         TotalPrice,
    //         PriceNoVat,
    //         DeliveryPrice,
    //         OrdComment,
    //         Discount,
    //         sendNoApproval, 
    //         orderSpecialSetting,
    //         draftStatus,
    //         agentPriceOverwriteArr,
    //         selectedMode,
    //         b2bPickupDiscount,
    //         pickupSelected,
    //         orderType,
    //         RequestedDate,
    //         Agent
    //     }
    //     const valAjax = {
    //         point,
    //         classPoint,
    //         funcName: 'CreateOrder',
    //         val:val
    //       };

    //     const response = await ajax(valAjax)
    //     return response
    // }, 




}

export default CartServices