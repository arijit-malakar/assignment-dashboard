export default function SearchResults({ results }) {
  if (results.length === 0) return <p>No results found!</p>;

  return (
    <div className="flex flex-col gap-4">
      {results.map((category) => (
        <div key={category.id} className="flex flex-col gap-1">
          <h3 className="font-medium text-gray-500">{category.name}</h3>
          <ul className="flex flex-col gap-0.5">
            {category.widgets.map((widget) => (
              <li key={widget.id} className="list-inside list-disc">
                {widget.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
