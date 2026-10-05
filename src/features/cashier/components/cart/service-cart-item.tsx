type ServiceCartItemProps = {
  name: string;
  price: number;

  updatePrice: (newPrice: number) => void;
  onRemove: () => void;
};

function ServiceCartItem({
  name,
  price,
  updatePrice,
  onRemove,
}: ServiceCartItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-1">
        <p className="font-medium">{name}</p>
        <input
          type="text"
          value={price}
          onChange={(e) => updatePrice(Number(e.target.value))}
          className="w-40 text-sm text-slate-500 focus:outline-1 outline-slate-300 rounded"
        />
      </div>
      <button
        className="grid place-content-center size-6 text-red-500 hover:bg-red-100 border border-red-500 rounded active:scale-95 transition-transform cursor-pointer"
        onClick={() => onRemove()}
      >
        <span className="icon-[tabler--x]" />
      </button>
    </div>
  );
}

export default ServiceCartItem;
