import TransactionCart from "../components/cart";
import CatalogList from "../components/catalog";

function CashierView() {
  return (
    <>
      <div className="flex h-screen bg-slate-200">
        <div className="px-3 h-full w-full overflow-hidden">
          <CatalogList />
        </div>

        <div className="p-3 h-full">
          <TransactionCart />
        </div>
      </div>
    </>
  );
}

export default CashierView;
