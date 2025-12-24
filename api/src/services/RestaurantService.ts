import { CreateContextOptions } from "node:vm";
import { createRestaurantDto, RestaurantRepository } from "../Infranstructure/RestaurantRepository";
import { Restaurant } from "../models/Restaurant";
import { createMenuItemDto } from "../Infranstructure/RestaurantRepository";
import { MenuItem } from "../models/MenuItem";
import { updateRestaurantPhotoDto } from "../Infranstructure/RestaurantRepository";

export class RestaurantService {
    private restaurantRepo: RestaurantRepository;
    constructor() {
        this.restaurantRepo = new RestaurantRepository();
    }
    async createRestaurant(createRestaurantDto: createRestaurantDto): Promise<Restaurant> {
        try {
            const hasRestaurant = await this.restaurantRepo.getRestaurantByOwnerId(createRestaurantDto.ownerId);
            if(hasRestaurant){
                throw new Error("Owner already has a restaurant");
            }
            console.log("Creating restaurant with data:", createRestaurantDto);
            const restaurant = await this.restaurantRepo.createRestaurant(createRestaurantDto);
            console.log("Created restaurant:", restaurant);
            return restaurant;
        } catch (error) {
            console.error("Error creating restaurant:", error);
            throw error;
        }
    }
    async getRestaurantByOwnerId(ownerId: string): Promise<Restaurant | null> {
        try {
            console.log("Fetching restaurant for owner ID:", ownerId);
            const restaurant = await this.restaurantRepo.getRestaurantByOwnerId(ownerId);
            console.log("Fetched restaurant:", restaurant);
            return restaurant;
        } catch (error) {
            console.error("Error fetching restaurant:", error);
            throw error;
        }
    }
    async updatePhotoToRestaurant( restaurant: updateRestaurantPhotoDto): Promise<Restaurant | null> {
        try {
            console.log("Updating restaurant ID:", restaurant.id, "with data:", restaurant);
            const updatedRestaurant = await this.restaurantRepo.updateRestaurant(restaurant);
            console.log("Updated restaurant:", updatedRestaurant);
            return updatedRestaurant;
        } catch (error) {
            console.error("Error updating restaurant:", error);
            throw error;
        }
    }
    async addMenuItems( menuItemDto: createMenuItemDto[]): Promise<MenuItem[]> {
        try {
            console.log("Adding menu items", menuItemDto);
            const menuItems = await this.restaurantRepo.createMenuItems(menuItemDto);
            console.log("Added menu items:", menuItems);
            return menuItems;
        } catch (error) {
            console.error("Error adding menu items:", error);
            throw error;
        }
    }
    async getMenuItemsByRestaurantId(restaurantId: string): Promise<MenuItem[]> {
        try {
            console.log("Fetching menu items for restaurant ID:", restaurantId);
            const menuItems = await this.restaurantRepo.getMenuItemsByRestaurantId(restaurantId);
            console.log("Fetched menu items:", menuItems);
            return menuItems;
        } catch (error) {
            console.error("Error fetching menu items:", error);
            throw error;
        }
    }
    async getRestaurantById(restaurantId: string): Promise<Restaurant | null> {
        try {
            console.log("Fetching restaurant with ID:", restaurantId);
            const restaurant = await this.restaurantRepo.getRestaurantById(restaurantId);
            console.log("Fetched restaurant:", restaurant);
            return restaurant;
        } catch (error) {
            console.error("Error fetching restaurant:", error);
            throw error;
        }
    }
}
export const restaurantService = new RestaurantService();