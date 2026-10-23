import { cloneElement, createContext, useContext, useState } from "react";
import CloseBtn from "./CloseBtn";

const DrawerContext = createContext();

export default function Drawer({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

function Open({ children }) {
  const { setIsOpen } = useContext(DrawerContext);
  const open = () => setIsOpen(true);

  return cloneElement(children, { onClick: open });
}

function Content({ children, heading }) {
  const { isOpen, setIsOpen } = useContext(DrawerContext);
  const close = () => setIsOpen(false);

  return (
    <>
      {isOpen && <div className="fixed inset-0 backdrop-blur-sm" />}

      <div
        className={`absolute top-0 right-0 flex h-screen w-100 flex-col gap-6 bg-slate-50 px-2 py-4 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:w-125`}
      >
        <div className="flex justify-between pl-4">
          <h2 className="text-xl font-semibold text-gray-700">{heading}</h2>
          <CloseBtn onClick={close} />
        </div>
        {cloneElement(children, { onCloseDrawer: close })}
      </div>
    </>
  );
}

Drawer.Open = Open;
Drawer.Content = Content;
