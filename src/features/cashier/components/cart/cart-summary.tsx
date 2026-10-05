type CartSummaryProps = {
  sparepartTotal: number;
  serviceTotal: number;
  grandTotal: number;
};

function CartSummary({
  sparepartTotal,
  serviceTotal,
  grandTotal,
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
      <button className="flex items-center justify-center h-9 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer">
        <span>Process Transaction</span>
      </button>
    </div>
  );
}

export default CartSummary;
