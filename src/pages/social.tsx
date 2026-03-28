import { Users, MessageSquare, CalendarDays } from "lucide-react";
import { useData } from "@/hooks/use-data";
import ItemGrid, { SubcategoryNav } from "@/components/ItemGrid";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const SUBCATEGORIES = [
  { key: "comunidades", label: "Comunidades Digitales", icon: <MessageSquare className="w-4 h-4" /> },
  { key: "organizaciones", label: "Organizaciones", icon: <Users className="w-4 h-4" /> },
  { key: "recreacion", label: "Recreación y Eventos", icon: <CalendarDays className="w-4 h-4" /> },
];

export default function SocialPage() {
  const { data, filteredItems, loading } = useData();
  const [location] = useLocation();
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  useEffect(() => {
    if (location.endsWith("/comunidades")) setActiveSubcategory("comunidades");
    else if (location.endsWith("/organizaciones")) setActiveSubcategory("organizaciones");
    else if (location.endsWith("/recreacion")) setActiveSubcategory("recreacion");
    else setActiveSubcategory("all");
  }, [location]);

  const allSocialItems = filteredItems.filter((i) => i._category === "social");
  const displayItems =
    activeSubcategory === "all"
      ? allSocialItems
      : allSocialItems.filter((i) => i._subcategory === activeSubcategory);

  const totalSocial = data
    ? data.social.comunidades.length + data.social.organizaciones.length + data.social.recreacion.length
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-[#fbefff] rounded-lg">
            <Users className="w-5 h-5 text-[#8250df]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f2328]">Social</h1>
          {!loading && (
            <span className="px-2.5 py-0.5 bg-[#fbefff] text-[#8250df] text-xs font-semibold rounded-full border border-[#d2a8ff]">
              {totalSocial}
            </span>
          )}
        </div>
        <p className="text-sm text-[#59636e]">
          Comunidades digitales, organizaciones estudiantiles, hackathons y eventos de la UC.
        </p>
      </div>

      <SubcategoryNav
        items={filteredItems.filter((i) => i._category === "social")}
        basePath="/social"
        subcategories={SUBCATEGORIES}
        activeSubcategory={activeSubcategory}
        onSelect={setActiveSubcategory}
      />

      <ItemGrid items={displayItems} />
    </div>
  );
}
