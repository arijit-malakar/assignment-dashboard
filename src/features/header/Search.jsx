import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../dashboard/dashboardSlice";
import SearchResults from "./SearchResults";

export default function Search() {
  const categories = useSelector(getCategories);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(
    function () {
      const timer = setTimeout(() => setDebouncedQuery(query), 500);

      return () => clearTimeout(timer);
    },
    [query],
  );

  const filteredCategories = !debouncedQuery.trim()
    ? []
    : categories
        .map((category) => {
          const isCategoryMatched = category.name
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase());
          const widgetsMatched = isCategoryMatched
            ? category.widgets
            : category.widgets.filter((widget) =>
                widget.title
                  .toLowerCase()
                  .includes(debouncedQuery.toLowerCase()),
              );

          if (isCategoryMatched || widgetsMatched.length > 0)
            return { ...category, widgets: widgetsMatched };
        })
        .filter(Boolean);

  return (
    <div className="flex flex-col gap-4 p-2 pb-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-lg border-2 border-slate-400 p-2 placeholder:text-slate-400"
        type="text"
        placeholder="Search anything..."
      />
      {debouncedQuery && <SearchResults results={filteredCategories} />}
    </div>
  );
}
