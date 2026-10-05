type CartSummaryProps = {
  sparepartTotal: number;
  serviceTotal: number;
  grandTotal: number;
  disableCheckout: boolean;
  processTransaction: () => void;
};

function CartSummary({
  sparepartTotal,
  serviceTotal,
  grandTotal,
  disableCheckout,
  processTransaction,
}: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-slate-500">
          <p>Sparepart Total</p>
          <p>Rp. {sparepartTotal.toLocaleString("en-US")}</p>
        </div>
        <div className="flex justify-between text-slate-500">
          <p>Service Total</p>
          <p>Rp. {serviceTotal.toLocaleString("en-US")}</p>
        </div>
        <div className="flex justify-between font-medium">
          <p>Grand Total</p>
          <p>Rp. {grandTotal.toLocaleString("en-US")}</p>
        </div>
      </div>
      <button
        className="flex items-center justify-center h-9 font-medium text-sm text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
        disabled={disableCheckout}
        onClick={() => processTransaction()}
      >
        <span>Process Transaction</span>
      </button>
    </div>
  );
}

export default CartSummary;
