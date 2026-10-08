import { useState } from "react";

// TODO: MODULARIZATION - SparepartCatalogItemProps and SparepartCartItemProps share many fields
// Consider extracting common interface to: src/features/cashier/types/catalog-item.ts
// Common fields: name, price, availableStock, cartQty, increaseQty, decreaseQty, updatePrice
// SparepartCatalogItem adds: updateStock, addToCart
// SparepartCartItem adds: updatePrice, totalPrice (derived)

type SparepartCatalogItemProps = {
  name: string;
  price: number;
  availableStock: number;
  cartQty: number;

  updateStock: (newStock: number) => void;
  addToCart: () => void;
  increaseQty: () => void;
  decreaseQty: () => void;
};

function SparepartCatalogItem({
  name,
  price,
  availableStock,
  cartQty,
  updateStock,
  addToCart,
  increaseQty,
  decreaseQty,
}: SparepartCatalogItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addedQty, setAddedQty] = useState<number | string>("");

  const handleApplyStock = () => {
    updateStock(Number(addedQty));
    setAddedQty("");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyStock();
    } else if (e.key === "Escape") {
      setAddedQty("");
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between gap-3 p-3 shrink-0 bg-white border border-slate-300 rounded">
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="w-full font-medium truncate">{name}</p>
        <p className="text-sm text-slate-500">
          {price.toLocaleString("en-US")}
        </p>

        <div className="mt-auto flex items-center gap-1">
          <p
            onClick={() => setIsEditing(true)}
            title="Klik untuk tambah stok barang masuk"
            className="shrink-0 text-xs text-slate-500 cursor-pointer hover:text-slate-800 hover:underline select-none"
          >
            Stock: {availableStock}
          </p>

          {isEditing && (
            <div className="flex items-center gap-1">
              <span className="icon-[tabler--plus] text-xs text-slate-500" />
              <input
                type="text"
                min={1}
                autoFocus
                value={addedQty}
                onChange={(e) => setAddedQty(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-xs w-12 px-1 focus:outline-1 outline-slate-400 rounded"
              />
              {Number(addedQty) > 0 && (
                <button
                  type="button"
                  onClick={handleApplyStock}
                  className="shrink-0 grid place-content-center p-1 hover:bg-emerald-100 rounded-full cursor-pointer transition-colors"
                  title="Simpan penambahan stok"
                >
                  <span className="icon-[tabler--check] text-sm text-emerald-500" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {cartQty > 0 ? (
        <div className="shrink-0 flex flex-col gap-2">
          <button
            className="grid place-content-center size-6 text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
            disabled={cartQty >= availableStock}
            onClick={() => increaseQty()}
          >
            <span className="icon-[tabler--plus]" />
          </button>
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
          className="shrink-0 self-center grid place-content-center size-6 text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
          disabled={availableStock <= 0}
          onClick={() => addToCart()}
        >
          <span className="icon-[tabler--plus]" />
        </button>
      )}
    </div>
  );
}

export default SparepartCatalogItem;
