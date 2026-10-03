import type { ReactNode } from "react";

type DialogLayerProps = {
  show?: boolean;
  children?: ReactNode;
};

function DialogLayer({ show, children }: DialogLayerProps) {
  if (!show) return;

  return (
    <div className="fixed inset-0 z-999 grid place-content-center bg-slate-950/15 backdrop-blur-xs">
      {children}
    </div>
  );
}

export default DialogLayer;
