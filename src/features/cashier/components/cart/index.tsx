import CartHeader from "./cart-header";
import CartItemList from "./cart-item-list";
import CartSummary from "./cart-summary";

function TransactionCart() {
  return (
    <div className="flex flex-col px-3 h-full w-100 bg-white divide-y divide-slate-300 rounded-md">
      <CartHeader />
      <CartItemList />
      <CartSummary />
    </div>
  );
}

export default TransactionCart;
