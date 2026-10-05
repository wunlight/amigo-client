import { useState } from "react";
import DialogLayer from "../../../../components/dialog-layer";
import type { Sparepart } from "../../../spareparts/types/sparepart";
import SparepartForm from "../forms/sparepart-form";

type CreateSparepartDialogProps = {
  onSuccess: (item: Sparepart) => void;
};

function CreateSparepartDialog({ onSuccess }: CreateSparepartDialogProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  function closeDialog() {
    setShowDialog(false);
  }

  return (
    <>
      <button
        className="flex items-center gap-2 px-3 h-9 font-medium text-sm text-indigo-500 hover:bg-indigo-100 border border-indigo-500 rounded active:scale-95 transition-transform cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <span className="icon-[tabler--plus]" />
        <span>Add New Sparepart</span>
      </button>

      <DialogLayer show={showDialog}>
        <SparepartForm onClose={closeDialog} onSuccess={onSuccess} />
      </DialogLayer>
    </>
  );
}

export default CreateSparepartDialog;
