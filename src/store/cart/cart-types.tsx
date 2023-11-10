import { CategoryItem } from "../categories/category-types";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_IS_CART_OPEN ='SET_IS_CART_OPEN'
};

//since cart items has the same shape and properties of category items, but requires an additional property "quantity", we bring in the CategoryItem type and just intersect it with a new type that has a quantity property
export type CartItem = CategoryItem & {
    quantity: number;
};