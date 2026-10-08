type ServiceCatalogItemProps = {
  title: string;
  price: number;
  inCart: boolean;
  onClick: () => void;
};

function ServiceCatalogItem({
  title,
  price,
  inCart,
  onClick,
}: ServiceCatalogItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 shrink-0 w-48 bg-white border border-slate-300 rounded">
      <div className="flex flex-col gap-1 w-full overflow-hidden">
        <p className="w-full font-medium truncate">{title}</p>
        <p className="text-sm text-slate-500">
          {price.toLocaleString("en-US")}
        </p>
      </div>
      {inCart ? (
        <button
          className="shrink-0 grid place-content-center size-6 text-red-500 hover:bg-red-100 border border-red-500 rounded active:scale-95 transition-transform cursor-pointer"
          onClick={() => onClick()}
        >
          <span className="icon-[tabler--x]" />
        </button>
      ) : (
        <button
          className="shrink-0 grid place-content-center size-6 text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer"
          onClick={() => onClick()}
        >
          <span className="icon-[tabler--plus]"></span>
        </button>
      )}
    </div>
  );
}

export default ServiceCatalogItem;
