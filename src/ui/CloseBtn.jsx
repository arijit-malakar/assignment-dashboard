import { MdOutlineClose } from "react-icons/md";

export default function CloseBtn({ onClick }) {
  return (
    <button
      className="cursor-pointer text-2xl text-gray-400 transition-all hover:text-gray-600"
      onClick={onClick}
    >
      <MdOutlineClose />
    </button>
  );
}
