type SparepartCatalogItemProps = {
  name: string;
  price: number;
  currentStock: number;
  cartQty: number;

  addToCart: () => void;
  // updateQty: (newQty: number) => void;
  increaseQty: () => void;
  decreaseQty: () => void;
};

function SparepartCatalogItem({
  name,
  price,
  currentStock,
  cartQty,
  addToCart,
  // updateQty,
  increaseQty,
  decreaseQty,
}: SparepartCatalogItemProps) {
  return (
    <div className="flex justify-between p-3 shrink-0 bg-white border border-slate-300 rounded">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">
          {price.toLocaleString("en-US")}
        </p>
        <p className="mt-auto text-xs text-slate-500">Stock: {currentStock}</p>
      </div>
      {cartQty > 0 ? (
        <div className="flex flex-col gap-2">
          <button
            className="grid place-content-center size-6 text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
            disabled={cartQty >= currentStock}
            onClick={() => increaseQty()}
          >
            <span className="icon-[tabler--plus]" />
          </button>
          {/* <input
            type="text"
            value={cartQty}
            onChange={(e) => updateQty(Number(e.target.value))}
            className="size-6 text-center text-sm"
          /> */}
          <div className="size-6 text-center text-sm">{cartQty}</div>
          <button
            className="grid place-content-center size-6 text-slate-500 hover:bg-slate-100 border border-slate-300 rounded disabled:opacity-75 active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
            disabled={cartQty <= 0}
            onClick={() => decreaseQty()}
          >
            <span className="icon-[tabler--minus]" />
          </button>
        </div>
      ) : (
        <button
          className="self-center grid place-content-center size-6 text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
          disabled={currentStock <= 0}
          onClick={() => addToCart()}
        >
          <span className="icon-[tabler--plus]" />
        </button>
      )}
    </div>
  );
}

export default SparepartCatalogItem;
