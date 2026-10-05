import { useState } from "react";
import { addService } from "../../../services/api";
import type { Service } from "../../../services/types/service";

type ServiceFormProps = {
  onClose: () => void;
  onSuccess: (item: Service) => void;
};

function ServiceForm({ onClose, onSuccess }: ServiceFormProps) {
  const [formValue, setFormValue] = useState<{
    title: string;
    price: number;
  }>({
    title: "",
    price: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    setFormValue((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formValue.title || formValue.price <= 0) return;

    try {
      const res = await addService({
        title: formValue.title,
        price: formValue.price,
      });

      onClose();
      onSuccess(res.data);
    } catch (e) {
      console.error("failed to add new service: ", e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-white rounded-md"
    >
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
        <h6 className="font-medium text-lg">Add New Service</h6>
        <button
          type="button"
          className="grid place-content-center size-9 hover:bg-slate-100 active:scale-95 transition-transform rounded-full"
          onClick={() => onClose()}
        >
          <span className="icon-[tabler--x]" />
        </button>
      </div>

      <div className="flex flex-col gap-3 py-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-slate-500">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter service title"
            value={formValue.title}
            onChange={(e) => handleChange(e, "title")}
            required
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="selling_price" className="text-sm text-slate-500">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter service price"
            value={formValue?.price}
            onChange={(e) => handleChange(e, "price")}
            min={0}
            required
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
            id="price"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-2 border-t border-slate-300">
        <button
          type="button"
          className="px-3 h-9 text-sm text-slate-500 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-transform cursor-pointer"
          onClick={() => onClose()}
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
