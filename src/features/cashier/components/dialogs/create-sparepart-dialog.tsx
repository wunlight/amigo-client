import { useState } from "react";
import DialogLayer from "../../../../components/dialog-layer";
import SparepartForm from "../forms/sparepart-form";

function CreateSparepartDialog() {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  function closeDialog() {
    setShowDialog(false);
  }

  return (
    <>
      <button
        className="flex items-center gap-2 px-3 h-9 text-sm text-indigo-500 hover:bg-indigo-100 border border-indigo-500 rounded active:scale-95 transition-transform cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <span className="icon-[tabler--plus]" />
        <span>Add New Sparepart</span>
      </button>

      <DialogLayer show={showDialog}>
        <SparepartForm onClose={closeDialog} />
      </DialogLayer>
    </>
  );
}

export default CreateSparepartDialog;
