
import { create } from 'zustand'
import { getCurrentUserName } from '../../Auth/helpers/getCurrentUserId';
import { onErrorAlert } from '../../../agents/utils/sweetAlert';
import { getUserFromStorage } from '../../Auth/helpers/auth.helper';
import { CART_CONFIG } from '../config/custom';
import { setProductLocalstorage } from '../helpers/localstorage';
import CartServices from '../services/cart.services'
const useCart = create((set, get) => ({
	loading: false,
    cart: [],

	setCart: (data) => {
		set({cart: data})
	},
	getCartItem: (product) => {
		const cart = get().cart;
		const itemFind = cart.filter((item) => item.Id === product.CatalogNumber);
		if (itemFind.length > 0) {
			return itemFind[0];
		} else {
			return [];
		}
	},
	addToCart: (product, parent = null) => {
		console.log('product?.ParentId',product?.ParentId)
		const { cart } = get();
		const existingProduct = cart.find((item) => item.CatalogNumber === product.CatalogNumber);
		if (existingProduct) {
		  const updatedCart = cart.map((item) =>
			item.CatalogNumber === product.CatalogNumber
			  ? {
				  ...item,
				  Quantity: item.Quantity + 1,
				  UnitChosen:
					parseInt(item.Products.PackQuan) !== 1 &&
					item.Products.Unit === '1'
					  ? 1
					  : 0,
				}
			  : item
		  );
	
		  set({ cart: updatedCart });
		} else {
		  const cartProduct = {
			Id: product.CatalogNumber,
			Quantity: 1,
			Products: product,
			SelectedProduct: product?.ParentId ? parent : product,
			CategoryId: product.CatalogNumber,
			UnitChosen:
			  parseInt(product.PackQuan) !== 1 && product.Unit === '1' ? 1 : 0,
		  };
	
		  set({ cart: [...cart, cartProduct] });
		  setProductLocalstorage([...cart, cartProduct])
		}
	  },
	increaseCart: (itemId) => {
		const cart = get().cart;
		const itemIndex = cart.findIndex((item) => item.Id === itemId);
		if (itemIndex !== -1) {
			cart[itemIndex].Quantity += 1;
		} else {
			console.error("Item not found in cart");
		}
		set({ cart }); 
		setProductLocalstorage(cart)
	},
	decreaseCart: (itemId) => {
		const cart = get().cart;
		const itemIndex = cart.findIndex((item) => item.Id === itemId);
		if (itemIndex !== -1) {
			cart[itemIndex].Quantity -= 1;
		} else {
			console.error("Item not found in cart");
		}
		set({ cart }); 
		setProductLocalstorage(cart)
	},
	deleteFromCart: (itemId) => {
		const cart = get().cart;
		const filtered = cart.filter((item) => item.Id !== itemId);
		set({ cart: filtered }); 
		setProductLocalstorage(filtered)
	},
	changeQuantity: (itemId, quantity) => {
		const cart = get().cart;
		const itemIndex = cart.findIndex((item) => item.Id === itemId);
		if (itemIndex !== -1) {
			cart[itemIndex].Quantity = quantity;
		} else {
			console.error("Item not found in cart");
		}
		set({ cart }); 
		setProductLocalstorage(cart)
	},
	avoidNullInCart: (itemId) => {
		const cart = get().cart;
		const itemIndex = cart.findIndex((item) => item.Id === itemId);
		if (itemIndex.Quantity == 0) {
			deleteFromCart(id);
		}

	},

    selectedMode: 1, // 1 - order | 2 - Request | 3 - Return
    CartTitle: () => {
        let totalTitle = 'סיכום';
		if(get().selectedMode == '1'){
			totalTitle += ' ' + 'הזמנה';
		}else if(get().selectedMode == '2'){
			totalTitle += ' ' + 'ה.מחיר';
		}else if(get().selectedMode == '3'){
			totalTitle += ' ' + 'החזרה';
		}
		totalTitle += ' | ' + getCurrentUserName();
        return totalTitle;
    },
    saveAsDraft: () => {},
    goToDrafts: () => {},
    priceBefore: 0,
    deliveryPrice: 0,
    discount: 0,
    Maam: 17,
    totalBasket: 0,
	sendNoApproval: false,
	setSendNoApproval: (bool) => ({sendNoApproval: bool}),
    specialSettingsPop: false,
    setSpecialSettingsPop: (bool) => ({specialSettingsPop: bool}),
	comment: '',
	setComment: (value) => set({comment:value}),
	b2bPickupDiscount:0,

	// ========== MAIN FUNCTIONS ==========

	sendOrder: () => {
		try {
			set({loading:true})
			const response = CartServices.CreateOrder(
					get().cart,
					get().deliveryPrice,
					get().comment
				)
		} catch(e) {
			console.log('error',e)
		} finally {	
			set({loading:false})
		}
	},

	
	// ========== ALL CALCULATIONS ==========

	calculateProductByQuantityAndPackage: (product) => {
		if(product?.Id) {
		console.log('product',product, parseFloat(product.Products.Price) * product.Quantity * parseInt(product.Products.PackQuan))

			return (parseFloat(product.Products.Price) * product.Quantity * parseInt(product.Products.PackQuan)).toFixed(1) 
		} else {
			return 0
		}
	},

	priceBeforeTax: () => {
		const priceBefore = get().cart.reduce((accumulator, item) => {
			const itemPrice = item.Products.Price * item.Quantity;
			return accumulator + itemPrice;
		  }, 0); 

		return priceBefore
	},

	calucalteDiscountTotal: () => {
		const priceBefore = get().priceBeforeTax()
		let discount =  getUserFromStorage().Discount ? parseFloat( getUserFromStorage().Discount) : 0
		let first = priceBefore * discount
		if(CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.ENABLED){
			if(priceBefore >= CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.PRICE_MAX) {
				let newPrecent = discount + CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.PRECENT
				first = priceBefore * newPrecent
			}
		} 
		let second = first / 100
		return second
	},

	getTotalDiscountPrecet: () => {
		const priceBefore = get().priceBeforeTax()
		let discount =  getUserFromStorage().Discount ? parseFloat( getUserFromStorage().Discount) : 0
		if(CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.ENABLED){
			if(priceBefore >= CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.PRICE_MAX) {
				discount = discount + CART_CONFIG.ADD_DISCOUNT_AFTER_PRICE.PRECENT
			}
		} 
		return discount
	},

	calculatePriceAfterDiscount: () => {
		const priceBefore = get().priceBeforeTax();
		const discountPrice = get().calucalteDiscountTotal();

		return priceBefore - discountPrice;
	},

	calculateTax: () => {
		return (get().calculatePriceAfterDiscount() * get().Maam) / 100
	},

	calculateFinalPrice: () => {
		return get().calculatePriceAfterDiscount() + get().calculateTax()
	}
	

}))

export default useCart;