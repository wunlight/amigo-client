import { useEffect, useState } from "react";
import MenuDrawer from "../../../components/menu-drawer";
import { listSpareparts } from "../api";
import DeleteDialog from "../components/delete-dialog";
import FormDialog from "../components/form-dialog";
import type { Sparepart } from "../types/sparepart";

function SparepartManager() {
  const [spareparts, setSpareparts] = useState<Sparepart[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    async function fetchSpareparts() {
      const res = await listSpareparts();
      setSpareparts(res.data);
    }

    fetchSpareparts();

    window.addEventListener("refresh-spareparts", fetchSpareparts);

    return () =>
      window.removeEventListener("refresh-spareparts", fetchSpareparts);
  });

  return (
    <div className="flex flex-col gap-4 p-3 h-dvh bg-slate-200">
      <div className="flex items-center gap-3">
        <MenuDrawer />
        <h6 className="font-medium text-xl">Sparepart Manager</h6>
      </div>

      <div className="flex flex-col gap-4 p-3 min-h-0 max-h-full bg-white rounded overflow-auto">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="px-3 h-9 w-52 text-sm bg-white border border-slate-300 outline-0 rounded"
          />
          <div className="mr-auto"></div>
          <FormDialog
            trigger={(open) => (
              <button
                className="flex items-center gap-2 px-3 h-9 font-medium text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded active:scale-95 transition-transform cursor-pointer"
                onClick={() => open()}
              >
                <span className="icon-[tabler--plus]" />
                <span>Add New Sparepart</span>
              </button>
            )}
            dialogTitle="Add New Sparepart"
          ></FormDialog>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="py-1.5 w-10 font-medium text-center bg-slate-100 rounded-l">
                #
              </th>
              <th className="px-3 py-1.5 font-medium text-left bg-slate-100">
                Name
              </th>
              <th className="px-3 py-1.5 font-medium text-left bg-slate-100">
                Price
              </th>
              <th className="px-3 py-1.5 font-medium text-left bg-slate-100">
                Stock
              </th>
              <th className="bg-slate-100 rounded-r"></th>
            </tr>
          </thead>
          <tbody>
            {spareparts.map((s, idx) => (
              <tr className="not-last:border-b border-slate-300">
                <td className="px-3 h-14 font-normal text-center">{idx + 1}</td>
                <td className="px-3 h-14 font-normal text-left">{s.name}</td>
                <td className="px-3 h-14 font-normal text-left">
                  Rp. {s.selling_price.toLocaleString("en-US")}
                </td>
                <td className="px-3 h-14 font-normal text-left">{s.stock}</td>
                <td className="px-3 h-14">
                  <div className="flex items-center justify-end gap-3">
                    <FormDialog
                      trigger={(open) => (
                        <button
                          className="grid place-content-center size-8 text-slate-500 hover:bg-slate-100 border border-slate-300 rounded-full active:scale-95 transition-transform cursor-pointer"
                          onClick={() => open()}
                        >
                          <span className="icon-[tabler--pencil]" />
                        </button>
                      )}
                      dialogTitle="Edit Sparepart"
                      defaultValue={{
                        id: s.id,
                        name: s.name,
                        selling_price: s.selling_price,
                      }}
                    />

                    <DeleteDialog name={s.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SparepartManager;
