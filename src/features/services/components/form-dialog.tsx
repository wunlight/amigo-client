import { useState, type ReactNode } from "react";
import { addService, updateService } from "../api";

type FormDialogProps = {
  trigger: (close: () => void) => ReactNode;
  dialogTitle: string;
  defaultValue?: {
    id: string;
    title: string;
    price: number;
  };
};

function FormDialog({ trigger, dialogTitle, defaultValue }: FormDialogProps) {
  const [show, setShow] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<{
    title: string;
    price: number;
    initial_stock: number;
  }>({
    title: defaultValue ? defaultValue.title : "",
    price: defaultValue ? defaultValue.price : 0,
    initial_stock: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    setFormValue((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  }

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formValue.title || formValue.price <= 0 || formValue.initial_stock < 0)
      return;

    try {
      if (defaultValue && defaultValue.id) {
        await updateService(defaultValue.id, {
          title: formValue.title,
          price: formValue.price,
        });
      } else {
        await addService({
          title: formValue.title,
          price: formValue.price,
        });
      }

      close();

      window.dispatchEvent(new Event("refresh-services"));
    } catch (e) {
      console.error("failed to submit the service: ", e);
    }
  }

  return (
    <>
      {trigger(open)}

      {show && (
        <div className="fixed inset-0 z-999 grid place-content-center bg-slate-950/15 backdrop-blur-xs">
          <div className="flex flex-col p-4 bg-white rounded">
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
              <h6 className="font-medium text-lg">{dialogTitle}</h6>
              <button
                className="grid place-content-center size-9 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer"
                onClick={() => close()}
              >
                <span className="icon-[tabler--x]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-3 py-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-sm text-slate-500">
                    Name
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
                  <label htmlFor="price" className="text-sm text-slate-500">
                    Selling Price
                  </label>
                  <input
                    type="text"
                    placeholder="Enter service selling price"
                    value={formValue.price}
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
                  onClick={() => close()}
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
          </div>
        </div>
      )}
    </>
  );
}

export default FormDialog;
