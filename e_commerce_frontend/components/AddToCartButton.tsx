import React from 'react';
import { useShoppingCart } from '@/services/shopping_cart_api';

interface ItemProps {
  category: string;
  description: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

interface AddToCartButtonProps {
  item: ItemProps;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const { addItemToCart } = useShoppingCart();

  const handleAddToCart = () => {
    addItemToCart(item);
    alert(`${item.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className='btn btn-primary bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600'
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
