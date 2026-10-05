import { useEffect, useState } from "react";
import { listSpareparts } from "../../../spareparts/api";
import type { Sparepart } from "../../../spareparts/types/sparepart";
import { useCartStore } from "../../stores/cart-store";
import CreateSparepartDialog from "../dialogs/create-sparepart-dialog";
import SparepartCatalogItem from "./sparepart-catalog-item";

function SparepartCatalogList() {
  const cartStore = useCartStore();
  const [spareparts, setSpareparts] = useState<Sparepart[]>([]);

  const selectedSpareparts = spareparts.filter((s) => cartStore.isInCart(s.id));
  const unselectedSpareparts = spareparts.filter(
    (s) => !cartStore.isInCart(s.id),
  );

  function addNewSparepart(item: Sparepart) {
    setSpareparts((prev) => [...prev, item]);
  }

  useEffect(() => {
    listSpareparts().then((res) => setSpareparts(res.data));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Spareparts</h6>
          <CreateSparepartDialog onSuccess={addNewSparepart} />
        </div>
        <div className="min-h-0 h-full overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {selectedSpareparts.map((s) => (
              <SparepartCatalogItem
                key={s.id}
                name={s.name}
                price={s.selling_price}
                currentStock={s.stock}
                cartQty={cartStore.getItemQty(s.id)}
                addToCart={() =>
                  cartStore.addItem({
                    id: s.id,
                    name: s.name,
                    price: s.selling_price,
                    stock: s.stock,
                    qty: 1,
                    type: "sparepart",
                  })
                }
                // updateQty={(newQty) => cartStore.updateQty(s.id, newQty)}
                increaseQty={() => cartStore.incrementQty(s.id)}
                decreaseQty={() => cartStore.decrementQty(s.id)}
              />
            ))}

            {selectedSpareparts.length > 0 &&
              unselectedSpareparts.length > 0 && (
                <div className="col-span-full h-px bg-slate-300" />
              )}

            {unselectedSpareparts.map((s) => (
              <SparepartCatalogItem
                key={s.id}
                name={s.name}
                price={s.selling_price}
                currentStock={s.stock}
                cartQty={cartStore.getItemQty(s.id)}
                addToCart={() =>
                  cartStore.addItem({
                    id: s.id,
                    name: s.name,
                    price: s.selling_price,
                    stock: s.stock,
                    qty: 1,
                    type: "sparepart",
                  })
                }
                // updateQty={(newQty) => cartStore.updateQty(s.id, newQty)}
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
