import { useEffect, useState } from "react";
import { listServices } from "../../../services/api";
import type { Service } from "../../../services/types/service";
import useCatalogFilter from "../../hooks/use-catalog-filter";
import { useCartStore } from "../../stores/cart-store";
import CreateItemDialog from "../dialogs/create-item-dialog";
import ServiceForm from "../forms/service-form";
import ServiceCatalogItem from "./service-catalog-item";

type ServiceCatalogList = {
  searchQuery: string;
};

function ServiceCatalogList({ searchQuery }: ServiceCatalogList) {
  const cartStore = useCartStore();
  const [services, setServices] = useState<Service[]>([]);

  const filteredServices = useCatalogFilter(
    services,
    searchQuery,
    (service) => service.title,
  );

  const inCartServices = filteredServices.filter((s) =>
    cartStore.isInCart(s.id),
  );
  const servicesCatalog = filteredServices.filter(
    (s) => !cartStore.isInCart(s.id),
  );

  function addNewService(item: Service) {
    setServices((prev) => [...prev, item]);
  }

  function toggleCartItem(service: Service) {
    if (cartStore.isInCart(service.id)) {
      cartStore.removeItem(service.id);
      return;
    }

    cartStore.addItem({
      id: service.id,
      name: service.title,
      price: service.price,
      qty: 1,
      type: "service",
      availableStock: 0,
    });
  }

  useEffect(() => {
    listServices().then((res) => setServices(res.data));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h6 className="font-medium text-lg">Services</h6>
          <CreateItemDialog label="Add New Services">
            {(close) => (
              <ServiceForm onClose={close} onSuccess={addNewService} />
            )}
          </CreateItemDialog>
        </div>
        <div className="min-w-0 w-full overflow-x-auto">
          <div className="flex gap-3">
            {inCartServices.map((s) => (
              <ServiceCatalogItem
                key={s.id}
                title={s.title}
                price={s.price}
                inCart={true}
                onClick={() => toggleCartItem(s)}
              />
            ))}

            {inCartServices.length > 0 && servicesCatalog.length > 0 && (
              <div className="w-px bg-slate-300 shrink-0" />
            )}

            {servicesCatalog.map((s) => (
              <ServiceCatalogItem
                key={s.id}
                title={s.title}
                price={s.price}
                inCart={false}
                onClick={() => toggleCartItem(s)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCatalogList;
