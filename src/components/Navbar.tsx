import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, Star } from "lucide-react";
import { useData } from "@/hooks/use-data";


const NAV_ITEMS = [
  {
    label: "Proyectos",
    href: "/projects",
    sub: [
      { label: "Aplicaciones y Software", href: "/projects/web" },
      { label: "Herramientas de Dev", href: "/projects/tools" },
    ],
  },
  {
    label: "Documentos",
    href: "/docs",
    sub: [
      { label: "Apuntes y Material", href: "/docs/apuntes" },
      { label: "Plantillas", href: "/docs/plantillas" },
    ],
  },
  {
    label: "Social",
    href: "/social",
    sub: [
      { label: "Comunidades Digitales", href: "/social/comunidades" },
      { label: "Organizaciones", href: "/social/organizaciones" },
      { label: "Recreación y Eventos", href: "/social/recreacion" },
    ],
  },
  { label: "Contribuir", href: "/contribute" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { search, setSearch, allItems } = useData();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d0d7de] bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="Awesome UC" className="h-10 w-10" />
            </Link>
            <span className="h-7 w-px bg-[#d0d7de]" aria-hidden="true" />
            <a
              href="https://osuc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img src="/osuc.svg" alt="Open Source UC" className="h-7 w-7" />
            </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.sub ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      location.startsWith(item.href)
                        ? "text-[#0066cc] bg-[#dbeafe]"
                        : "text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa]"
                    }`}
                  >
                    {item.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  {openDropdown === item.href && (
                    <div className="absolute top-full left-0 pt-1 z-50">
                      <div className="w-52 bg-white border border-[#d0d7de] rounded-lg shadow-lg py-1">
                        {item.sub.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="block px-4 py-2 text-sm text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa] transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-[#0066cc] bg-[#dbeafe]"
                      : "text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#59636e]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar proyectos..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-[#d0d7de] rounded-md bg-[#f6f8fa] focus:bg-white focus:border-[#0066cc] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#59636e] hover:text-[#1f2328]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <a
              href="https://github.com/open-source-uc/awesome-uc-web-index"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#d0d7de] rounded-md text-[#1f2328] hover:bg-[#f6f8fa] transition-colors shrink-0"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="font-medium">{allItems.length}</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#d0d7de] bg-white">
          <nav className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.startsWith(item.href)
                      ? "text-[#0066cc] bg-[#dbeafe]"
                      : "text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sub?.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block pl-6 pr-3 py-1.5 rounded-md text-xs text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
