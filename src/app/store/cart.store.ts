import { Product } from "../models/product.model"
import { signalStore, withComputed, withState } from '@ngrx/signals';

type CartState = {
    selectedProducts: Product[]
}

const initialState : CartState =  {
    selectedProducts:[]
}

export const CartStore = signalStore({

})