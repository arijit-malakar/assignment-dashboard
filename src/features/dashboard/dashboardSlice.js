import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    updateDashboardState(state, action) {
      state.categories = action.payload;
    },
    addNewCategory(state, action) {
      state.categories.push({
        id: nanoid(),
        name: action.payload,
        widgets: [],
      });
    },
    deleteCategory(state, action) {
      const { categoryId } = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== categoryId,
      );
    },
    addWidgetToCategory(state, action) {
      const { categoryId, widgetTitle, widgetContent } = action.payload;
      const categoryToUpdate = state.categories.find(
        (category) => category.id === categoryId,
      );
      categoryToUpdate.widgets.push({
        id: nanoid(),
        title: widgetTitle,
        content: widgetContent,
      });
    },
    deleteWidgetFromCategory(state, action) {
      const { categoryId, widgetId } = action.payload;
      const categoryToUpdate = state.categories.find(
        (category) => category.id === categoryId,
      );

      if (categoryToUpdate)
        categoryToUpdate.widgets = categoryToUpdate.widgets.filter(
          (widget) => widget.id !== widgetId,
        );
    },
  },
});

export const {
  updateDashboardState,
  addNewCategory,
  deleteCategory,
  addWidgetToCategory,
  deleteWidgetFromCategory,
} = dashboardSlice.actions;

export function getCategories(state) {
  return state.dashboard.categories;
}

export default dashboardSlice.reducer;
