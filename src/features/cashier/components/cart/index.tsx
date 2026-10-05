import { useCartStore } from "../../stores/cart-store";
import CartHeader from "./cart-header";
import CartItemList from "./cart-item-list";
import CartSummary from "./cart-summary";

function TransactionCart() {
  const cartStore = useCartStore();

  return (
    <div className="flex flex-col px-3 h-full w-100 bg-white divide-y divide-slate-300 rounded-md">
      <CartHeader
        isCartEmpty={cartStore.items.length <= 0}
        clearCart={() => cartStore.clearCart()}
      />
      <CartItemList />
      <CartSummary
        sparepartTotal={cartStore.getSparepartsTotalAmount()}
        serviceTotal={cartStore.getServicesTotalAmount()}
        grandTotal={cartStore.getTotalAmount()}
      />
    </div>
  );
}

export default TransactionCart;
