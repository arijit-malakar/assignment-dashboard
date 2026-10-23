import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiCheckCircle, HiPlus, HiXCircle } from "react-icons/hi2";
import {
  deleteWidgetFromCategory,
  getCategories,
} from "../dashboard/dashboardSlice";
import CategoryItem from "./CategoryItem";
import Button from "../../ui/Button";
import AddCategoryForm from "./AddCategoryForm";

export default function CategoriesMenu({ onCloseDrawer }) {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [uncheckedIds, setUncheckedIds] = useState([]);

  function handleDeleteWidgets() {
    uncheckedIds.forEach((uncheckedId) =>
      dispatch(
        deleteWidgetFromCategory({
          categoryId: uncheckedId.categoryId,
          widgetId: uncheckedId.widgetId,
        }),
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4 px-2">
      {!categories.length ? (
        <p>No categories to show. Add a category.</p>
      ) : (
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            uncheckedIds={uncheckedIds}
            setUncheckedIds={setUncheckedIds}
          />
        ))
      )}

      {openAddCategory && <AddCategoryForm onClose={setOpenAddCategory} />}

      <div className="flex items-center justify-between">
        {categories.length > 0 && (
          <div className="flex gap-4">
            <Button onClick={onCloseDrawer}>
              <Button.Icon>
                <HiXCircle />
              </Button.Icon>
              <Button.Text>Cancel</Button.Text>
            </Button>
            <Button onClick={handleDeleteWidgets}>
              <Button.Icon>
                <HiCheckCircle />
              </Button.Icon>
              <Button.Text>Confirm</Button.Text>
            </Button>
          </div>
        )}

        <Button onClick={() => setOpenAddCategory((open) => !open)}>
          <Button.Icon>
            <HiPlus />
          </Button.Icon>
          <Button.Text>Add Category</Button.Text>
        </Button>
      </div>
    </div>
  );
}
