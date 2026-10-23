import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function SearchBtn({ onClick }) {
  return (
    <div
      className="flex w-25 cursor-pointer items-center gap-2.5 rounded-md border-2 border-slate-400 bg-slate-200 px-2 py-1 text-gray-600 hover:bg-slate-300 sm:w-25 md:w-50 lg:w-75"
      onClick={onClick}
    >
      <span>
        <HiOutlineMagnifyingGlass />
      </span>
      <span>Search</span>
    </div>
  );
}
