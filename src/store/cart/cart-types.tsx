import { CategoryItem } from "../categories/category-types";

// type CategoryItem = {
//     id: number,
//     imageUrl: string,
//     name: string,
//     price: number,
// };

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_IS_CART_OPEN ='SET_IS_CART_OPEN'
};

//since cart items has the same shape and properties / shape of category items, but requires an additional "quantity" property, we bring in the CategoryItem type and just intersect it with a new type that has a quantity property
export type CartItem = CategoryItem & {
    quantity: number;
};


// OLD CODE
// export const CART_ACTION_TYPES = {
//     SET_CART_ITEMS: 'SET_CART_ITEMS',
//     SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
// }