import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import CloseBtn from "./CloseBtn";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-1000 h-screen w-full backdrop-blur-sm transition-all">
      <div className="mx-auto mt-20 flex w-90 flex-col gap-2 rounded-xl bg-slate-100 p-4 shadow-2xl md:mt-10 md:w-125 lg:mt-5 lg:w-150">
        <div className="flex justify-end">
          <CloseBtn onClick={close} />
        </div>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
