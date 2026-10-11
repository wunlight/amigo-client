import { useState } from "react";

type DeleteDialogProps = {
  title: string;
};

function DeleteDialog({ title }: DeleteDialogProps) {
  const [show, setShow] = useState<boolean>(false);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  return (
    <>
      <button
        className="grid place-content-center size-8 text-red-500 hover:bg-red-100 border border-red-300 rounded-full active:scale-95 transition-transform cursor-pointer"
        onClick={() => open()}
      >
        <span className="icon-[tabler--trash]" />
      </button>

      {show && (
        <div className="fixed inset-0 z-999 grid place-content-center bg-slate-950/15 backdrop-blur-xs">
          <div className="flex flex-col p-4 bg-white rounded">
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
              <h6 className="font-medium text-lg">Delete Service?</h6>
              <button
                className="grid place-content-center size-9 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer"
                onClick={() => close()}
              >
                <span className="icon-[tabler--x]" />
              </button>
            </div>

            <p className="py-4 w-96">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-500">{title}</span>? This
              action cannot be undone.
            </p>

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
                className="px-3 h-9 text-sm text-white bg-red-500 hover:bg-red-600 rounded active:scale-95 transition-transform cursor-pointer"
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteDialog;
