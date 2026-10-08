import { Route, Routes } from "react-router-dom";
import CashierView from "./features/cashier/views/cashier-view";
import ServiceManager from "./features/services/views/service-manager";
import SparepartManager from "./features/spareparts/views/sparepart-manager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CashierView />} />
      <Route path="/spareparts" element={<SparepartManager />} />
      <Route path="/services" element={<ServiceManager />} />
    </Routes>
  );
}

export default App;
