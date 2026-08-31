import { Category } from './Category';
export interface Product {
	availableForBuyNow?: boolean;
	brandName?: string;
	buyNowPrice?: number;
	category?: Category;
	colour?: string;
	description?: string;
	productId?: number;
	productName?: string;
	productSize?: string;
	quantity?: number;
	sellerId?: number;
	sold?: boolean;
	startingPrice?: number;
}
