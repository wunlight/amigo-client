import { useState } from "react";
import { createSale } from "../../api/checkout";
import { useCartStore } from "../../stores/cart-store";
import type { CheckoutResponse } from "../../types/checkout";
import InvoiceDialog from "../dialogs/invoice-dialog";
import CartHeader from "./cart-header";
import CartItemList from "./cart-item-list";
import CartSummary from "./cart-summary";

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
      <CartHeader
        isCartEmpty={cartStore.items.length <= 0}
        clearCart={() => cartStore.clearCart()}
      />
      <CartItemList />
      <CartSummary
        sparepartTotal={cartStore.getSparepartsTotalAmount()}
        serviceTotal={cartStore.getServicesTotalAmount()}
        grandTotal={cartStore.getTotalAmount()}
        disableCheckout={cartStore.items.length <= 0}
        processTransaction={processTransaction}
      />

      <InvoiceDialog
        show={showInvoiceDialog}
        data={lastTransactionData}
        onClose={() => setShowInvoiceDialog(false)}
      />
    </div>
  );
}

export default TransactionCart;
