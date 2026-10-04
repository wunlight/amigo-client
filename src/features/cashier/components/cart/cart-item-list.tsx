import { useCartStore } from "../../stores/cart-store";
import ServiceCartItem from "./service-cart-item";

function CartItemList() {
  const cartStore = useCartStore();

  return (
    <div className="flex flex-col p-3 h-full divide-y divide-slate-300 overflow-auto">
      {cartStore.getServices().map((s) => (
        <ServiceCartItem
          key={s.id}
          name={s.name}
          price={s.price}
          onRemove={() => cartStore.removeItem(s.id)}
        />
      ))}
    </div>
  );
}

export default CartItemList;
