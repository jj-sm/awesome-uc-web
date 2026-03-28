import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchAllData, AllData, AnyItem, getAllItems, searchItems } from "@/lib/github";

const CACHE_KEY = "awesome-uc-data-v2";

interface DataContextValue {
  data: AllData | null;
  loading: boolean;
  error: string | null;
  allItems: AnyItem[];
  search: string;
  setSearch: (s: string) => void;
  filteredItems: AnyItem[];
  sortOrder: "default" | "updated";
  setSortOrder: (o: "default" | "updated") => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  activeSubcategory: string;
  setActiveSubcategory: (s: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AllData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "updated">("default");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  useEffect(() => {
    let cancelled = false;

    // Clear old cache schema to avoid stale image paths.
    sessionStorage.removeItem("awesome-uc-data");

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as AllData;
        if (!cancelled) {
          setData(parsed);
          setLoading(false);
          return;
        }
      } catch {
      }
    }

    fetchAllData()
      .then((d) => {
        if (!cancelled) {
          setData(d);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(d));
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String(e?.message || e));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const allItems = data ? getAllItems(data) : [];

  let filteredItems = allItems;

  if (activeCategory !== "all") {
    filteredItems = filteredItems.filter((item) => item._category === activeCategory);
  }
  if (activeSubcategory !== "all") {
    filteredItems = filteredItems.filter((item) => item._subcategory === activeSubcategory);
  }

  filteredItems = searchItems(filteredItems, search);

  if (sortOrder === "updated") {
    filteredItems = [...filteredItems].sort((a, b) => {
      const da = a._updatedAt ? new Date(a._updatedAt).getTime() : 0;
      const db = b._updatedAt ? new Date(b._updatedAt).getTime() : 0;
      return db - da;
    });
  }

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        allItems,
        search,
        setSearch,
        filteredItems,
        sortOrder,
        setSortOrder,
        activeCategory,
        setActiveCategory,
        activeSubcategory,
        setActiveSubcategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
