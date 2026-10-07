import ServiceCatalogList from "./service-catalog-list";
import SparepartCatalogList from "./sparepart-catalog-list";

function CatalogList() {
  return (
    <div className="flex flex-col gap-6 py-3 h-full w-full">
      <div className="flex gap-3">
        <button className="grid place-content-center size-9 bg-white hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer">
          <span className="icon-[tabler--menu-2]" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 h-9 w-52 text-sm bg-white border border-slate-300 outline-0 rounded"
        />
      </div>

      <ServiceCatalogList />
      <SparepartCatalogList />
    </div>
  );
}

export default CatalogList;
