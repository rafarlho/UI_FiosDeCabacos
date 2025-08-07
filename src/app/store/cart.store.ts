import { products } from "../components/products/products-config";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model"
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type CartState = {
    selectedItems: CartItem[]
}

const initialState : CartState =  {
    selectedItems: []
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods(store => ({
        addProduct(newProduct:Product) {
            const currentItems = store.selectedItems()
            const currentItem = currentItems.find((cartItem:CartItem)=> cartItem.product === newProduct)
            if(currentItem)
                currentItem.quantity += 1
            
            else
                currentItems.push({product:newProduct, quantity:1})

            patchState(store,{selectedItems:currentItems})
        },

        updateQuantity(cartItem:CartItem,newQuantity:number) {
            const currentItems = store.selectedItems()
            const foundItem = currentItems.find((item:CartItem) => item = cartItem)
            if(foundItem) {
                if(newQuantity === 0) {
                    currentItems.splice(currentItems.findIndex((item:CartItem) => item === cartItem))
                } else {
                    foundItem.quantity = newQuantity
                }
                patchState(store,{selectedItems:currentItems})
            }
        },

        clearStore() {
            patchState(store,{selectedItems:[]})
        }
    }))
)