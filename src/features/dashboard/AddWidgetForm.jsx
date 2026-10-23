import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi2";
import { addWidgetToCategory, getCategories } from "./dashboardSlice";
import Button from "../../ui/Button";

export default function AddWidgetForm({ onCloseModal, currentCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetContent, setWidgetContent] = useState("");
  const [errors, setErrors] = useState({ widgetTitle: "", widgetContent: "" });

  function handleSubmit(e) {
    e.preventDefault();

    const updatedErrors = {
      widgetTitle: widgetTitle ? "" : "Title cannot be blank",
      widgetContent: widgetContent ? "" : "Content cannot be blank",
    };
    setErrors(updatedErrors);

    if (!widgetTitle || !widgetContent) return;

    if (currentCategory)
      dispatch(
        addWidgetToCategory({
          categoryId: currentCategory.id,
          widgetTitle,
          widgetContent,
        }),
      );
    else
      dispatch(addWidgetToCategory({ categoryId, widgetTitle, widgetContent }));

    onCloseModal?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-2">
      <h3 className="text-xl font-semibold text-gray-500">
        {currentCategory ? currentCategory.name : "Add Widget"}
      </h3>

      {!currentCategory && (
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800" htmlFor="category">
            Select a category
          </label>
          <select
            className="rounded-lg border-2 border-slate-300 p-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            id="category"
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-800" htmlFor="title">
          Widget title
        </label>
        <input
          value={widgetTitle}
          onChange={(e) => {
            setWidgetTitle(e.target.value);
            if (errors.widgetTitle)
              setErrors((prevErrors) => ({ ...prevErrors, widgetTitle: "" }));
          }}
          className="rounded-lg border-2 border-slate-300 p-2 placeholder:text-slate-300"
          type="text"
          id="title"
          placeholder="e.g. Sales data"
        />
        {errors.widgetTitle && (
          <p className="text-sm font-medium text-amber-700">
            {errors.widgetTitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-800" htmlFor="content">
          Widget content
        </label>
        <input
          value={widgetContent}
          onChange={(e) => {
            setWidgetContent(e.target.value);
            if (errors.widgetContent)
              setErrors((prevErrors) => ({ ...prevErrors, widgetContent: "" }));
          }}
          className="rounded-lg border-2 border-slate-300 p-2 placeholder:text-slate-300"
          type="text"
          id="content"
          placeholder="e.g. Stats of sales collected over..."
        />
        {errors.widgetContent && (
          <p className="text-sm font-medium text-amber-700">
            {errors.widgetContent}
          </p>
        )}
      </div>

      <Button>
        <Button.Icon>
          <HiOutlinePlus />
        </Button.Icon>
        <Button.Text>Add Widget</Button.Text>
      </Button>
    </form>
  );
}
