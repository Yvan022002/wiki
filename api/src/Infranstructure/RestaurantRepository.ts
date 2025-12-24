import { connectToDatabase } from "./DB";
import { MenuItem, MenuItemCategory, MenuItemType } from "@/src/models/MenuItem";
import mongoose, { Schema } from "mongoose";
import { Restaurant } from "../models/Restaurant";

export type createRestaurantDto = {
    ownerId: string;
    name: string;
    address: string;
    phone: string;
    photoUrl?: string;
}
export type createMenuItemDto = {
     restaurantId: string;
    name: string;
    description: string;
    category: MenuItemCategory;
    type: MenuItemType;
    price: number;
    photoUrl?: string;
}
export type updateRestaurantPhotoDto = {
     id: string;
    name?: string;
     address?: string;
    phone?: string;
    photoUrl?: string;
    rating?: number;
}
const menuItemSchema = new Schema<MenuItem>({
     restaurantId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: Object.values(MenuItemCategory), required: true },
    type: { type: String, enum: Object.values(MenuItemType), required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    photoUrl: { type: String }
});
const restaurantSchema = new Schema<Restaurant>({
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    photoUrl: { type: String },
    rating: { type: Number, default: 0 }
});
const dbRestaurantModel = mongoose.model<Restaurant>("Restaurant", restaurantSchema);
const dbMenuItemModel = mongoose.model<MenuItem>("MenuItem", menuItemSchema);
export class RestaurantRepository {

    private restaurantModel = dbRestaurantModel;
    private menuItemModel = dbMenuItemModel;
   constructor() {
        connectToDatabase();
   }
   async getRestaurantByOwnerId(ownerId: string): Promise<Restaurant | null> {
        return this.restaurantModel.findOne({ ownerId: ownerId });
   }
   async createRestaurant(restaurantDto: createRestaurantDto): Promise<Restaurant> {
        const restaurant = new this.restaurantModel(restaurantDto);
        return restaurant.save();
   }
   async updateRestaurant( restaurant: updateRestaurantPhotoDto): Promise<Restaurant | null> {
        return this.restaurantModel.findByIdAndUpdate(restaurant.id, restaurant, { new: true });
   }
   async createMenuItems( menuItemDto: createMenuItemDto[]): Promise<MenuItem[]> {
        const menuItem = this.menuItemModel.insertMany(menuItemDto);
        return menuItem;
   }
   async getMenuItemsByRestaurantId(restaurantId: string): Promise<MenuItem[]> {
        return this.menuItemModel.find({ restaurantId: restaurantId });
   }
     async getRestaurantById(restaurantId: string): Promise<Restaurant | null> {
        return this.restaurantModel.findById(restaurantId);
     }
}   