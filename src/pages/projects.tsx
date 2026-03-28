import { Code2, Globe } from "lucide-react";
import { useData } from "@/hooks/use-data";
import ItemGrid, { SubcategoryNav } from "@/components/ItemGrid";
import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";

const SUBCATEGORIES = [
  { key: "web", label: "Aplicaciones y Software", icon: <Globe className="w-4 h-4" /> },
  { key: "tools", label: "Herramientas de Dev", icon: <Code2 className="w-4 h-4" /> },
];

export default function ProjectsPage() {
  const { data, filteredItems, loading } = useData();
  const [location] = useLocation();

  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");

  useEffect(() => {
    if (location.endsWith("/web")) setActiveSubcategory("web");
    else if (location.endsWith("/tools")) setActiveSubcategory("tools");
    else setActiveSubcategory("all");
  }, [location]);

  const allProjectItems = filteredItems.filter((i) => i._category === "projects");
  const displayItems =
    activeSubcategory === "all"
      ? allProjectItems
      : allProjectItems.filter((i) => i._subcategory === activeSubcategory);

  const totalProjects = data ? data.projects.web.length + data.projects.tools.length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-[#ddf4ff] rounded-lg">
            <Code2 className="w-5 h-5 text-[#0969da]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f2328]">Proyectos</h1>
          {!loading && (
            <span className="px-2.5 py-0.5 bg-[#ddf4ff] text-[#0969da] text-xs font-semibold rounded-full border border-[#b6e3ff]">
              {totalProjects}
            </span>
          )}
        </div>
        <p className="text-sm text-[#59636e]">
          Aplicaciones, software, herramientas y librerías desarrolladas por estudiantes de la UC.
        </p>
      </div>

      <SubcategoryNav
        items={filteredItems.filter((i) => i._category === "projects")}
        basePath="/projects"
        subcategories={SUBCATEGORIES}
        activeSubcategory={activeSubcategory}
        onSelect={setActiveSubcategory}
      />

      <ItemGrid items={displayItems} />
    </div>
  );
}
