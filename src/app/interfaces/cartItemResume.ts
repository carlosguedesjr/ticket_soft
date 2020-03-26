import { CartItem } from './cartItem';

export class cartItemResume{
    constructor(public cartItem: CartItem, private quantity: number = 1){}
    
    value(): number{
        return this.cartItem.price * this.quantity
    }
}