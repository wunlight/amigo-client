import ServiceCartItem from "./service-cart-item";
import SparepartCartItem from "./sparepart-cart-item";

function CartItemList() {
  return (
    <div className="flex flex-col p-3 h-full divide-y divide-slate-300 overflow-auto">
      <SparepartCartItem />
      <ServiceCartItem />
    </div>
  );
}

export default CartItemList;
