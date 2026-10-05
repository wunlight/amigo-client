type SparepartCartItemProps = {
  name: string;
  price: number;
  currentStock: number;
  cartQty: number;
  totalPrice: number;

  updatePrice: (newPrice: number) => void;
  increaseQty: () => void;
  decreaseQty: () => void;
};

function SparepartCartItem({
  name,
  price,
  currentStock,
  cartQty,
  totalPrice,
  updatePrice,
  increaseQty,
  decreaseQty,
}: SparepartCartItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-1">
        <p className="font-medium">{name}</p>
        <input
          type="number"
          value={price}
          onChange={(e) => updatePrice(Number(e.target.value))}
          className="w-40 text-sm text-slate-500 focus:outline-1 outline-slate-300 rounded"
        />
      </div>
      <div className="space-y-1">
        <div className="flex gap-3">
          <button
            className="grid place-content-center size-6 text-slate-500 hover:bg-slate-100 border border-slate-300 rounded disabled:opacity-75 active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
            disabled={cartQty <= 0}
            onClick={() => decreaseQty()}
          >
            <span className="icon-[tabler--minus]" />
          </button>
          <input
            type="text"
            value={cartQty}
            className="size-6 text-center text-sm"
          />
          <button
            className="grid place-content-center size-6 text-white bg-indigo-500 hover:bg-indigo-600 rounded disabled:opacity-75 active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
            disabled={cartQty >= currentStock}
            onClick={() => increaseQty()}
          >
            <span className="icon-[tabler--plus]" />
          </button>
        </div>
        <p className="font-medium text-right">
          {totalPrice.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
}

export default SparepartCartItem;
