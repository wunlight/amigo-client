type CartHeaderProps = {
  isCartEmpty: boolean;
  clearCart: () => void;
};

function CartHeader({ isCartEmpty, clearCart }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <h6 className="font-medium text-lg">Transaction Cart</h6>
      <button
        className="flex items-center px-3 h-9 font-medium text-sm text-slate-500 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
        disabled={isCartEmpty}
        onClick={() => clearCart()}
      >
        Clear
      </button>
    </div>
  );
}

export default CartHeader;
