import { createSlice } from "@reduxjs/toolkit";


const fetchStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const storeInStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
}



const initialState = {
    carts: fetchStorage(),
    itemsCount:0,
    totalAmount:0,
    isCartMsgOn: false
} 


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isIteminCart = state.carts.find(item => item.id === action.payload.id);

            if(isIteminCart){
                const tempCart = state.carts.map(item => {
                    if(item.id === action.payload.id){
                        let tempQty = item.quantity + action.payload.quantity;
                        let tempTotalPrice = tempQty * item.discountPrice;

                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    }else {
                        return item;
                    }
                });

                state.carts = tempCart;
                storeInStorage(state.carts);
            } else {
                state.carts.push(action.payload);
                storeInStorage(state.carts);
            }

            state.itemsCount = state.carts.length;
            state.totalAmount = state.carts.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
        },

        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            storeInStorage(state.carts);

            state.itemsCount = state.carts.length;
            state.totalAmount = state.carts.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
        },

        clearCart: (state) => {
            state.carts = [];
            storeInStorage(state.carts);

            state.itemsCount = 0;
            state.totalAmount = 0;
        },

        getCartTotal: (state) => {
            let { totalAmount, itemsCount } = state.carts.reduce((cartTotal, cartItem) => {
                const { totalPrice, quantity } = cartItem;
                cartTotal.totalAmount += totalPrice;
                cartTotal.itemsCount += quantity;

                return cartTotal;
            }, {
                totalAmount: 0,
                itemsCount: 0
            });

            state.totalAmount = totalAmount;
            state.itemsCount = itemsCount;
        },

        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if(action.payload.type === "INC"){
                        tempQty++;
                        if(tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountPrice;
                    }

                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountPrice;
                    }

                    
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInStorage(state.carts);
        },

        setCartMsgOn: (state) => {
            state.isCartMsgOn = true;
        },

        setCartMsgOff: (state) => {
            state.isCartMsgOn = false;
        }
    }
});

export const {addToCart, setCartMsgOff, setCartMsgOn, getCartTotal, toggleCartQty, clearCart, removeFromCart} = cartSlice.actions;
export const getCartMsgStatus = (state) => state.cart.isCartMsgOn;
export const getCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartState = state => state.cart;
export const getCartItems = state => state.cart.carts;
export const getItemsCount = state => state.cart.itemsCount;
export const getTotalAmount = state => state.cart.totalAmount;
export default cartSlice.reducer;