import { useNavigate } from "react-router-dom";

type MenuDrawerProps = {
  show: boolean;
  hide: () => void;
};

function MenuDrawer({ show, hide }: MenuDrawerProps) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    hide();
  };

  return (
    <div className="fixed inset-0 z-999 bg-slate-950/15 backdrop-blur-xs">
      <div className="flex flex-col gap-4 p-4 h-full w-96 bg-white rounded-r transition-all duration-300 ease-out animate-slide-right">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Menu</span>
          <button
            className="grid place-content-center size-9 hover:bg-slate-100 rounded-full"
            onClick={() => hide()}
          >
            <span className="icon-[tabler--x]" />
          </button>
        </div>

        <button
          className="flex items-center gap-3 px-3 h-9 w-full hover:bg-slate-100 rounded cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          <span className="icon-[tabler--shopping-cart]" />
          <span>Cashier</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 h-9 w-full hover:bg-slate-100 rounded cursor-pointer"
          onClick={() => handleNavigate("/spareparts")}
        >
          <span className="icon-[tabler--components]" />
          <span>Spareparts</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 h-9 w-full hover:bg-slate-100 rounded cursor-pointer"
          onClick={() => handleNavigate("/services")}
        >
          <span className="icon-[tabler--tools]" />
          <span>Services</span>
        </button>
      </div>
    </div>
  );
}

export default MenuDrawer;
