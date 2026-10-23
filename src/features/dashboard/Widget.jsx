import { useDispatch } from "react-redux";
import CloseBtn from "../../ui/CloseBtn";
import { deleteWidgetFromCategory } from "./dashboardSlice";

export default function Widget({ widget, category }) {
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-50 flex-col gap-6 rounded-xl bg-slate-50 p-4 shadow-sm transition-all hover:bg-slate-100 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{widget.title}</h3>
        <CloseBtn
          onClick={() =>
            dispatch(
              deleteWidgetFromCategory({
                categoryId: category.id,
                widgetId: widget.id,
              }),
            )
          }
        />
      </div>
      <p>{widget.content}</p>
    </div>
  );
}
