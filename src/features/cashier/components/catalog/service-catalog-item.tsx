type ServiceCatalogItemProps = {
  title: string;
  price: number;
};

function ServiceCatalogItem({ title, price }: ServiceCatalogItemProps) {
  return (
    <div className="flex items-center justify-between p-3 shrink-0 w-48 bg-white border border-slate-300 rounded">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">
          {price.toLocaleString("en-US")}
        </p>
      </div>
      <button className="grid place-content-center size-6 text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer">
        <span className="icon-[tabler--plus]"></span>
      </button>
    </div>
  );
}

export default ServiceCatalogItem;
