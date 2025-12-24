import { Request, Response } from "express";
import { createRestaurantDto } from "../Infranstructure/RestaurantRepository";
import { restaurantService } from "../services/RestaurantService";
import { Restaurant } from "../models/Restaurant";
import { createMenuItemDto } from "../Infranstructure/RestaurantRepository";
import { MenuItem } from "../models/MenuItem";
import { updateRestaurantPhotoDto } from "../Infranstructure/RestaurantRepository";
export async function createRestaurant(req: Request, res: Response) {
    try {
        const ownerId: string = req.user!.id;
        const createRestaurantDto: createRestaurantDto = { ...req.body, ownerId };
        const restaurant = await restaurantService.createRestaurant(createRestaurantDto);
        return res.status(200).send({ message: "Restaurant created", restaurant: restaurant });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}
export async function getRestaurantByOwnerId(req: Request, res: Response) {
    try {
        const ownerId: string = req.user!.id;
        const restaurant = await restaurantService.getRestaurantByOwnerId(ownerId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        return res.status(200).send({ restaurant: restaurant });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}
export async function getRestaurantById(req: Request, res: Response) {
    try {
        console.log("Getting restaurant params:", req.params);
        const restaurantId: string = req.params.restaurantId;
        const restaurant = await restaurantService.getRestaurantById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        return res.status(200).send({ restaurant: restaurant });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}
export async function updateRestaurant(req: Request, res: Response) {
    try {
        const id: string = req.params.restaurantId;
        const restaurant: updateRestaurantPhotoDto = { ...req.body, id };
        const updatedRestaurant = await restaurantService.updatePhotoToRestaurant(restaurant);
        if (!updatedRestaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        return res.status(200).send({ message: "Restaurant updated", restaurant: updatedRestaurant });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}
export async function addMenuItems(req: Request, res: Response) {
    try {
        const restaurantId: string = req.params.restaurantId;
        const bodyItems = req.body;
        console.log("Adding menu items with body:", bodyItems);
        const menuItemDto: createMenuItemDto[] = bodyItems.map((item: any) => ({ ...item, restaurantId }));
        const menuItems = await restaurantService.addMenuItems(menuItemDto);
        if (menuItems.length === 0) {
            return res.status(404).send({ message: "No menu items were added" });
        }
        return res.status(200).send({ message: "Menu items added", menuItems: menuItems });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}
export async function getMenuItemsByRestaurantId(req: Request, res: Response) {
    try {
        const restaurantId: string = req.params.restaurantId;
        const menuItems: MenuItem[] = await restaurantService.getMenuItemsByRestaurantId(restaurantId);
        if (menuItems.length === 0) {
            return res.status(404).send({ message: "No menu items found for this restaurant" });
        }
        return res.status(200).send({ menuItems: menuItems });
    } catch (error) {
        return res.status(500).send({ message: error instanceof Error ? error.message : error });
    }
}