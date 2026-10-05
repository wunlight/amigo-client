type SparepartCatalogItemProps = {
  name: string;
  price: number;
  current_stock: number;
};

function SparepartCatalogItem({
  name,
  price,
  current_stock,
}: SparepartCatalogItemProps) {
  return (
    <div className="flex justify-between p-3 shrink-0 bg-white border border-slate-300 rounded">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-600">
          {price.toLocaleString("en-US")}
        </p>
        <p className="mt-auto text-xs text-slate-600">Stock: {current_stock}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button className="grid place-content-center size-6 text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer">
          <span className="icon-[tabler--plus]" />
        </button>
        <input type="text" className="size-6 text-center text-sm" />
        <button className="grid place-content-center size-6 text-slate-600 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer">
          <span className="icon-[tabler--minus]" />
        </button>
      </div>
    </div>
  );
}

export default SparepartCatalogItem;
