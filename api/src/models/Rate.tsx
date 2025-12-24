export interface Rate {
    id: string;
    clientId: string;
    restaurantId: string;
    content?: string;
    createdAt: Date;
    rating: number;
}