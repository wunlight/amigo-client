import { useCartStore } from "../../stores/cart-store";
import CartItem from "./cart-item";

function CartItemList() {
  const cartStore = useCartStore();

  return (
    <div className="flex flex-col p-3 h-full divide-y divide-slate-300 overflow-auto">
      {cartStore.items.length <= 0 && (
        <div className="flex flex-col items-center gap-2 my-auto">
          <span className="icon-[tabler--shopping-cart] size-16 text-slate-400" />
          <span className="text-sm text-slate-500">No items in cart</span>
        </div>
      )}

      {cartStore.items.map((i) => (
        <CartItem
          name={i.name}
          price={i.price}
          updatePrice={(newPrice) => cartStore.updatePrice(i.id, newPrice)}
          removeItem={() => cartStore.removeItem(i.id)}
          type={i.type}
          currentStock={i.stock}
          quantity={cartStore.getItemQty(i.id)}
          increaseQty={() => cartStore.incrementQty(i.id)}
          decreaseQty={() => cartStore.decrementQty(i.id)}
        />
      ))}
    </div>
  );
}

export default CartItemList;
