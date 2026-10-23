import { useState } from "react";
import { HiPlusCircle } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../dashboard/dashboardSlice";

export default function AddCategoryForm({ onClose }) {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!categoryName) {
      setErrorMessage("Name cannot be blank");
      return;
    }
    dispatch(addNewCategory(categoryName));
    onClose?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg bg-slate-200 p-2"
    >
      <label className="font-medium text-gray-500" htmlFor="addCategory">
        Enter Category Name
      </label>
      <input
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
          if (errorMessage) setErrorMessage("");
        }}
        className="rounded-lg border-2 border-slate-400 bg-slate-100 p-2 placeholder:text-slate-300"
        type="text"
        id="addCategory"
        placeholder="e.g. Analytics chart"
      />
      {errorMessage && (
        <p className="text-sm font-medium text-amber-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-300 p-2 text-base font-semibold transition-all hover:bg-slate-400"
      >
        <span className="text-xl">
          <HiPlusCircle />
        </span>
        <span>Add</span>
      </button>
    </form>
  );
}
