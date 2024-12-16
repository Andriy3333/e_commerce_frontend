export type Item = {
  itemID: number;
  category: string; // Category of the item (e.g., electronics, clothing)
  description: string; // Description of the item
  name: string; // Name of the item
  brand: string; // Brand of the item
  price: number; // Price of the item (in cents or dollars)
  quantity: number; // Quantity available in stock
  amountOrdered: number; // Amount ordered by the user
};