export default function Button({ children, onClick }) {
  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-slate-400 bg-slate-50 p-2 text-gray-800 transition-all hover:bg-slate-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Icon({ children }) {
  return <span className="text-xl">{children}</span>;
}

function Text({ children }) {
  return <span className="text-sm font-semibold">{children}</span>;
}

Button.Icon = Icon;
Button.Text = Text;
