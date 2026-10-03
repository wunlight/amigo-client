function CartHeader() {
  return (
    <div className="flex items-center justify-between py-3">
      <h6 className="font-medium text-lg">Transaction Cart</h6>
      <button className="flex items-center px-3 h-9 text-sm text-slate-600 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer">
        Clear
      </button>
    </div>
  );
}

export default CartHeader;
