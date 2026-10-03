import CreateSparepartDialog from "../dialogs/create-sparepart-dialog";
import SparepartCatalogItem from "./sparepart-catalog-item";

function SparepartCatalogList() {
  return (
    <>
      <div className="flex flex-col gap-3 h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Spareparts</h6>
          <CreateSparepartDialog />
        </div>
        <div className="min-h-0 h-full overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            <SparepartCatalogItem />
          </div>
        </div>
      </div>
    </>
  );
}

export default SparepartCatalogList;
