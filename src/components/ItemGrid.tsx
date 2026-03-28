import { ArrowUpDown, Search, RefreshCw } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import { AnyItem } from "@/lib/github";
import { useData } from "@/hooks/use-data";

interface ItemGridProps {
  items: AnyItem[];
  title?: string;
  subtitle?: string;
  showSort?: boolean;
}

export default function ItemGrid({ items, title, subtitle, showSort = true }: ItemGridProps) {
  const { sortOrder, setSortOrder, search, setSearch, loading } = useData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#59636e]">
        <RefreshCw className="w-8 h-8 animate-spin mb-4 text-[#0066cc]" />
        <p className="text-sm font-medium">Cargando proyectos desde GitHub...</p>
        <p className="text-xs mt-1 opacity-70">Esto puede tomar unos segundos</p>
      </div>
    );
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold text-[#1f2328]">{title}</h1>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-[#59636e]">{subtitle}</p>
          )}
        </div>
      )}

      {showSort && (
        <div className="flex items-center justify-between gap-3 mb-5">
          <p className="text-sm text-[#59636e]">
            <span className="font-semibold text-[#1f2328]">{items.length}</span> {items.length === 1 ? "resultado" : "resultados"}
            {search && (
              <span> para <span className="font-medium text-[#0066cc]">"{search}"</span></span>
            )}
          </p>
          <button
            onClick={() => setSortOrder(sortOrder === "default" ? "updated" : "default")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              sortOrder === "updated"
                ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]"
                : "bg-white text-[#59636e] border-[#d0d7de] hover:bg-[#f6f8fa]"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "updated" ? "Más recientes primero" : "Ordenar por actualización"}
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-[#59636e]">
          <div className="w-16 h-16 bg-[#f6f8fa] rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-[#59636e]" />
          </div>
          <h3 className="text-base font-semibold text-[#1f2328] mb-2">No se encontraron resultados</h3>
          <p className="text-sm text-[#59636e] text-center max-w-xs">
            {search
              ? `No hay proyectos que coincidan con "${search}". Intenta con otras palabras.`
              : "No hay proyectos en esta categoría aún."}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-4 py-2 text-sm text-[#0066cc] border border-[#0066cc] rounded-md hover:bg-[#dbeafe] transition-colors"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <ItemCard key={`${item._category}-${item._slug}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SubcategoryNav({
  items,
  subcategories,
  activeSubcategory,
  onSelect,
}: {
  items: AnyItem[];
  basePath: string;
  subcategories: { key: string; label: string }[];
  activeSubcategory: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap mb-6 p-1 bg-[#f6f8fa] rounded-lg border border-[#d0d7de] w-fit">
      <button
        onClick={() => onSelect("all")}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          activeSubcategory === "all"
            ? "bg-white text-[#1f2328] shadow-sm border border-[#d0d7de]"
            : "text-[#59636e] hover:text-[#1f2328]"
        }`}
      >
        Todos ({items.length})
      </button>
      {subcategories.map((sub) => {
        const count = items.filter((i) => i._subcategory === sub.key).length;
        return (
          <button
            key={sub.key}
            onClick={() => onSelect(sub.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeSubcategory === sub.key
                ? "bg-white text-[#1f2328] shadow-sm border border-[#d0d7de]"
                : "text-[#59636e] hover:text-[#1f2328]"
            }`}
          >
            {sub.label} ({count})
          </button>
        );
      })}
    </div>
  );
}
