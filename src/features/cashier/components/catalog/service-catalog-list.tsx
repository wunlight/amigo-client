import { useEffect, useState } from "react";
import { listServices } from "../../../../api/service";
import type { ServiceItem } from "../../../../types/service";
import CreateServiceDialog from "../dialogs/create-service-dialog";
import ServiceCatalogItem from "./service-catalog-item";

function ServiceCatalogList() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    listServices().then((res) => setServices(res.data));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Services</h6>
          <CreateServiceDialog />
        </div>
        <div className="min-w-0 w-full overflow-x-auto">
          <div className="flex gap-3">
            {services.map((s) => (
              <ServiceCatalogItem key={s.id} title={s.title} price={s.price} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCatalogList;
