function ServiceCartItem() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-1">
        <p className="font-medium">Item Name</p>
        <p className="text-sm text-slate-600">999,999</p>
      </div>
      <button className="grid place-content-center size-6 text-red-500 hover:bg-red-100 border border-red-500 rounded active:scale-95 transition-transform cursor-pointer">
        <span className="icon-[tabler--x]" />
      </button>
    </div>
  );
}

export default ServiceCartItem;
