import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiChevronDown, HiChevronUp, HiTrash } from "react-icons/hi2";
import { deleteCategory } from "../dashboard/dashboardSlice";

function checkUnchecked(uncheckedIds, widgetId) {
  return uncheckedIds.some((uncheckedId) => uncheckedId.widgetId === widgetId);
}

export default function CategoryItem({
  category,
  uncheckedIds,
  setUncheckedIds,
}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function handleCheckboxChange(widgetId) {
    setUncheckedIds((prevUncheckedIds) => {
      if (checkUnchecked(prevUncheckedIds, widgetId))
        return prevUncheckedIds.filter((item) => item.widgetId !== widgetId);
      return [...prevUncheckedIds, { categoryId: category.id, widgetId }];
    });
  }

  function handleDeleteCategory() {
    dispatch(deleteCategory({ categoryId: category.id }));
  }

  return (
    <>
      <div className="flex gap-2">
        <div
          onClick={() => setIsOpen((open) => !open)}
          className="flex flex-1 cursor-pointer items-center justify-between rounded-lg bg-slate-200 p-2 hover:bg-slate-300"
        >
          <span className="font-medium">{category.name}</span>
          <span className="text-xl">
            {isOpen ? <HiChevronUp /> : <HiChevronDown />}
          </span>
        </div>
        <button
          onClick={handleDeleteCategory}
          className="cursor-pointer rounded-lg bg-slate-200 px-2.5 hover:bg-slate-300"
        >
          <span className="text-xl text-slate-500">
            <HiTrash />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="-mt-3 flex flex-col gap-3 bg-slate-100 p-2">
          {!category.widgets.length ? (
            <p>No widgets to show</p>
          ) : (
            category.widgets.map((widget) => {
              const isUnchecked = checkUnchecked(uncheckedIds, widget.id);

              return (
                <div className="flex items-center gap-3" key={widget.id}>
                  <input
                    type="checkbox"
                    checked={!isUnchecked}
                    onChange={() => handleCheckboxChange(widget.id)}
                    id={widget.id}
                  />
                  <label htmlFor={widget.id}>{widget.title}</label>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
