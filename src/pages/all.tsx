import { LayoutGrid } from "lucide-react";
import { useData } from "@/hooks/use-data";
import ItemGrid from "@/components/ItemGrid";
import { useState } from "react";

const ALL_CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "projects", label: "Proyectos" },
  { key: "docs", label: "Documentos" },
  { key: "social", label: "Social" },
];

export default function AllPage() {
  const { filteredItems, allItems, loading } = useData();
  const [catFilter, setCatFilter] = useState("all");

  const displayItems =
    catFilter === "all"
      ? filteredItems
      : filteredItems.filter((i) => i._category === catFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-[#f6f8fa] rounded-lg border border-[#d0d7de]">
            <LayoutGrid className="w-5 h-5 text-[#59636e]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f2328]">Todos los proyectos</h1>
          {!loading && (
            <span className="px-2.5 py-0.5 bg-[#f6f8fa] text-[#59636e] text-xs font-semibold rounded-full border border-[#d0d7de]">
              {allItems.length}
            </span>
          )}
        </div>
        <p className="text-sm text-[#59636e]">
          Vista completa de todos los proyectos, documentos y comunidades del índice de Awesome UC.
        </p>
      </div>

      <div className="flex items-center gap-1 flex-wrap mb-6 p-1 bg-[#f6f8fa] rounded-lg border border-[#d0d7de] w-fit">
        {ALL_CATEGORIES.map((cat) => {
          const count =
            cat.key === "all"
              ? filteredItems.length
              : filteredItems.filter((i) => i._category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setCatFilter(cat.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                catFilter === cat.key
                  ? "bg-white text-[#1f2328] shadow-sm border border-[#d0d7de]"
                  : "text-[#59636e] hover:text-[#1f2328]"
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      <ItemGrid items={displayItems} />
    </div>
  );
}
