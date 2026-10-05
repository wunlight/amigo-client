import React, { useState } from "react";
import { initSparepart } from "../../../spareparts/api";
import type { Sparepart } from "../../../spareparts/types/sparepart";

type SparepartFormProps = {
  onClose: () => void;
  onSuccess: (item: Sparepart) => void;
};

function SparepartForm({ onClose, onSuccess }: SparepartFormProps) {
  const [formValue, setFormValue] = useState<{
    name: string;
    selling_price: number;
    initial_stock: number;
  }>({
    name: "",
    selling_price: 0,
    initial_stock: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    setFormValue((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !formValue.name ||
      formValue.selling_price <= 0 ||
      formValue.initial_stock < 0
    )
      return;

    try {
      const res = await initSparepart({
        name: formValue.name,
        selling_price: formValue.selling_price,
        initial_stock: formValue.initial_stock,
      });

      onClose();
      onSuccess(res.data);
    } catch (e) {
      console.error("failed to init new sparepart: ", e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-white rounded-md"
    >
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
        <h6 className="font-medium text-lg">Add New Sparepart</h6>
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
          <label htmlFor="name" className="text-sm text-slate-500">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter sparepart name"
            value={formValue.name}
            onChange={(e) => handleChange(e, "name")}
            required
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="selling_price" className="text-sm text-slate-500">
            Selling Price
          </label>
          <input
            type="text"
            placeholder="Enter sparepart selling price"
            value={formValue.selling_price}
            onChange={(e) => handleChange(e, "selling_price")}
            min={0}
            required
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
            id="selling_price"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="initial_stock" className="text-sm text-slate-500">
            Initial Stock
          </label>
          <input
            type="text"
            placeholder="Enter sparepart initial stock"
            value={formValue.initial_stock}
            onChange={(e) => handleChange(e, "initial_stock")}
            min={0}
            required
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded"
            id="initial_stock"
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

export default SparepartForm;
