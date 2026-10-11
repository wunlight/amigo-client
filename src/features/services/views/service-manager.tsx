import { useEffect, useState } from "react";
import MenuDrawer from "../../../components/menu-drawer";
import { listServices } from "../api";
import DeleteDialog from "../components/delete-dialog";
import FormDialog from "../components/form-dialog";
import type { Service } from "../types/service";

function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    async function fetchServices() {
      const res = await listServices();
      setServices(res.data);
    }

    fetchServices();

    window.addEventListener("refresh-services", fetchServices);

    return () => window.removeEventListener("refresh-services", fetchServices);
  });

  return (
    <div className="flex flex-col gap-4 p-3 h-dvh bg-slate-200">
      <div className="flex items-center gap-3">
        <MenuDrawer />
        <h6 className="font-medium text-xl">Service Manager</h6>
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
                <span>Add New Service</span>
              </button>
            )}
            dialogTitle="Add New Service"
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
              <th className="bg-slate-100 rounded-r"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, idx) => (
              <tr className="not-last:border-b border-slate-300">
                <td className="px-3 h-14 font-normal text-center">{idx + 1}</td>
                <td className="px-3 h-14 font-normal text-left">{s.title}</td>
                <td className="px-3 h-14 font-normal text-left">
                  Rp. {s.price.toLocaleString("en-US")}
                </td>
                <td className="px-3 h-14">
                  <div className="flex items-center justify-end gap-3">
                    <FormDialog
                      trigger={(open) => (
                        <button
                          className="grid place-content-center size-8 text-slate-500 hover:bg-slate-100 border border-slate-300 rounded-full cursor-pointer"
                          onClick={() => open()}
                        >
                          <span className="icon-[tabler--pencil]" />
                        </button>
                      )}
                      dialogTitle="Edit Service"
                      defaultValue={{
                        id: s.id,
                        title: s.title,
                        price: s.price,
                      }}
                    ></FormDialog>

                    <DeleteDialog title={s.title} />
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

export default ServiceManager;
