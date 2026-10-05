import { useState } from "react";
import DialogLayer from "../../../../components/dialog-layer";
import type { Service } from "../../../services/types/service";
import ServiceForm from "../forms/service-form";

type CreateServiceDialogProps = {
  onSuccess: (item: Service) => void;
};

function CreateServiceDialog({ onSuccess }: CreateServiceDialogProps) {
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
        <span>Add New Service</span>
      </button>

      <DialogLayer show={showDialog}>
        <ServiceForm onClose={closeDialog} onSuccess={onSuccess} />
      </DialogLayer>
    </>
  );
}

export default CreateServiceDialog;
