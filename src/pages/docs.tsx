import { BookOpen, FolderOpen } from "lucide-react";
import { useData } from "@/hooks/use-data";
import ItemGrid, { SubcategoryNav } from "@/components/ItemGrid";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const SUBCATEGORIES = [
  { key: "apuntes", label: "Apuntes y Material", icon: <BookOpen className="w-4 h-4" /> },
  { key: "plantillas", label: "Plantillas", icon: <FolderOpen className="w-4 h-4" /> },
];

export default function DocsPage() {
  const { data, filteredItems, loading } = useData();
  const [location] = useLocation();
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  useEffect(() => {
    if (location.endsWith("/apuntes")) setActiveSubcategory("apuntes");
    else if (location.endsWith("/latex")) setActiveSubcategory("plantillas");
    else if (location.endsWith("/typst")) setActiveSubcategory("plantillas");
    else if (location.endsWith("/plantillas")) setActiveSubcategory("plantillas");
    else setActiveSubcategory("all");
  }, [location]);

  const allDocItems = filteredItems.filter((i) => i._category === "docs");
  const displayItems =
    activeSubcategory === "all"
      ? allDocItems
      : allDocItems.filter((i) => i._subcategory === activeSubcategory);

  const totalDocs = data ? data.docs.apuntes.length + data.docs.plantillas.length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-[#dafbe1] rounded-lg">
            <BookOpen className="w-5 h-5 text-[#1a7f37]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f2328]">Documentos</h1>
          {!loading && (
            <span className="px-2.5 py-0.5 bg-[#dafbe1] text-[#1a7f37] text-xs font-semibold rounded-full border border-[#56d364]">
              {totalDocs}
            </span>
          )}
        </div>
        <p className="text-sm text-[#59636e]">
          Apuntes, wikis, centrales de apuntes y plantillas para cursos de la UC.
        </p>
      </div>

      <SubcategoryNav
        items={filteredItems.filter((i) => i._category === "docs")}
        basePath="/docs"
        subcategories={SUBCATEGORIES}
        activeSubcategory={activeSubcategory}
        onSelect={setActiveSubcategory}
      />

      <ItemGrid items={displayItems} />
    </div>
  );
}
