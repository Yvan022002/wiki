import { Document } from 'mongoose';
export enum MenuItemCategory {
    Appetizer = "Entrée",
    Breakfast = "Déjeuner",
    MainCourse = "Plat Principal",
    Dessert = "Dessert",
    Beverage = "Boisson",
}
export enum MenuItemType {
    Vegetarian = "Végétarien",
    Italian= "Italien",
    Chinese= "Chinois",
    Mexican= "Mexicain",
    Indian= "Indien",
    American= "Américain",
    French= "Français",
    Japanese= "Japonais",
    Mediterranean= "Méditerranéen",
}
export interface MenuItem extends Document {
    restaurantId: string;
    name: string;
    description: string;
    category: MenuItemCategory;
    type: MenuItemType;
    price: number;
    rating?: number;
    photoUrl?: string;
}