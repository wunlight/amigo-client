import CreateServiceDialog from "../dialogs/create-service-dialog";
import ServiceCatalogItem from "./service-catalog-item";

function ServiceCatalogList() {
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Services</h6>
          <CreateServiceDialog />
        </div>
        <div className="min-w-0 w-full overflow-x-auto">
          <div className="flex gap-3">
            <ServiceCatalogItem />
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCatalogList;
