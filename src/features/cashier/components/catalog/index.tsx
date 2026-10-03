import CatalogHeader from "./catalog-header";
import ServiceCatalogList from "./service-catalog-list";
import SparepartCatalogList from "./sparepart-catalog-list";

function CatalogList() {
  return (
    <div className="flex flex-col gap-6 py-3 h-full w-full">
      <CatalogHeader />
      <ServiceCatalogList />
      <SparepartCatalogList />
    </div>
  );
}

export default CatalogList;
