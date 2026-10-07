import { useEffect, useState } from "react";
import { listSpareparts } from "../../../spareparts/api";
import type { Sparepart } from "../../../spareparts/types/sparepart";
import { adjustStock } from "../../api/stock";
import { useCartStore } from "../../stores/cart-store";
import CreateItemDialog from "../dialogs/create-item-dialog";
import SparepartForm from "../forms/sparepart-form";
import SparepartCatalogItem from "./sparepart-catalog-item";

function SparepartCatalogList() {
  const cartStore = useCartStore();
  const [spareparts, setSpareparts] = useState<Sparepart[]>([]);

  const inCartSpareparts = spareparts.filter((s) => cartStore.isInCart(s.id));
  const sparepartsCatalog = spareparts.filter((s) => !cartStore.isInCart(s.id));

  function addNewSparepart(item: Sparepart) {
    setSpareparts((prev) => [...prev, item]);
  }

  async function updateStock(id: string, newStock: number) {
    if (newStock <= 0) return;

    try {
      const res = await adjustStock({
        sparepart_id: id,
        quantity: newStock,
        stock_direction: "IN",
        notes: "Quick update stock from cashier",
      });

      const updatedStock = res.data.sparepart.current_stock;

      setSpareparts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, stock: updatedStock } : item,
        ),
      );

      if (cartStore.isInCart(id)) {
        cartStore.updateAvailableStock(id, updatedStock);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function fetchCatalog() {
      const res = await listSpareparts();
      setSpareparts(res.data);
    }

    fetchCatalog();

    window.addEventListener("transaction-success", fetchCatalog);

    return () =>
      window.removeEventListener("transaction-success", fetchCatalog);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Spareparts</h6>
          <CreateItemDialog label="Add New Spareparts">
            {(close) => (
              <SparepartForm onClose={close} onSuccess={addNewSparepart} />
            )}
          </CreateItemDialog>
        </div>
        <div className="min-h-0 h-full overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {inCartSpareparts.map((s) => (
              <SparepartCatalogItem
                key={s.id}
                name={s.name}
                price={s.selling_price}
                availableStock={s.stock}
                cartQty={cartStore.getItemQty(s.id)}
                addToCart={() =>
                  cartStore.addItem({
                    id: s.id,
                    name: s.name,
                    price: s.selling_price,
                    availableStock: s.stock,
                    qty: 1,
                    type: "sparepart",
                  })
                }
                updateStock={(newStock) => updateStock(s.id, newStock)}
                increaseQty={() => cartStore.incrementQty(s.id)}
                decreaseQty={() => cartStore.decrementQty(s.id)}
              />
            ))}

            {inCartSpareparts.length > 0 && sparepartsCatalog.length > 0 && (
              <div className="col-span-full h-px bg-slate-300" />
            )}

            {sparepartsCatalog.map((s) => (
              <SparepartCatalogItem
                key={s.id}
                name={s.name}
                price={s.selling_price}
                availableStock={s.stock}
                cartQty={cartStore.getItemQty(s.id)}
                addToCart={() =>
                  cartStore.addItem({
                    id: s.id,
                    name: s.name,
                    price: s.selling_price,
                    availableStock: s.stock,
                    qty: 1,
                    type: "sparepart",
                  })
                }
                updateStock={(newStock) => updateStock(s.id, newStock)}
                increaseQty={() => cartStore.incrementQty(s.id)}
                decreaseQty={() => cartStore.decrementQty(s.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SparepartCatalogList;
