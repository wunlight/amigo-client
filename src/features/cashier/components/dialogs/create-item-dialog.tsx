import { useState, type ReactNode } from "react";

type CreateItemDialogProps = {
  label: string;
  children: (close: () => void) => ReactNode;
};

function CreateItemDialog({ label, children }: CreateItemDialogProps) {
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
        className="flex items-center gap-2 px-3 h-9 font-medium text-sm text-indigo-500 hover:bg-indigo-100 border border-indigo-500 rounded active:scale-95 transition-transform cursor-pointer"
        onClick={() => open()}
      >
        <span className="icon-[tabler--plus]" />
        <span>{label}</span>
      </button>

      {show && (
        <div className="fixed inset-0 z-999 grid place-content-center bg-slate-950/15 backdrop-blur-xs">
          {children(close)}
        </div>
      )}
    </>
  );
}

export default CreateItemDialog;
