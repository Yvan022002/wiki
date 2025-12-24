import { Router } from "express";
import { RestaurantService } from "../services/RestaurantService";
import { Authentification } from "../middleware/Authentification";
import { RequireOwner } from "../middleware/Authentification";
import { createRestaurant, getRestaurantByOwnerId,updateRestaurant,addMenuItems,getMenuItemsByRestaurantId,getRestaurantById } from "../controllers/RestaurantController";

const Restaurantrouter = Router();
Restaurantrouter.post("/restaurants", Authentification,RequireOwner, createRestaurant)
Restaurantrouter.get("/restaurants/me", Authentification,RequireOwner, getRestaurantByOwnerId)
Restaurantrouter.get("/restaurants/:restaurantId", Authentification,getRestaurantById)
Restaurantrouter.put("/restaurants/:restaurantId", Authentification, RequireOwner, updateRestaurant)
Restaurantrouter.post("/restaurants/:restaurantId/menu-items", Authentification, RequireOwner, addMenuItems)
Restaurantrouter.get("/restaurants/:restaurantId/menu-items", Authentification, getMenuItemsByRestaurantId)

export default Restaurantrouter;