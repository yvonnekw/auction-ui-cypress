
import { Product } from './products';
export interface Category {
	categoryId?: number;
	description?: string;
	name?: string;
	products?: Array<Product>;
}
