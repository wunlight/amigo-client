import { useState } from "react";
import { useDebounce } from "../../../../lib/use-debounce";
import ServiceCatalogList from "./service-catalog-list";
import SparepartCatalogList from "./sparepart-catalog-list";

function CatalogList() {
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 500);

  return (
    <div className="flex flex-col gap-6 py-3 h-full w-full">
      <div className="flex gap-3">
        <button className="grid place-content-center size-9 bg-white hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer">
          <span className="icon-[tabler--menu-2]" />
        </button>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="px-3 h-9 w-52 text-sm bg-white border border-slate-300 outline-0 rounded"
        />
      </div>

      <ServiceCatalogList searchQuery={debouncedSearch} />
      <SparepartCatalogList searchQuery={debouncedSearch} />
    </div>
  );
}

export default CatalogList;
