function SparepartCartItem() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-1">
        <p className="font-medium">Item Name</p>
        <p className="text-sm text-slate-600">999,999</p>
      </div>
      <div className="space-y-1">
        <div className="flex gap-3">
          <button className="grid place-content-center size-6 text-slate-600 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer">
            <span className="icon-[tabler--minus]" />
          </button>
          <input type="text" className="size-6 text-center text-sm" />
          <button className="grid place-content-center size-6 text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer">
            <span className="icon-[tabler--plus]" />
          </button>
        </div>
        <p className="font-medium text-right">999,999</p>
      </div>
    </div>
  );
}

export default SparepartCartItem;
