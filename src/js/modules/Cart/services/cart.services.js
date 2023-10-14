import { ajax } from "../../../helpers/ajaxFunc"
import { getCurrentUserId } from "../../Auth/helpers/getCurrentUserId"

const point = "new_app/index"
const classPoint = "Orders"

const CartServices = {
    async CreateOrder(
        Order,DeliveryPrice, OrdComment //needed
        ) {
        console.log('Order',Order)
        const val = {
            UserExId: getCurrentUserId(),
            Order,
            DeliveryPrice,
            OrdComment,
        }
        const valAjax = {
            point,
            classPoint,
            funcName: 'CreateOrder',
            val:val
          };

        const response = await ajax(valAjax)
        return response
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