import { reactive } from "vue";

type Cart = {
  qty: number;
  product_name: string;
  product_variant: string;
  variant_name: string;
  variant_id: number;
  product_id: number;
  price: number;
  sku: string;
};

export const cart = reactive<Cart[]>([]);

export function addToCart(cartItem: Cart) {
  const existingItem = cart.find(
    (item) =>
      item.variant_id === cartItem.variant_id &&
      item.product_id === cartItem.product_id
  );

  if (!existingItem) {
    cart.push(cartItem);
  } else {
    existingItem.qty += cartItem.qty;
  }
}
