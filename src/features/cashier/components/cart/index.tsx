import { useState } from "react";
import { createSale } from "../../api/checkout";
import { useCartStore } from "../../stores/cart-store";
import type { CheckoutResponse } from "../../types/checkout";
import InvoiceDialog from "../dialogs/invoice-dialog";
import CartItemList from "./cart-item-list";

function TransactionCart() {
  const cartStore = useCartStore();

  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [lastTransactionData, setLastTransactionData] =
    useState<CheckoutResponse | null>(null);

  async function processTransaction() {
    const payload = cartStore.getCheckoutPayload();

    try {
      const response = await createSale(payload);
      setLastTransactionData(response.data);

      cartStore.clearCart();
      window.dispatchEvent(new Event("transaction-success"));

      setShowInvoiceDialog(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col px-3 h-full w-100 bg-white divide-y divide-slate-300 rounded-md">
      <div className="flex items-center justify-between py-3">
        <h6 className="font-medium text-lg">Transaction Cart</h6>
        <button
          className="flex items-center px-3 h-9 font-medium text-sm text-slate-500 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
          disabled={cartStore.items.length <= 0}
          onClick={() => cartStore.clearCart()}
        >
          Clear
        </button>
      </div>

      <CartItemList />

      <div className="flex flex-col gap-3 py-3">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-slate-500">
            <p>Sparepart Total</p>
            <p>
              Rp. {cartStore.getSparepartsTotalAmount().toLocaleString("en-US")}
            </p>
          </div>
          <div className="flex justify-between text-slate-500">
            <p>Service Total</p>
            <p>
              Rp. {cartStore.getServicesTotalAmount().toLocaleString("en-US")}
            </p>
          </div>
          <div className="flex justify-between font-medium">
            <p>Grand Total</p>
            <p>Rp. {cartStore.getTotalAmount().toLocaleString("en-US")}</p>
          </div>
        </div>
        <button
          className="flex items-center justify-center h-9 font-medium text-sm text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
          disabled={cartStore.items.length <= 0}
          onClick={() => processTransaction()}
        >
          <span>Process Transaction</span>
        </button>
      </div>

      <InvoiceDialog
        show={showInvoiceDialog}
        data={lastTransactionData}
        onClose={() => setShowInvoiceDialog(false)}
      />
    </div>
  );
}

export default TransactionCart;
