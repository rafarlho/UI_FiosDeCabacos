import { effect } from "@angular/core";
import { products } from "../components/products/products-config";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

type CartState = {
    selectedItems: CartItem[]
}

const initialState : CartState =  {
    selectedItems: []
}

const CART_STORAGE_KEY = 'cartState';

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
            this.saveStateToLocalStorage({selectedItems:currentItems})
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
                this.saveStateToLocalStorage({selectedItems:currentItems})
                patchState(store,{selectedItems:currentItems})
            }
        },

        clearStore() {
            this.saveStateToLocalStorage({selectedItems:[]})
            patchState(store,{selectedItems:[]})
        },

        loadStateFromLocalStorage() {
            try {
                const storedState = localStorage.getItem(CART_STORAGE_KEY);
                if (storedState) {
                    const parsedState: CartState = JSON.parse(storedState);
                    patchState(store, parsedState);
                }
            } catch (e) {
                console.error("Error loading state from localStorage", e);
            }
        },

        saveStateToLocalStorage(stateToSave: CartState) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stateToSave));
            } catch (e) {
                console.error("Error saving state to localStorage", e);
            }
        }
    })),

    withHooks(store => ({
        onInit() {
            store.loadStateFromLocalStorage();
        },
    }))
)