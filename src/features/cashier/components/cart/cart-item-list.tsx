import { useCartStore } from "../../stores/cart-store";
import ServiceCartItem from "./service-cart-item";
import SparepartCartItem from "./sparepart-cart-item";

function CartItemList() {
  const cartStore = useCartStore();

  return (
    <div className="flex flex-col p-3 h-full divide-y divide-slate-300 overflow-auto">
      {cartStore.items.length <= 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="icon-[tabler--shopping-cart] text-5xl text-slate-400" />
          <span className="text-sm text-slate-500">No items in cart</span>
        </div>
      )}

      {cartStore.getSpareparts().map((s) => (
        <SparepartCartItem
          key={s.id}
          name={s.name}
          price={s.price}
          cartQty={cartStore.getItemQty(s.id)}
          totalPrice={cartStore.getItemTotalPrice(s.id)}
          updatePrice={(newPrice) => cartStore.updatePrice(s.id, newPrice)}
          increaseQty={() => cartStore.incrementQty(s.id)}
          decreaseQty={() => cartStore.decrementQty(s.id)}
        />
      ))}

      {cartStore.getServices().map((s) => (
        <ServiceCartItem
          key={s.id}
          name={s.name}
          price={s.price}
          updatePrice={(newPrice) => cartStore.updatePrice(s.id, newPrice)}
          onRemove={() => cartStore.removeItem(s.id)}
        />
      ))}
    </div>
  );
}

export default CartItemList;
