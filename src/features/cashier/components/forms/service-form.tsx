type ServiceFormProps = {
  onClose?: () => void;
};

function ServiceForm({ onClose }: ServiceFormProps) {
  function handleClose() {
    onClose?.();
  }

  return (
    <form className="flex flex-col p-4 bg-white rounded-md">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
        <h6 className="font-medium text-lg">Add New Service</h6>
        <button
          type="button"
          className="grid place-content-center size-9 hover:bg-slate-100 active:scale-95 transition-transform rounded-full"
          onClick={handleClose}
        >
          <span className="icon-[tabler--x]" />
        </button>
      </div>

      <div className="flex flex-col gap-3 py-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-slate-600">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter sparepart title"
            id="title"
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="selling_price" className="text-sm text-slate-600">
            Selling Price
          </label>
          <input
            type="text"
            placeholder="Enter sparepart selling price"
            id="selling_price"
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-2 border-t border-slate-300">
        <button
          type="button"
          className="px-3 h-9 text-sm text-slate-600 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer"
          onClick={handleClose}
        >
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="px-3 h-9 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer"
        >
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

export default ServiceForm;
