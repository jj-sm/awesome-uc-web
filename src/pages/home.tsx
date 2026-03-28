import { Link } from "wouter";
import { ArrowRight, Github, BookOpen, Code2, Users, Star, GitFork, Search } from "lucide-react";
import { useData } from "@/hooks/use-data";

const STATS = [
  { icon: <Code2 className="w-5 h-5 text-[#1d4ed8]" />, key: "projects", label: "Proyectos", color: "border-[#93c5fd] bg-[#dbeafe]" },
  { icon: <BookOpen className="w-5 h-5 text-[#0369a1]" />, key: "docs", label: "Documentos", color: "border-[#7dd3fc] bg-[#e0f2fe]" },
  { icon: <Users className="w-5 h-5 text-[#8250df]" />, key: "social", label: "Comunidades", color: "border-[#d2a8ff] bg-[#fbefff]" },
];

const CATEGORIES = [
  {
    href: "/projects",
    icon: <Code2 className="w-6 h-6 text-[#1d4ed8]" />,
    title: "Proyectos",
    description: "Apps, software y herramientas creadas por estudiantes de la UC. Desde extensiones de Chrome hasta APIs y scripts.",
    items: [
      { href: "/projects/web", label: "Aplicaciones y Software" },
      { href: "/projects/tools", label: "Herramientas de Dev" },
    ],
    accent: "border-[#93c5fd] hover:border-[#0066cc]",
    badge: "bg-[#dbeafe] text-[#1d4ed8]",
    iconBg: "bg-[#dbeafe]",
  },
  {
    href: "/docs",
    icon: <BookOpen className="w-6 h-6 text-[#0369a1]" />,
    title: "Documentos",
    description: "Apuntes, resúmenes, wikis y plantillas de cursos UC para facilitar tu estudio.",
    items: [
      { href: "/docs/apuntes", label: "Apuntes y Material" },
      { href: "/docs/plantillas", label: "Plantillas LaTeX / Beamer" },
    ],
    accent: "border-[#7dd3fc] hover:border-[#0369a1]",
    badge: "bg-[#e0f2fe] text-[#0369a1]",
    iconBg: "bg-[#e0f2fe]",
  },
  {
    href: "/social",
    icon: <Users className="w-6 h-6 text-[#8250df]" />,
    title: "Social",
    description: "Comunidades digitales, organizaciones estudiantiles, hackathons y eventos de la UC.",
    items: [
      { href: "/social/comunidades", label: "Comunidades Digitales" },
      { href: "/social/organizaciones", label: "Organizaciones" },
      { href: "/social/recreacion", label: "Recreación y Eventos" },
    ],
    accent: "border-[#d2a8ff] hover:border-[#8250df]",
    badge: "bg-[#fbefff] text-[#8250df]",
    iconBg: "bg-[#fbefff]",
  },
];

export default function Home() {
  const { data, loading, allItems } = useData();

  const projectCount = data ? data.projects.web.length + data.projects.tools.length : 0;
  const docsCount = data ? data.docs.apuntes.length + data.docs.plantillas.length : 0;
  const socialCount = data
    ? data.social.comunidades.length + data.social.organizaciones.length + data.social.recreacion.length
    : 0;

  const statCounts: Record<string, number> = {
    projects: projectCount,
    docs: docsCount,
    social: socialCount,
  };

  return (
    <div className="min-h-screen">
      <section className="relative border-b border-[#d0d7de] overflow-hidden bg-gradient-to-br from-white via-[#f0f7ff] to-[#e8f4ff]">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dbeafe] text-[#1d4ed8] text-xs font-semibold rounded-full border border-[#93c5fd] mb-6">
              Open Source UC · awesome.osuc.dev
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1f2328] leading-tight mb-4">
              Los mejor proyectos que los<br /> estudiantes de la{" "}
              <span className="text-[#0066cc]">UC</span>{" "}
              han construido
            </h1>

            <p className="text-lg text-[#59636e] leading-relaxed mb-8 max-w-2xl">
              Un directorio curado de proyectos, documentos y comunidades creadas por y para estudiantes de la Pontificia Universidad Católica de Chile.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] text-white text-sm font-semibold rounded-lg hover:bg-[#0058b0] transition-colors shadow-sm"
              >
                Explorar proyectos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/open-source-uc/awesome-uc-web-index"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1f2328] text-sm font-semibold rounded-lg border border-[#d0d7de] hover:bg-[#f6f8fa] transition-colors"
              >
                <Github className="w-4 h-4" />
                Ver en GitHub
              </a>
              <Link
                href="/contribute"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1f2328] text-sm font-semibold rounded-lg border border-[#d0d7de] hover:bg-[#f6f8fa] transition-colors"
              >
                <GitFork className="w-4 h-4" />
                Contribuir
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border-2 ${stat.color} transition-all`}
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#1f2328]">
                {loading ? (
                  <span className="inline-block w-10 h-7 bg-[#d0d7de] animate-pulse rounded" />
                ) : (
                  statCounts[stat.key]
                )}
              </div>
              <div className="text-xs sm:text-sm text-[#59636e] font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.href}
              className={`group bg-white border-2 rounded-xl p-6 transition-all duration-200 ${cat.accent}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${cat.iconBg}`}>
                  {cat.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.badge}`}>
                  {loading ? "..." : statCounts[cat.href.replace("/", "")]}
                </span>
              </div>

              <Link href={cat.href}>
                <h3 className="text-lg font-bold text-[#1f2328] group-hover:text-[#0066cc] transition-colors mb-2 cursor-pointer">
                  {cat.title}
                </h3>
              </Link>

              <p className="text-sm text-[#59636e] leading-relaxed mb-4">
                {cat.description}
              </p>

              <div className="space-y-1.5">
                {cat.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-[#59636e] hover:text-[#0066cc] transition-colors group/link"
                  >
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-gradient-to-br from-[#0066cc] to-[#0047ab] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="80" cy="20" r="40" />
            </svg>
          </div>
          <div className="relative">
            <Search className="w-10 h-10 mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              ¿Tienes un proyecto UC?
            </h2>
            <p className="text-white/80 text-base mb-6 max-w-xl">
              Si eres estudiante de la UC y tienes un proyecto, comunidad o recurso que quieras compartir, ¡puedes contribuir al índice en GitHub!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contribute"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0066cc] text-sm font-bold rounded-lg hover:bg-[#f0f7ff] transition-colors shadow-sm"
              >
                Cómo contribuir
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/open-source-uc/awesome-uc-web-index"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Github className="w-4 h-4" />
                Abrir en GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
