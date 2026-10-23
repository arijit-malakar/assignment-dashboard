import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDashboardState } from "./features/dashboard/dashboardSlice";
import Dashboard from "./features/dashboard/Dashboard";
import Header from "./features/header/Header";
import Spinner from "./ui/Spinner";

export default function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const res = await fetch("./data.json");
        const data = await res.json();
        dispatch(updateDashboardState(data.categories));
        setIsLoading(false);
      }
      fetchData();
    },
    [dispatch],
  );

  return (
    <div className="flex h-dvh flex-col bg-blue-100">
      <Header />
      {isLoading ? <Spinner /> : <Dashboard />}
    </div>
  );
}
