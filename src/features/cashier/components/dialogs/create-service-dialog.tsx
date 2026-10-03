import { useState } from "react";
import DialogLayer from "../../../../components/dialog-layer";
import ServiceForm from "../forms/service-form";

function CreateServiceDialog() {
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
        <span>Add New Service</span>
      </button>

      <DialogLayer show={showDialog}>
        <ServiceForm onClose={closeDialog} />
      </DialogLayer>
    </>
  );
}

export default CreateServiceDialog;
