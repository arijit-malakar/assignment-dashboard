export default function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="spinner"></div>
      <p className="text-lg font-semibold [word-spacing:4px]">
        Loading categories...
      </p>
    </div>
  );
}
