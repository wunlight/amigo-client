type BaseCartItem = {
  name: string;
  price: number;
  updatePrice: (newPrice: number) => void;
  removeItem: () => void;
};

export type ServiceCartItemProps = BaseCartItem & {
  type: "service";
};

export type SparepartCartItemProps = BaseCartItem & {
  type: "sparepart";
  currentStock: number;
  quantity: number;
  increaseQty: () => void;
  decreaseQty: () => void;
};

export type CartItemProps = ServiceCartItemProps | SparepartCartItemProps;

function CartItem(props: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="space-y-1">
        <p className="font-medium">{props.name}</p>
        <input
          type="text"
          value={props.price}
          onChange={(e) => props.updatePrice(Number(e.target.value))}
          className="w-40 text-sm text-slate-500 focus:outline-1 outline-slate-300 rounded"
        />
      </div>
      <div className="space-y-1">
        {props.type === "service" && (
          <button
            className="grid place-content-center size-6 text-red-500 hover:bg-red-100 border border-red-500 rounded active:scale-95 transition-transform cursor-pointer"
            onClick={() => props.removeItem()}
          >
            <span className="icon-[tabler--trash]" />
          </button>
        )}

        {props.type === "sparepart" && (
          <>
            <div className="flex gap-3">
              <button
                className="grid place-content-center size-6 text-red-500 hover:bg-red-100 border border-red-500 rounded active:scale-95 transition-transform cursor-pointer"
                onClick={() => props.removeItem()}
              >
                <span className="icon-[tabler--trash]" />
              </button>
              <button
                className="grid place-content-center size-6 text-slate-500 hover:bg-slate-100 border border-slate-300 rounded disabled:opacity-75 active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
                disabled={props.quantity <= 0}
                onClick={() => props.decreaseQty()}
              >
                <span className="icon-[tabler--minus]" />
              </button>
              <div className="grid place-content-center px-1 h-6 text-center text-sm">
                {props.quantity}
              </div>
              <button
                className="grid place-content-center size-6 text-white bg-indigo-500 not-disabled:hover:bg-indigo-600 rounded disabled:opacity-75 not-disabled:active:scale-95 transition-transform cursor-pointer disabled:cursor-not-allowed"
                disabled={props.quantity >= props.currentStock}
                onClick={() => props.increaseQty()}
              >
                <span className="icon-[tabler--plus]" />
              </button>
            </div>
            <p className="font-medium text-right">
              {/*.toLocaleString("en-US")*/}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
