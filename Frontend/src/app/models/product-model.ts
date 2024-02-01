import { CategoryModel } from "./category-model";

export interface ProductModel {
    id: number;
    name: string;
    price: number;
    tax: number;
    url: string;
    count:number;
    category_id:number;
    category:CategoryModel;
}