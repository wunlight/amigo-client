import { useState } from "react";
import DialogLayer from "../../../../components/dialog-layer";
import type { CheckoutResponse } from "../../types/checkout";

type InvoiceDialogProps = {
  show: boolean;
  data: CheckoutResponse | null;
  onClose: () => void;
};

function InvoiceDialog({ show, data, onClose }: InvoiceDialogProps) {
  const [phone, setPhone] = useState("");

  if (!show || !data) return null;

  function handleSendWa() {
    if (!phone) return;

    const formattedDate = new Date(data!.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const itemsText = data!.items
      .map(
        (item) =>
          `• ${item.name} (${item.qty}x) : Rp ${item.subtotal.toLocaleString("id-ID")}`,
      )
      .join("\n");

    const message = `*BENGKEL AMIGO MOTOR*
Tanggal: ${formattedDate}
----------------------------------
*DETAIL PEMBELIAN:*
${itemsText}
----------------------------------
*TOTAL:* Rp ${data!.total_amount.toLocaleString("id-ID")}

Terima kasih telah melakukan transaksi!`;

    let formattedPhone = phone.replace(/[^0-9]/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.slice(1);
    }

    const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    handleClose();
  }

  function handleClose() {
    setPhone("");
    onClose();
  }

  return (
    <DialogLayer show={true}>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-md">
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-300">
          <h6 className="font-medium text-lg">Generate Invoice</h6>
          <button
            type="button"
            className="grid place-content-center size-9 hover:bg-slate-100 active:scale-95 transition-transform rounded-full"
            onClick={() => handleClose()}
          >
            <span className="icon-[tabler--x]" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Customer Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="px-3 h-9 text-sm border border-slate-300 outline-0 rounded focus:border-indigo-500"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-300">
          <button
            className="px-3 h-9 text-sm text-slate-500 hover:bg-slate-100 border border-slate-300 rounded active:scale-95 transition-all cursor-pointer"
            onClick={() => handleClose()}
          >
            Close
          </button>
          <button
            className="px-3 h-9 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-all cursor-pointer"
            onClick={() => handleSendWa()}
          >
            Generate
          </button>
        </div>
      </div>
    </DialogLayer>
  );
}

export default InvoiceDialog;
