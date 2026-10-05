import { useEffect, useState } from "react";
import { listSpareparts } from "../../../spareparts/api";
import type { Sparepart } from "../../../spareparts/types/sparepart";
import CreateSparepartDialog from "../dialogs/create-sparepart-dialog";
import SparepartCatalogItem from "./sparepart-catalog-item";

function SparepartCatalogList() {
  const [spareparts, setSpareparts] = useState<Sparepart[]>([]);

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
            {spareparts.map((s) => (
              <SparepartCatalogItem
                key={s.id}
                name={s.name}
                price={s.selling_price}
                current_stock={s.stock}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SparepartCatalogList;
